'use client'

import { useEffect, useRef } from 'react'

interface ParticleData {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  life: number
  decay: number
  hue: 'gold' | 'red'
}

function createParticle(W: number, H: number): ParticleData {
  return {
    x: Math.random() * W,
    y: H + 20,
    size: Math.random() * 2.5 + 0.5,
    speedY: -(Math.random() * 0.8 + 0.3),
    speedX: (Math.random() - 0.5) * 0.4,
    life: 1,
    decay: Math.random() * 0.003 + 0.001,
    hue: Math.random() < 0.5 ? 'gold' : 'red',
  }
}

function resetParticle(p: ParticleData, W: number, H: number) {
  p.x = Math.random() * W
  p.y = H + 20
  p.size = Math.random() * 2.5 + 0.5
  p.speedY = -(Math.random() * 0.8 + 0.3)
  p.speedX = (Math.random() - 0.5) * 0.4
  p.life = 1
  p.decay = Math.random() * 0.003 + 0.001
  p.hue = Math.random() < 0.5 ? 'gold' : 'red'
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    let rafId: number

    const particles: ParticleData[] = Array.from({ length: 80 }, (_, i) => {
      const p = createParticle(W, H)
      if (i < 80) p.y = Math.random() * H
      return p
    })

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.y += p.speedY
        p.x += p.speedX
        p.life -= p.decay
        if (p.life <= 0 || p.y < -20) resetParticle(p, W, H)

        ctx.save()
        ctx.globalAlpha = p.life * 0.5
        ctx.fillStyle =
          p.hue === 'gold'
            ? `rgba(212,160,23,${p.life})`
            : `rgba(200,40,40,${p.life})`
        ctx.shadowBlur = 6
        ctx.shadowColor = p.hue === 'gold' ? '#D4A017' : '#B01A1A'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particles"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
