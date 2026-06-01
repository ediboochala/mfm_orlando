'use client'

import { useEffect, useRef } from 'react'
import { STATS } from '@/data/siteData'
import styles from './StatsSection.module.css'

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const duration = 1800
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.floor(eased * target).toLocaleString()
            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              el.textContent = target.toLocaleString() + suffix
            }
          }
          requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return <span ref={ref}>0</span>
}

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.strip}>
        {STATS.map((stat, i) => (
          <div key={i} className={`${styles.item} reveal d${i + 1}`}>
            <span className={styles.num}>
              <CountUp target={stat.num} suffix={stat.suffix} />
            </span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
