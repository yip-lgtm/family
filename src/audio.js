const GONG = 261.63
const SHANG = 293.66
const JUE = 329.63
const ZHI = 392.00
const YU = 440.00

export const TAFFY_BVID = 'BV1kNEP6cEmu'
export const TAFFY_PAGE = `https://www.bilibili.com/video/${TAFFY_BVID}`
const TAFFY_PLAYER = `https://player.bilibili.com/player.html?isOutside=true&aid=116692164354026&bvid=${TAFFY_BVID}&cid=38858260566&p=1&autoplay=1&muted=0&danmaku=0&high_quality=1&loop=1`

function createNoiseBuffer(ctx, duration = 0.08) {
  const length = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length)
  }
  return buffer
}

export function createAudio() {
  let ctx = null
  let master = null
  let sfxGain = null
  let clickBuffer = null
  let musicOn = false
  let unlocked = false
  let dock = null
  let frame = null

  function ensure() {
    if (ctx) return ctx
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    ctx = new AudioCtx({ latencyHint: 'interactive' })
    master = ctx.createGain()
    master.gain.value = 0.52
    master.connect(ctx.destination)
    sfxGain = ctx.createGain()
    sfxGain.gain.value = 0.42
    sfxGain.connect(master)
    clickBuffer = createNoiseBuffer(ctx, 0.045)
    return ctx
  }

  async function unlock() {
    ensure()
    if (ctx.state === 'suspended') await ctx.resume()
    unlocked = true
  }

  function prime(then) {
    ensure()
    const run = () => {
      unlocked = true
      then()
    }
    if (ctx.state === 'suspended') {
      ctx.resume().then(run)
      return
    }
    run()
  }

  function tone(freq, type, start, dur, peak, dest, detune = 0) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, start)
    osc.detune.setValueAtTime(detune, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur)
    osc.connect(gain)
    gain.connect(dest)
    osc.start(start)
    osc.stop(start + dur + 0.02)
  }

  function ensureDock() {
    if (dock) return
    dock = document.createElement('aside')
    dock.className = 'bgm-dock'
    dock.setAttribute('aria-label', '關注塔菲喵背景音樂')
    dock.innerHTML = `
      <div class="bgm-dock-bar">
        <span>BGM</span>
        <a href="${TAFFY_PAGE}" target="_blank" rel="noreferrer">關注塔菲喵 · 循環歌單</a>
      </div>
    `
    frame = document.createElement('iframe')
    frame.title = '關注塔菲喵 循環歌單'
    frame.allow = 'autoplay; fullscreen; encrypted-media'
    frame.referrerPolicy = 'no-referrer-when-downgrade'
    frame.setAttribute('scrolling', 'no')
    frame.setAttribute('frameborder', '0')
    frame.setAttribute('allowfullscreen', 'true')
    dock.append(frame)
    document.body.append(dock)
  }

  async function setMusic(on) {
    await unlock()
    musicOn = on
    ensureDock()
    if (on) {
      dock.classList.add('is-on')
      frame.src = TAFFY_PLAYER
      sfxGain.gain.setTargetAtTime(0.22, ctx.currentTime, 0.05)
    } else {
      dock.classList.remove('is-on')
      frame.src = 'about:blank'
      sfxGain.gain.setTargetAtTime(0.42, ctx.currentTime, 0.05)
    }
    return musicOn
  }

  function playQing() {
    prime(() => {
      const t = ctx.currentTime
      tone(1864, 'sine', t, 0.55, 0.16, sfxGain)
      tone(2489, 'sine', t, 0.32, 0.07, sfxGain)
      const noise = ctx.createBufferSource()
      noise.buffer = clickBuffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 1400
      filter.Q.value = 2.4
      const nGain = ctx.createGain()
      nGain.gain.setValueAtTime(0.12, t)
      nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
      noise.connect(filter)
      filter.connect(nGain)
      nGain.connect(sfxGain)
      noise.start(t)
      noise.stop(t + 0.06)
    })
  }

  function playRise() {
    prime(() => {
      const t = ctx.currentTime
      const chord = [GONG, JUE, ZHI]
      chord.forEach((freq, i) => {
        tone(freq, 'sine', t, 0.55, 0.09, sfxGain)
        tone(freq * 1.5, 'triangle', t + 0.18 + i * 0.04, 0.5, 0.07, sfxGain)
        tone(freq * 2, 'sine', t + 0.38 + i * 0.05, 0.55, 0.05, sfxGain)
      })
    })
  }

  function playEvent(good) {
    prime(() => {
      const t = ctx.currentTime
      if (good) {
        tone(ZHI, 'sine', t, 0.35, 0.1, sfxGain)
        tone(YU * 2, 'sine', t + 0.12, 0.5, 0.09, sfxGain)
      } else {
        tone(GONG / 2, 'triangle', t, 0.55, 0.12, sfxGain)
        tone(SHANG / 2, 'sine', t + 0.08, 0.45, 0.08, sfxGain)
      }
    })
  }

  return {
    unlock,
    setMusic,
    playQing,
    playRise,
    playEvent,
    isMusicOn: () => musicOn,
  }
}
