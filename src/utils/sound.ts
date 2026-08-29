// Web Audio Synthesizer for Cultivation/Oriental sound effects

class CultivationSoundEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val
  }

  // Soft chime / meditation gong sound for gathering Qi
  public playQiGatherSound() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      // Pentatonic pitch selection
      const pitches = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50] // C5, D5, E5, G5, A5, C6
      const pitch = pitches[Math.floor(Math.random() * pitches.length)]

      osc.type = 'sine'
      osc.frequency.setValueAtTime(pitch, now)
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, now + 0.15)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.3)
    } catch {
      // Ignore audio failure
    }
  }

  // Deep booming gong / heavenly bell for Breakthrough
  public playBreakthroughSound() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      
      // Low fundamental gong
      const osc1 = this.ctx.createOscillator()
      const gain1 = this.ctx.createGain()
      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(220, now) // A3
      osc1.frequency.exponentialRampToValueAtTime(110, now + 1.2)
      gain1.gain.setValueAtTime(0.3, now)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

      // Shimmering overtone
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(660, now)
      osc2.frequency.exponentialRampToValueAtTime(880, now + 0.8)
      gain2.gain.setValueAtTime(0.15, now)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.5)

      osc1.connect(gain1)
      gain1.connect(this.ctx.destination)
      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 2.0)
      osc2.stop(now + 1.5)
    } catch {
      // Ignore
    }
  }

  // Trait selection celestial harp chord
  public playTraitSelectSound() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const notes = [440, 554.37, 659.25, 880] // A Major chord
      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)
        
        gain.gain.setValueAtTime(0, now)
        gain.gain.setValueAtTime(0.1, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.8)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.8)
      })
    } catch {
      // Ignore
    }
  }

  // Event trigger notification chime
  public playEventSound(isGood: boolean) {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      if (isGood) {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(587.33, now) // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15) // A5
        gain.gain.setValueAtTime(0.12, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
      } else {
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(300, now)
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.25)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
      }

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.6)
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new CultivationSoundEngine()
