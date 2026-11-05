'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CHURCH, DECLARATION, STATS } from '@/data/siteData'
import NextServiceBadge from './NextServiceBadge'
import CountUp from './CountUp'
import styles from './HeroSection.module.css'

// Rotating headline words come straight from the General Overseer's
// declaration over MFM, so the hero speaks the same language as the
// Declaration band further down the page.
const WORDS = DECLARATION.slice(0, 4).map((d) => d.word)
const HERO_STATS = STATS.filter((s) => s.label !== 'Active Ministries').slice(0, 3)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [wordIndex, setWordIndex] = useState(0)

  // Cycle the headline word
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  // Cursor spotlight + gentle 3D tilt on the photo frame (fine pointers only)
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        hero.style.setProperty('--mx', `${x * 100}%`)
        hero.style.setProperty('--my', `${y * 100}%`)
        const frame = frameRef.current
        if (frame) {
          frame.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
          frame.style.setProperty('--ry', `${(x - 0.5) * 8}deg`)
        }
      })
    }
    const onLeave = () => {
      frameRef.current?.style.setProperty('--rx', '0deg')
      frameRef.current?.style.setProperty('--ry', '0deg')
    }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CHURCH.address)}`

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      {/* ── Atmosphere ── */}
      <div className={styles.aurora} aria-hidden>
        <span className={styles.blobA} />
        <span className={styles.blobB} />
        <span className={styles.blobC} />
      </div>
      <div className={styles.grid} aria-hidden />
      <div className={styles.spotlight} aria-hidden />
      <div className={styles.grain} aria-hidden />

      <div className={styles.inner}>
        {/* ── Copy ── */}
        <div className={styles.copy}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            <span>MFM Tampa, Florida</span>
            <span className={styles.pillSep} />
            <span className={styles.pillMuted}>All are welcome</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.srOnly}>Mountain of Fire and Miracles Ministries, Tampa, Florida — </span>
            <span className={styles.titleLead}>A sanctuary of</span>
            <span className={styles.wordWrap} aria-live="polite">
              <span key={WORDS[wordIndex]} className={styles.word}>
                {WORDS[wordIndex]}.
              </span>
            </span>
          </h1>

          <p className={styles.lead}>
            Welcome home to Mountain of Fire and Miracles Ministries. A
            Spirit-filled family devoted to prayer, sound teaching and
            real breakthrough, in person on North Florida Avenue or live
            wherever you are.
          </p>

          <div className={styles.ctas}>
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              Plan Your Visit
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@mfm-tampaflorida4355"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGhost}
            >
              <span className={styles.playIcon} aria-hidden>
                <svg viewBox="0 0 24 24" width="12" height="12"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
              </span>
              Watch Online
            </a>
          </div>

          <dl className={styles.stats}>
            {HERO_STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt className={styles.statLabel}>{s.label}</dt>
                <dd className={styles.statNum}>
                  {s.num === 1989 ? '1989' : <CountUp end={s.num} suffix={s.suffix} />}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Visual ── */}
        <div className={styles.visual}>
          <div ref={frameRef} className={styles.frame}>
            <Image
              src="/church-building-hero.jpg"
              alt="The MFM Tampa church building on North Florida Avenue"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className={styles.frameImg}
            />
            <div className={styles.frameShade} />
            <div className={styles.frameShine} />

            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={styles.location}>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="10" r="2.5" fill="currentColor" />
              </svg>
              {CHURCH.address}
            </a>
          </div>

          {/* Rotating seal */}
          <div className={styles.seal} aria-hidden>
            <svg viewBox="0 0 120 120" className={styles.sealText}>
              <defs>
                <path id="heroSealPath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#heroSealPath" textLength="286" lengthAdjust="spacing">PRAYER • WORSHIP • DELIVERANCE • MIRACLES •</textPath>
              </text>
            </svg>
            <div className={styles.sealLogo}>
              <Image src="/new Logo mfm.png" alt="" width={56} height={56} />
            </div>
          </div>

          {/* Sunday chip */}
          <div className={styles.chip}>
            <span className={styles.chipIcon} aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <strong>Sunday Worship</strong>
              <em>10:00 AM ET, weekly</em>
            </span>
          </div>

          {/* Countdown card */}
          <NextServiceBadge />
        </div>
      </div>

      <a href="#bring-your-problems-to-god" className={styles.scrollCue} aria-label="Scroll to explore">
        <span className={styles.mouse}><span className={styles.mouseWheel} /></span>
        <span>Scroll</span>
      </a>
    </section>
  )
}
