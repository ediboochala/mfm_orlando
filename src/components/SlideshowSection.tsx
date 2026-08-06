'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './SlideshowSection.module.css'

const SLIDES = [
  {
    label: 'Sunday Worship',
    title: 'Come Into His Presence',
    desc: 'Join us every Sunday for a powerful time of worship, the Word, and encounter with the living God.',
    accent: '#E8B923',
    image: '/22 (1).jpg',
  },
  {
    label: 'Prayer and Deliverance',
    title: 'Set Free by His Power',
    desc: 'Aggressive prayer is the engine of MFM. Every service is a portal of deliverance, healing, and breakthrough.',
    accent: '#FFC5FF',
    image: '/22 (2).jpg',
  },
  {
    label: 'Bible Study',
    title: 'Rooted in the Word',
    desc: 'We are a Word-based ministry. Every prayer point, every doctrine, every step is grounded in Scripture.',
    accent: '#E8B923',
    image: '/22 (3).jpg',
  },
  {
    label: 'Youth and Family',
    title: 'Building the Next Generation',
    desc: 'Our children and youth programs raise up a generation that is on fire for God — bold, pure, and unashamed.',
    accent: '#FFC5FF',
    image: '/22 (4).jpg',
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
    }, 400)
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
      {/* ── Main Stage ── */}
      <div className={`${styles.stage} ${fading ? styles.fading : ''}`}>

        {/* Photo background */}
        <div className={styles.stageImg}>
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={active === 0}
          />
        </div>

        {/* Dark overlay — keeps text readable */}
        <div className={styles.stageOverlay} />

        {/* Subtle gold grid on top */}
        <div className={styles.stageGrid} />

        {/* Corner accents */}
        <div className={styles.cornerTL} style={{ borderColor: slide.accent + '88' }} />
        <div className={styles.cornerBR} style={{ borderColor: slide.accent + '88' }} />

        {/* Text content */}
        <div className={styles.stageContent}>
          <span className={styles.slideLabel} style={{ color: slide.accent }}>{slide.label}</span>
          <h2 className={styles.slideTitle}>{slide.title}</h2>
          <div className={styles.slideDivider} style={{ background: `linear-gradient(90deg, ${slide.accent}, transparent)` }} />
          <p className={styles.slideDesc}>{slide.desc}</p>
        </div>

        {/* Slide counter */}
        <div className={styles.slideNum}>
          <span className={styles.slideNumCurrent}>{String(active + 1).padStart(2, '0')}</span>
          <span className={styles.slideNumSep} />
          <span className={styles.slideNumTotal}>{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className={styles.thumbStrip}>
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
          >
            {/* Real photo thumbnail */}
            <div className={styles.thumbImg}>
              <Image
                src={s.image}
                alt={s.label}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center', opacity: i === active ? 1 : 0.45 }}
              />
            </div>
            <div className={styles.thumbOverlay} />
            <div className={styles.thumbContent}>
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

      {/* ── Dot navigation ── */}
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
