import React, { useEffect, useRef } from 'react'

export const MysticalAuraCanvas: React.FC<{ realmTier: number }> = ({ realmTier }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Particle system (floating spirit particles & Yin-Yang cosmic mist)
    const particleCount = Math.min(60, 20 + realmTier * 5)
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
      color: string
      baseAlpha: number
    }> = []

    const colorPalette = [
      '#eab308', // gold
      '#fde047', // light gold
      '#10b981', // jade
      '#34d399', // bright jade
      '#818cf8', // mystic indigo
      '#c084fc', // ethereal purple
    ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.8 - 0.2, // float upwards
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.7 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.3,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      })
    }

    let tick = 0

    const render = () => {
      tick += 0.015
      ctx.clearRect(0, 0, width, height)

      // Draw subtle mystical celestial grid / nebula glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        50,
        width / 2,
        height * 0.4,
        Math.max(width, height) * 0.7
      )
      grad.addColorStop(0, 'rgba(24, 30, 48, 0.4)')
      grad.addColorStop(0.5, 'rgba(10, 14, 23, 0.6)')
      grad.addColorStop(1, 'rgba(7, 8, 12, 0.95)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Draw floating spirit motes
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(tick + p.y * 0.01) * 0.2
        p.y += p.vy

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(tick * 2 + p.x) * 0.4)
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [realmTier])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  )
}
