'use client'

import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const mx = useRef(-400); const my = useRef(-400)
  const rx = useRef(-400); const ry = useRef(-400)
  const gx = useRef(-400); const gy = useRef(-400)
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

      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px'
        ringRef.current.style.top  = ry.current + 'px'
      }
      if (glowRef.current) {
        glowRef.current.style.left = gx.current + 'px'
        glowRef.current.style.top  = gy.current + 'px'
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
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
    </>
  )
}
