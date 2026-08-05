'use client'

import { useState, useEffect, useRef, useCallback, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MINISTRIES, MINISTRY_PROJECTS } from '@/data/siteData'
import MinistryIcon from '@/components/MinistryIcon'
import styles from './page.module.css'

type Project = (typeof MINISTRY_PROJECTS)[number]

const ALL_PHOTOS = MINISTRY_PROJECTS

/* ── Shared flame placeholder ── */
function FlameHolder({ small = false }: { small?: boolean }) {
  const uid = useId().replace(/:/g, '_')
  return (
    <div className={small ? styles.thumbEmpty : styles.photoPlaceholder}>
      {!small && (
        <>
          <svg width="26" height="36" viewBox="0 0 26 38" fill="none">
            <path
              d="M13 2C13 2 20 9 18 18C22 14 24 8 22 4C26 10 27 18 23 25C20 30 16 33 13 38C10 33 6 30 3 25C-1 18 0 10 4 4C2 8 4 14 8 18C6 9 13 2 13 2Z"
              fill={`url(#flame-${uid})`}
            />
            <defs>
              <linearGradient id={`flame-${uid}`} x1="13" y1="2" x2="13" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#FFF9C4" stopOpacity="0.3" />
                <stop offset="50%"  stopColor="#E0217A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A8125A" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>
          <span className={styles.photoPlaceholderText}>Photos Coming Soon</span>
        </>
      )}
    </div>
  )
}

