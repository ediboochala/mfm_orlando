'use client'

import { useEffect, useRef } from 'react'

const EMBER_COLORS = ['#FFD93D', '#FF7A1A', '#F2B705', '#FF9142']

interface Ember {
  x: number
  y: number
  size: number
  speedY: number
  wobble: number
  wobbleSpeed: number
  life: number
  decay: number
  color: string
}

function spawnEmber(W: number, H: number): Ember {
  return {
    x: Math.random() * W,
    y: H + Math.random() * 60,
    size: Math.random() * 5 + 2,
    speedY: -(Math.random() * 1.6 + 0.6),
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.06 + 0.02,
    life: 1,
    decay: Math.random() * 0.0045 + 0.002,
    color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
  }
}

// Weight initial placement toward the bottom of the hero, like flames
// licking up from a base, rather than an even scatter top-to-bottom.
function scatterY(H: number): number {
  return H - Math.pow(Math.random(), 2.2) * H
}

export default function HeroFlames() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let rafId: number
    let embers: Ember[] = []

    const size = () => {
      W = canvas.width = container.clientWidth
      H = canvas.height = container.clientHeight
      const count = Math.max(90, Math.round((W * H) / 9000))
      embers = Array.from({ length: count }, () => {
        const e = spawnEmber(W, H)
        e.y = scatterY(H) // weighted toward the bottom on first paint
        return e
      })
    }
    size()

    const ro = new ResizeObserver(size)
    ro.observe(container)

    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      // Warm glow rising off the base of the hero, like heat off a flame bed
      const baseGlow = ctx.createLinearGradient(0, H, 0, H - Math.min(260, H * 0.4))
      baseGlow.addColorStop(0, 'rgba(255, 122, 26, 0.16)')
      baseGlow.addColorStop(1, 'rgba(255, 122, 26, 0)')
      ctx.fillStyle = baseGlow
      ctx.fillRect(0, H - Math.min(260, H * 0.4), W, Math.min(260, H * 0.4))

      for (const e of embers) {
        e.wobble += e.wobbleSpeed
        e.y += e.speedY
        e.x += Math.sin(e.wobble) * 0.6
        e.life -= e.decay
        if (e.life <= 0 || e.y < -20) Object.assign(e, spawnEmber(W, H))

        const alpha = Math.min(1, e.life) * 0.9
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.shadowBlur = e.size * 4
        ctx.shadowColor = e.color
        ctx.fillStyle = e.color
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
