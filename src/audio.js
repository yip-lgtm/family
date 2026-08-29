const GONG = 261.63
const SHANG = 293.66
const JUE = 329.63
const ZHI = 392.00
const YU = 440.00

/** Db-major / Bb-minor landscape in the manner of Sakamoto — original piece 《關注塔菲貓》. */
const midi = (n) => 440 * 2 ** ((n - 69) / 12)
const EIGHTH = 0.5
const LOOP_EIGHTHS = 32

// [startEighth, midi, durationEighths, velocity, kind]
const SCORE = [
  // Pedal tones — wide, unhurried
  [0, 37, 8, 0.2, 'bass'],
  [8, 42, 8, 0.18, 'bass'],
  [16, 44, 8, 0.18, 'bass'],
  [24, 41, 8, 0.17, 'bass'],

  // Inner voicing, like a left-hand ostinato with air between notes
  [0, 56, 2, 0.09, 'piano'],
  [2, 60, 2, 0.08, 'piano'],
  [4, 65, 2, 0.09, 'piano'],
  [6, 68, 2, 0.07, 'piano'],
  [8, 58, 2, 0.09, 'piano'],
  [10, 61, 2, 0.08, 'piano'],
  [12, 65, 2, 0.09, 'piano'],
  [14, 70, 2, 0.07, 'piano'],
  [16, 60, 2, 0.09, 'piano'],
  [18, 63, 2, 0.08, 'piano'],
  [20, 68, 2, 0.09, 'piano'],
  [22, 70, 2, 0.07, 'piano'],
  [24, 56, 2, 0.09, 'piano'],
  [26, 60, 2, 0.08, 'piano'],
  [28, 63, 2, 0.08, 'piano'],
  [30, 67, 2, 0.07, 'piano'],

  // Sparse right hand
  [4, 65, 4, 0.16, 'lead'],
  [8, 63, 2, 0.14, 'lead'],
  [10, 61, 2, 0.13, 'lead'],
  [12, 68, 6, 0.15, 'lead'],

  // 「關注塔菲貓」motif: long-long-short-short-held
  [20, 77, 2, 0.17, 'lead'],
  [22, 75, 2, 0.16, 'lead'],
  [24, 80, 1, 0.15, 'lead'],
  [25, 82, 1, 0.15, 'lead'],
  [26, 77, 5, 0.16, 'lead'],

  // High “paw-print” bells, once per loop
  [14, 84, 1, 0.07, 'bell'],
  [15, 80, 1, 0.06, 'bell'],
  [16, 77, 2, 0.06, 'bell'],
]