/* ── Per-ministry carousel ── */
function MinistryCarousel({
  photos,
  onOpen,
}: {
  photos: Project[]
  onOpen: (globalIdx: number) => void
}) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goNext = useCallback(() => setActive(i => (i + 1) % photos.length), [photos.length])
  const goPrev = useCallback(() => setActive(i => (i - 1 + photos.length) % photos.length), [photos.length])

  const startAuto = useCallback(() => {
    if (photos.length < 2) return
    timerRef.current = setInterval(goNext, 4000)
  }, [goNext, photos.length])

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => { startAuto(); return stopAuto }, [startAuto, stopAuto])

  const photo = photos[active]

  const handleClick = () => {
    if (!photo.image) return
    const idx = ALL_PHOTOS.findIndex(p => p.id === photo.id)
    onOpen(idx)
  }

  return (
    <div className={styles.splitPhotos}>
      <div className={styles.photosHeader}>
        <span className={styles.photosLabel}>Our Work</span>
        <div className={styles.photosRule} />
      </div>

      <div className={styles.carousel} onMouseEnter={stopAuto} onMouseLeave={startAuto}>
        {/* Main card */}
        <div
          className={`${styles.photoCard} ${photo.image ? styles.photoCardClickable : ''}`}
          onClick={handleClick}
        >
          <div className={styles.photoWrap}>
            {photo.image ? (
              <>
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className={styles.photoImg}
                  sizes="(max-width: 900px) 80vw, 42vw"
                />
                <div className={styles.zoomOverlay}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={styles.zoomLabel}>View All</span>
                </div>
              </>
            ) : (
              <FlameHolder />
            )}
          </div>
          <div className={styles.photoCaption}>
            {photo.date === 'Coming Soon' ? (
              <span className={styles.photoDateUpcoming}>Upcoming</span>
            ) : (
              <span className={styles.photoDate}>{photo.date}</span>
            )}
            <h3 className={styles.photoTitle}>{photo.title}</h3>
            <p className={styles.photoDesc}>{photo.description}</p>
          </div>
        </div>

        {/* Prev / dots / next */}
        {photos.length > 1 && (
          <div className={styles.carouselControls}>
            <button className={styles.carouselArrow} onClick={goPrev} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={styles.dots}>
              {photos.map((_, i) => (
                <button key={i} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
            <button className={styles.carouselArrow} onClick={goNext} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        {/* Thumbnail strip */}
        {photos.length > 1 && (
          <div className={styles.thumbStrip}>
            {photos.map((p, i) => (
              <button key={p.id} className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`} onClick={() => setActive(i)} aria-label={p.title}>
                <div className={styles.thumbInner}>
                  {p.image
                    ? <Image src={p.image} alt={p.title} fill className={styles.thumbImg} sizes="72px" />
                    : <FlameHolder small />
                  }
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Lightbox ── */
function Lightbox({ startIdx, onClose }: { startIdx: number; onClose: () => void }) {
  const [active, setActive] = useState(startIdx)
  const [playing, setPlaying] = useState(true)
  const stripRef = useRef<HTMLDivElement>(null)

  const goNext = useCallback(() => setActive(i => (i + 1) % ALL_PHOTOS.length), [])
  const goPrev = useCallback(() => setActive(i => (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length), [])

  /* Auto-play */
  useEffect(() => {
    if (!playing) return
    const t = setInterval(goNext, 3500)
    return () => clearInterval(t)
  }, [playing, goNext])

  /* Keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { goNext(); setPlaying(false) }
      if (e.key === 'ArrowLeft')  { goPrev(); setPlaying(false) }
      if (e.key === 'Escape')      onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [goNext, goPrev, onClose])

  /* Scroll active thumb into view */
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const photo = ALL_PHOTOS[active]

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <div className={styles.lightboxPanel} onClick={e => e.stopPropagation()}>

        {/* Header bar */}
        <div className={styles.lbHeader}>
          <span className={styles.lbCounter}>{active + 1} / {ALL_PHOTOS.length}</span>
          <span className={styles.lbTitle}>{photo.title}</span>
          <div className={styles.lbHeaderActions}>
            <button className={styles.lbBtn} onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1.5" y="1" width="3.5" height="11" rx="1" fill="currentColor" />
                  <rect x="8"   y="1" width="3.5" height="11" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 1.5l10 5-10 5V1.5z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button className={`${styles.lbBtn} ${styles.lbClose}`} onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {playing && (
          <div className={styles.lbProgressTrack}>
            <div key={active} className={styles.lbProgressBar} />
          </div>
        )}

        {/* Stage */}
        <div className={styles.lbStage}>
          <button className={styles.lbNavBtn} onClick={() => { goPrev(); setPlaying(false) }} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 4L7 11L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={styles.lbImgWrap}>
            {photo.image ? (
              <Image key={photo.id} src={photo.image} alt={photo.title} fill className={styles.lbImg} sizes="(max-width: 700px) 90vw, 68vw" priority />
            ) : (
              <FlameHolder />
            )}
            <div className={`${styles.lbDateBadge} ${photo.date === 'Coming Soon' ? styles.lbDateBadgeUpcoming : ''}`}>
              {photo.date === 'Coming Soon' ? 'Upcoming' : photo.date}
            </div>
          </div>

          <button className={styles.lbNavBtn} onClick={() => { goNext(); setPlaying(false) }} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M8 4L15 11L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Card strip — all ~14 cards */}
        <div className={styles.lbStrip} ref={stripRef}>
          {ALL_PHOTOS.map((p, i) => (
            <button
              key={p.id}
              data-idx={i}
              className={`${styles.stripCard} ${i === active ? styles.stripCardActive : ''}`}
              onClick={() => { setActive(i); setPlaying(false) }}
              aria-label={p.title}
            >
              <div className={styles.stripImgWrap}>
                {p.image
                  ? <Image src={p.image} alt={p.title} fill className={styles.stripImg} sizes="100px" />
                  : <div className={styles.stripPlaceholder} />
                }
              </div>
              <span className={styles.stripLabel}>{p.title}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ── Main export ── */
export default function MinistriesContent() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const openLightbox  = useCallback((idx: number) => setLightboxIdx(idx), [])
  const closeLightbox = useCallback(() => setLightboxIdx(null), [])

  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.ministriesList}>
            {MINISTRIES.map((ministry) => {
              const photos = MINISTRY_PROJECTS.filter(p => p.ministryId === ministry.id)
              return (
                <section key={ministry.id} className={styles.ministrySection}>
                  <div className={styles.ministrySplit}>

                    {/* LEFT — ministry info */}
                    <div className={styles.splitInfo}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}><MinistryIcon name={ministry.icon} size={40} /></span>
                        <div className={styles.cardTitles}>
                          <h2 className={styles.cardName}>{ministry.name}</h2>
                          <span className={styles.cardSubtitle}>{ministry.subtitle}</span>
                        </div>
                      </div>
                      <div className={styles.cardDivider} />
                      <p className={styles.cardTagline}>{ministry.tagline}</p>
                      <p className={styles.cardDescription}>{ministry.description}</p>
                      <ul className={styles.cardDetails}>
                        {ministry.details.map((detail, i) => (
                          <li key={i} className={styles.cardDetail}>
                            <span className={styles.detailDot} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div className={styles.cardFooter}>
                        <div className={styles.membershipBadge}>
                          <span className={styles.membershipLabel}>Membership</span>
                          <span className={styles.membershipValue}>{ministry.membership}</span>
                        </div>
                        <blockquote className={styles.cardScripture}>{ministry.scripture}</blockquote>
                      </div>
                    </div>

                    {/* RIGHT — carousel */}
                    <MinistryCarousel photos={photos} onOpen={openLightbox} />

                  </div>
                </section>
              )
            })}
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Ready to Get Involved?</h3>
            <p className={styles.ctaText}>
              Every ministry at MFM Tampa Florida is open and welcoming. Whether you want to join, serve, or simply find out more — reach out to us and we will connect you with the right family.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <Link href="/services" className="btn-secondary">View Service Times</Link>
            </div>
          </div>
        </div>
      </main>

      {lightboxIdx !== null && (
        <Lightbox startIdx={lightboxIdx} onClose={closeLightbox} />
      )}
    </>
  )
}
