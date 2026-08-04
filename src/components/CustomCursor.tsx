'use client'

import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

// Relative luminance (0-255) of a computed `rgb()`/`rgba()` color string.
// Returns null for fully transparent colors so callers can keep looking
// up the ancestor chain for the actual visible background.
function luminanceOf(color: string): number | null {
  const m = color.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const [r, g, b, a = 1] = m[1].split(',').map(v => parseFloat(v))
  if (Number.isNaN(r) || a === 0) return null
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Scans every element stacked at this point, topmost paint order first
// (elementsFromPoint, not elementFromPoint — background layers here are
// often pointer-events:none siblings like HeroSection's `.heroBg`, not
// ancestors of whatever is hit-testable), and returns the luminance of
// the first solid color found. Falls back to the page background.
function backgroundLuminanceAt(x: number, y: number): number {
  const stack = document.elementsFromPoint(x, y)
  for (const el of stack) {
    if ((el as HTMLElement).dataset.cursorLayer) continue
    const lum = luminanceOf(getComputedStyle(el).backgroundColor)
    if (lum !== null) return lum
  }
  return 255
}

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const mx = useRef(-400); const my = useRef(-400)
  const rx = useRef(-400); const ry = useRef(-400)
  const gx = useRef(-400); const gy = useRef(-400)
  const px = useRef(-400); const py = useRef(-400) // last position used for facing angle
  const angle = useRef(-45)
  const onDark = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.13
      ry.current += (my.current - ry.current) * 0.13
      gx.current += (mx.current - gx.current) * 0.055
      gy.current += (my.current - gy.current) * 0.055

      // Turn the triangle to face the direction of travel
      const dx = mx.current - px.current
      const dy = my.current - py.current
      if (dx * dx + dy * dy > 4) {
        const target = Math.atan2(dy, dx) * (180 / Math.PI) + 90
        const delta = ((target - angle.current + 180) % 360 + 360) % 360 - 180
        angle.current += delta * 0.2
        px.current = mx.current
        py.current = my.current
      }

      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px'
        ringRef.current.style.top  = ry.current + 'px'
      }
      if (glowRef.current) {
        glowRef.current.style.left = gx.current + 'px'
        glowRef.current.style.top  = gy.current + 'px'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(-50%, -50%) rotate(${angle.current}deg)`
      }

      // Adapt color to whatever is under the pointer right now
      const dark = backgroundLuminanceAt(mx.current, my.current) < 150
      if (dark !== onDark.current) {
        onDark.current = dark
        dotRef.current?.classList.toggle(styles.onDark, dark)
        ringRef.current?.classList.toggle(styles.onDark, dark)
        glowRef.current?.classList.toggle(styles.onDark, dark)
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onEnter = () => {
      dotRef.current?.classList.add(styles.dotHover)
      ringRef.current?.classList.add(styles.ringHover)
      glowRef.current?.classList.add(styles.glowHover)
    }
    const onLeave = () => {
      dotRef.current?.classList.remove(styles.dotHover)
      ringRef.current?.classList.remove(styles.ringHover)
      glowRef.current?.classList.remove(styles.glowHover)
    }
    const onDown = () => {
      dotRef.current?.classList.add(styles.dotClick)
      ringRef.current?.classList.add(styles.ringClick)
    }
    const onUp = () => {
      dotRef.current?.classList.remove(styles.dotClick)
      ringRef.current?.classList.remove(styles.ringClick)
    }

    // Event delegation — one pair of listeners covers all links/buttons,
    // including those added dynamically after the component mounts.
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) onEnter()
    }
    const onOut = (e: MouseEvent) => {
      const target   = e.target as Element
      const related  = e.relatedTarget as Element | null
      if (
        target.closest('a, button, [role="button"]') &&
        !related?.closest('a, button, [role="button"]')
      ) onLeave()
    }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" data-cursor-layer="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" data-cursor-layer="true" />
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" data-cursor-layer="true" />
    </>
  )
}
