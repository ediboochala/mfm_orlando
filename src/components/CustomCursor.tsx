'use client'

import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mx = useRef(0)
  const my = useRef(0)
  const rx = useRef(0)
  const ry = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX
      my.current = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const animRing = () => {
      rx.current += (mx.current - rx.current) * 0.12
      ry.current += (my.current - ry.current) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + 'px'
        ringRef.current.style.top = ry.current + 'px'
      }
      rafRef.current = requestAnimationFrame(animRing)
    }
    rafRef.current = requestAnimationFrame(animRing)

    const grow = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '20px'; cursorRef.current.style.height = '20px' }
      if (ringRef.current)   { ringRef.current.style.width = '60px';   ringRef.current.style.height = '60px' }
    }
    const shrink = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '12px'; cursorRef.current.style.height = '12px' }
      if (ringRef.current)   { ringRef.current.style.width = '36px';   ringRef.current.style.height = '36px' }
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, .service-card, .ministry-card').forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={ringRef}   className={styles.cursorRing} />
    </>
  )
}
