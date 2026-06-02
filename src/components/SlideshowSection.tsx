'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './SlideshowSection.module.css'

const SLIDES = [
  {
    label: 'Sunday Worship',
    title: 'Come Into His Presence',
    desc: 'Join us every Sunday for a powerful time of worship, the Word, and encounter with the living God.',
    accent: '#B01A1A',
    pattern: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(176,26,26,0.45) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 30%, rgba(212,160,23,0.12) 0%, transparent 60%)',
    icon: '🙌',
  },
  {
    label: 'Prayer & Deliverance',
    title: 'Set Free by His Power',
    desc: 'Aggressive prayer is the engine of MFM. Every service is a portal of deliverance, healing, and breakthrough.',
    accent: '#D4A017',
    pattern: 'radial-gradient(ellipse 60% 70% at 70% 40%, rgba(212,160,23,0.2) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 20% 70%, rgba(176,26,26,0.35) 0%, transparent 60%)',
    icon: '🔥',
  },
  {
    label: 'Bible Study',
    title: 'Rooted in the Word',
    desc: 'We are a Word-based ministry. Every prayer point, every doctrine, every step is grounded in Scripture.',
    accent: '#B01A1A',
    pattern: 'radial-gradient(ellipse 80% 50% at 50% 80%, rgba(176,26,26,0.4) 0%, transparent 65%), radial-gradient(ellipse 30% 30% at 85% 15%, rgba(212,160,23,0.15) 0%, transparent 55%)',
    icon: '📖',
  },
  {
    label: 'Youth & Family',
    title: 'Building the Next Generation',
    desc: 'Our children and youth programs raise up a generation that is on fire for God — bold, pure, and unashamed.',
    accent: '#D4A017',
    pattern: 'radial-gradient(ellipse 50% 60% at 20% 30%, rgba(212,160,23,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 60% 70%, rgba(176,26,26,0.38) 0%, transparent 65%)',
    icon: '✝️',
  },
]

export default function SlideshowSection() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((idx: number) => {
    setFading(true)
    setTimeout(() => {
      setActive(idx)
      setFading(false)
    }, 350)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [active, goTo])

  const slide = SLIDES[active]

  return (
    <section className={styles.section}>
      {/* Main slide display */}
      <div className={`${styles.stage} ${fading ? styles.fading : ''}`}>
        {/* Background pattern */}
        <div className={styles.stageBg} style={{ background: slide.pattern }} />

        {/* Grid overlay */}
        <div className={styles.stageGrid} />

        {/* Corner accents */}
        <div className={styles.cornerTL} style={{ borderColor: slide.accent + '55' }} />
        <div className={styles.cornerBR} style={{ borderColor: slide.accent + '55' }} />

        {/* Slide content */}
        <div className={styles.stageContent}>
          <div className={styles.slideIcon}>{slide.icon}</div>
          <span className={styles.slideLabel} style={{ color: slide.accent }}>{slide.label}</span>
          <h2 className={styles.slideTitle}>{slide.title}</h2>
          <div className={styles.slideDivider} style={{ background: `linear-gradient(90deg, ${slide.accent}, transparent)` }} />
          <p className={styles.slideDesc}>{slide.desc}</p>
        </div>

        {/* Slide number */}
        <div className={styles.slideNum}>
          <span className={styles.slideNumCurrent}>{String(active + 1).padStart(2, '0')}</span>
          <span className={styles.slideNumSep} />
          <span className={styles.slideNumTotal}>{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className={styles.thumbStrip}>
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
          >
            <div
              className={styles.thumbBg}
              style={{ background: s.pattern, opacity: i === active ? 1 : 0.4 }}
            />
            <div className={styles.thumbGrid} />
            <div className={styles.thumbContent}>
              <span className={styles.thumbIcon}>{s.icon}</span>
              <span className={styles.thumbLabel}>{s.label}</span>
            </div>
            {i === active && (
              <div className={styles.thumbProgress} style={{ borderColor: s.accent }}>
                <div className={styles.thumbProgressBar} style={{ background: s.accent }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Dot navigation */}
      <div className={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
