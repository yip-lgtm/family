const GONG = 261.63
const SHANG = 293.66
const JUE = 329.63
const ZHI = 392.00
const YU = 440.00
const PENTATONIC = [GONG, SHANG, JUE, ZHI, YU]

const MELODY = [0, 2, 4, 3, 1, 4, 2, 0, 3, 2, 4, 0]

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
  let sfxGain = null
  let droneOsc = null
  let droneGain = null
  let timer = 0
  let nextNote = 0
  let noteIndex = 0
  let musicOn = false
  let unlocked = false

  function ensure() {
    if (ctx) return ctx
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    ctx = new AudioCtx({ latencyHint: 'interactive' })
    master = ctx.createGain()
    master.gain.value = 0.55
    master.connect(ctx.destination)

    musicGain = ctx.createGain()
    musicGain.gain.value = 0
    musicGain.connect(master)

    sfxGain = ctx.createGain()
    sfxGain.gain.value = 0.42
    sfxGain.connect(master)
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

  function startDrone() {
    if (droneOsc) return
    droneOsc = ctx.createOscillator()
    droneGain = ctx.createGain()
    droneOsc.type = 'sine'
    droneOsc.frequency.value = GONG / 4
    droneGain.gain.value = 0.035
    const shimmer = ctx.createOscillator()
    const shimmerGain = ctx.createGain()
    shimmer.type = 'sine'
    shimmer.frequency.value = GONG / 2
    shimmerGain.gain.value = 0.012
    droneOsc.connect(droneGain)
    shimmer.connect(shimmerGain)
    droneGain.connect(musicGain)
    shimmerGain.connect(musicGain)
    droneOsc.start()
    shimmer.start()
    droneOsc._pair = shimmer
  }

  function stopDrone() {
    if (!droneOsc) return
    try {
      droneOsc.stop()
      droneOsc._pair?.stop()
    } catch {
      /* already stopped */
    }
    droneOsc.disconnect()
    droneOsc._pair?.disconnect()
    droneGain?.disconnect()
    droneOsc = null
  }

  function scheduleNotes() {
    if (!musicOn || !ctx) return
    const now = ctx.currentTime
    const step = 0.92
    while (nextNote < now + 1.4) {
      const freq = PENTATONIC[MELODY[noteIndex % MELODY.length]]
      const octave = noteIndex % 8 === 0 ? 0.5 : 1
      tone(freq * octave, 'sine', nextNote, 1.15, 0.055, musicGain, -6)
      tone(freq * octave, 'triangle', nextNote, 1.05, 0.028, musicGain, 8)
      if (noteIndex % 4 === 0) {
        tone(PENTATONIC[4] / 2, 'sine', nextNote, 1.6, 0.018, musicGain)
      }
      nextNote += step
      noteIndex += 1
    }
  }

  function loop() {
    scheduleNotes()
    timer = window.setTimeout(loop, 200)
  }

  async function setMusic(on) {
    await unlock()
    musicOn = on
    if (on) {
      startDrone()
      nextNote = ctx.currentTime + 0.05
      musicGain.gain.cancelScheduledValues(ctx.currentTime)
      musicGain.gain.setValueAtTime(Math.max(musicGain.gain.value, 0.0001), ctx.currentTime)
      musicGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.6)
      window.clearTimeout(timer)
      loop()
    } else {
      musicGain.gain.cancelScheduledValues(ctx.currentTime)
      musicGain.gain.setValueAtTime(Math.max(musicGain.gain.value, 0.0001), ctx.currentTime)
      musicGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35)
      window.clearTimeout(timer)
      stopDrone()
    }
    return musicOn
  }

  function playQing() {
    prime(() => {
    const t = ctx.currentTime
    tone(1864, 'sine', t, 0.55, 0.16, sfxGain)
    tone(2489, 'sine', t, 0.32, 0.07, sfxGain)
    const noise = ctx.createBufferSource()
    noise.buffer = createNoiseBuffer(ctx, 0.045)
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