const EVENTS_AT = Array.from({ length: LOOP_EIGHTHS }, () => [])
for (const event of SCORE) EVENTS_AT[event[0]].push(event)

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
  let musicGain = null
  let musicFilter = null
  let sfxGain = null
  let padNodes = []
  let hammerBuffer = null
  let clickBuffer = null
  let timer = 0
  let nextBeat = 0
  let beatIndex = 0
  let musicGen = 0
  let musicOn = false
  let unlocked = false

  function ensure() {
    if (ctx) return ctx
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    ctx = new AudioCtx({ latencyHint: 'interactive' })
    master = ctx.createGain()
    master.gain.value = 0.52
    master.connect(ctx.destination)

    musicGain = ctx.createGain()
    musicGain.gain.value = 0
    musicFilter = ctx.createBiquadFilter()
    musicFilter.type = 'lowpass'
    musicFilter.frequency.value = 1750
    musicFilter.Q.value = 0.45
    musicGain.connect(musicFilter)
    musicFilter.connect(master)

    sfxGain = ctx.createGain()
    sfxGain.gain.value = 0.42
    sfxGain.connect(master)

    hammerBuffer = createNoiseBuffer(ctx, 0.05)
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

  function piano(freq, start, dur, peak, kind) {
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(kind === 'bass' ? 780 : kind === 'bell' ? 3400 : 2200, start)
    lp.frequency.exponentialRampToValueAtTime(kind === 'bass' ? 420 : 1100, start + dur)
    lp.connect(musicGain)

    const hammer = ctx.createBufferSource()
    hammer.buffer = hammerBuffer
    const hp = ctx.createBiquadFilter()
    hp.type = 'bandpass'
    hp.frequency.value = Math.min(freq * 2.2, 2800)
    hp.Q.value = 1.6
    const hg = ctx.createGain()
    const knock = peak * (kind === 'bass' ? 0.06 : kind === 'bell' ? 0.12 : 0.16)
    hg.gain.setValueAtTime(knock, start)
    hg.gain.exponentialRampToValueAtTime(0.0001, start + 0.035)
    hammer.connect(hp)
    hp.connect(hg)
    hg.connect(lp)
    hammer.start(start)
    hammer.stop(start + 0.045)

    const partials = kind === 'bass'
      ? [[1, 1], [2, 0.2], [3, 0.07]]
      : kind === 'bell'
        ? [[1, 0.72], [2.003, 0.28], [4.01, 0.08]]
        : [[1, 1], [2, 0.26], [3.01, 0.09], [4.04, 0.035]]

    partials.forEach(([ratio, mix], index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq * ratio, start)
      osc.detune.setValueAtTime(index === 1 ? 3 : index === 2 ? -2 : 0, start)
      const p = Math.max(0.0002, peak * mix)
      gain.gain.setValueAtTime(0.0001, start)
      gain.gain.exponentialRampToValueAtTime(p, start + 0.014)
      gain.gain.exponentialRampToValueAtTime(p * 0.42, start + Math.min(0.55, dur * 0.35))
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur)
      osc.connect(gain)
      gain.connect(lp)
      osc.start(start)
      osc.stop(start + dur + 0.04)
    })
  }

  function startPad() {
    if (padNodes.length) return
    const specs = [
      [midi(49), 0.016, 0],
      [midi(56), 0.01, 6],
      [midi(61), 0.007, -5],
    ]
    specs.forEach(([freq, level, detune]) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.detune.value = detune
      gain.gain.value = level
      lfo.frequency.value = 0.07
      lfoGain.gain.value = level * 0.35
      lfo.connect(lfoGain)
      lfoGain.connect(gain.gain)
      osc.connect(gain)
      gain.connect(musicGain)
      osc.start()
      lfo.start()
      padNodes.push(osc, lfo, gain)
    })
  }

  function stopPad() {
    padNodes.forEach((node) => {
      try {
        if (typeof node.stop === 'function') node.stop()
      } catch {
        /* already stopped */
      }
      try {
        node.disconnect()
      } catch {
        /* already disconnected */
      }
    })
    padNodes = []
  }

  function scheduleNotes() {
    if (!musicOn || !ctx) return
    const now = ctx.currentTime
    while (nextBeat < now + 1.6) {
      const slot = beatIndex % LOOP_EIGHTHS
      for (const [, note, durEighths, vel, kind] of EVENTS_AT[slot]) {
        piano(midi(note), nextBeat, durEighths * EIGHTH + 0.35, vel, kind)
      }
      nextBeat += EIGHTH
      beatIndex += 1
    }
  }

  function loop(gen) {
    if (gen !== musicGen) return
    scheduleNotes()
    timer = window.setTimeout(() => loop(gen), 180)
  }

  async function setMusic(on) {
    await unlock()
    musicOn = on
    musicGen += 1
    window.clearTimeout(timer)
    if (on) {
      const gen = musicGen
      startPad()
      beatIndex = 0
      nextBeat = ctx.currentTime + 0.08
      musicGain.gain.cancelScheduledValues(ctx.currentTime)
      musicGain.gain.setValueAtTime(Math.max(musicGain.gain.value, 0.0001), ctx.currentTime)
      musicGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.1)
      loop(gen)
    } else {
      musicGain.gain.cancelScheduledValues(ctx.currentTime)
      musicGain.gain.setValueAtTime(Math.max(musicGain.gain.value, 0.0001), ctx.currentTime)
      musicGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5)
      window.setTimeout(stopPad, 520)
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
