export function createVisualFx() {
  const canvas = document.createElement('canvas')
  canvas.id = 'qi-canvas'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.prepend(canvas)
  const ctx = canvas.getContext('2d', { alpha: true })

  const flash = document.createElement('div')
  flash.className = 'screen-flash'
  flash.setAttribute('aria-hidden', 'true')
  document.body.append(flash)

  const motes = []
  const bursts = []
  let width = 0
  let height = 0
  let last = 0

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function spawnMote() {
    motes.push({
      x: Math.random() * width,
      y: height + 8,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -0.18 - Math.random() * 0.35,
      life: 1,
      decay: 0.0006 + Math.random() * 0.0008,
      size: 1.1 + Math.random() * 2.4,
      gold: Math.random() > 0.45,
    })
  }

  function burst(x, y) {
    for (let i = 0; i < 36; i += 1) {
      const angle = (Math.PI * 2 * i) / 36 + Math.random() * 0.22
      const speed = 1.6 + Math.random() * 3.6
      bursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: 1.6 + Math.random() * 2.8,
        gold: i % 2 === 0,
      })
    }
    bursts.push({
      x,
      y,
      vx: 0,
      vy: 0,
      life: 1,
      size: 12,
      ring: true,
    })
    bursts.push({
      x,
      y,
      vx: 0,
      vy: 0,
      life: 0.85,
      size: 6,
      ring: true,
    })
  }

  function flashScreen() {
    flash.classList.remove('is-on')
    void flash.offsetWidth
    flash.classList.add('is-on')
    window.setTimeout(() => flash.classList.remove('is-on'), 720)
  }

  function tick(now) {
    const dt = Math.min(32, now - last || 16)
    last = now
    ctx.clearRect(0, 0, width, height)

    if (motes.length < 78 && Math.random() > 0.32) spawnMote()

    for (let i = motes.length - 1; i >= 0; i -= 1) {
      const p = motes[i]
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.life -= p.decay * dt
      if (p.life <= 0 || p.y < -12) {
        motes.splice(i, 1)
        continue
      }
      ctx.beginPath()
      ctx.fillStyle = p.gold
        ? `rgba(212, 175, 55, ${0.22 * p.life})`
        : `rgba(120, 210, 190, ${0.2 * p.life})`
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }

    for (let i = bursts.length - 1; i >= 0; i -= 1) {
      const p = bursts[i]
      p.x += p.vx * (dt * 0.08)
      p.y += p.vy * (dt * 0.08)
      p.life -= 0.018 * (dt * 0.08) + 0.012
      if (p.ring) {
        p.size += dt * 0.2
        ctx.beginPath()
        ctx.strokeStyle = `rgba(243, 213, 145, ${0.5 * p.life})`
        ctx.lineWidth = 2
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.fillStyle = p.gold
          ? `rgba(243, 213, 145, ${0.9 * p.life})`
          : `rgba(168, 228, 189, ${0.85 * p.life})`
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fill()
      }
      if (p.life <= 0) bursts.splice(i, 1)
    }

    requestAnimationFrame(tick)
  }

  resize()
  window.addEventListener('resize', resize)
  requestAnimationFrame(tick)

  return { burst, flashScreen }
}
