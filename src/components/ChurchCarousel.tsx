'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './ChurchCarousel.module.css'

const CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1725245997924-632b5673e18a?w=1200&q=80&auto=format&fit=crop',
    tag: 'Our Congregation',
    title: 'A Family of Believers',
    desc: 'United in faith, prayer, and the love of Christ — the MFM Tampa Florida family welcomes every soul seeking God\'s presence.',
  },
  {
    image: '/22 (2).jpg',
    tag: 'Sunday Service',
    title: 'Spirit-Filled Worship',
    desc: 'Every Sunday is a divine encounter. We gather to worship, receive the Word, and experience the transforming power of God.',
  },
  {
    image: 'https://images.unsplash.com/photo-1579028073882-362f186efb77?w=1200&q=80&auto=format&fit=crop',
    tag: 'Prayer and Deliverance',
    title: 'Aggressive Prayer',
    desc: 'We believe in fervent, targeted prayer that breaks every yoke. Deliverance and healing are available to all who call upon His name.',
  },
  {
    image: '/22 (4).jpg',
    tag: 'Church Community',
    title: 'One Body, Many Members',
    desc: 'From children to elders, from new converts to seasoned warriors — MFM Tampa Florida is a church where everyone belongs.',
  },
  {
    image: '/Pst Tampa.png',
    tag: 'Pastoral Leadership',
    title: 'Under Anointed Leadership',
    desc: 'Under the shepherding of Pastor Kehinde Olajide, our congregation is guided, counselled, and equipped for the work of the Kingdom.',
  },
]

const VISIBLE = 3

export default function ChurchCarousel() {
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(0)
  const maxIndex = CARDS.length - VISIBLE

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(maxIndex, i + 1))

  // Drag / swipe support
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    dragStart.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return
    setDragging(false)
    const delta = dragStart.current - e.clientX
    if (delta > 50) next()
    else if (delta < -50) prev()
  }

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i >= maxIndex ? 0 : i + 1))
    }, 4500)
    return () => clearInterval(t)
  }, [maxIndex])

  return (
    <div className={styles.carousel}>
      {/* Track */}
      <div
        className={styles.trackWrap}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(calc(-${index} * (var(--card-w) + var(--gap))))` }}
        >
          {CARDS.map((card, i) => (
            <div key={i} className={styles.card}>
              {/* Photo */}
              <div className={styles.cardImg}>
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                ) : (
                  <div className={styles.cardImgPlaceholder}>
                    <svg width="34" height="48" viewBox="0 0 26 38" fill="none">
                      <path
                        d="M13 2C13 2 20 9 18 18C22 14 24 8 22 4C26 10 27 18 23 25C20 30 16 33 13 38C10 33 6 30 3 25C-1 18 0 10 4 4C2 8 4 14 8 18C6 9 13 2 13 2Z"
                        fill="url(#carouselFlame)"
                      />
                      <defs>
                        <linearGradient id="carouselFlame" x1="13" y1="2" x2="13" y2="38" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFF9C4" />
                          <stop offset="50%" stopColor="#FF7A1A" />
                          <stop offset="100%" stopColor="#A8125A" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className={styles.cardImgPlaceholderText}>Photo Coming Soon</span>
                  </div>
                )}
              </div>
              {/* Gradient overlay */}
              <div className={styles.cardOverlay} />
              {/* Text */}
              <div className={styles.cardBody}>
                <span className={styles.cardTag}>{card.tag}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <div className={styles.cardLine} />
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={`${styles.arrow} ${index === 0 ? styles.arrowDisabled : ''}`}
          onClick={prev}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className={styles.dots}>
          {CARDS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => setIndex(Math.min(i, maxIndex))}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${index >= maxIndex ? styles.arrowDisabled : ''}`}
          onClick={next}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
