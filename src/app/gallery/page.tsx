'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CHURCH, GALLERY_EVENTS, type GalleryEvent, type GalleryPhoto } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

type Slide = GalleryPhoto & { event: GalleryEvent }

const PLACEHOLDER_TILES = 6
// Photos shown per album before "Show more" — keeps big albums calm
const PAGE_SIZE = 12

export default function GalleryPage() {
  const [active, setActive] = useState<string>('all')
  const [lightbox, setLightbox] = useState<{ index: number; dir: 1 | -1 } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  // Per-album moment filter and how many photos are revealed so far
  const [moments, setMoments] = useState<Record<string, string>>({})
  const [visible, setVisible] = useState<Record<string, number>>({})

  const photosFor = useCallback(
    (event: GalleryEvent) => {
      const m = moments[event.slug]
      return m ? event.photos.filter((p) => p.moment === m) : event.photos
    },
    [moments]
  )
  const pickMoment = (slug: string, moment: string) => {
    setMoments((prev) => ({ ...prev, [slug]: moment }))
    setVisible((prev) => ({ ...prev, [slug]: PAGE_SIZE }))
  }

  const events = useMemo(
    () => (active === 'all' ? GALLERY_EVENTS : GALLERY_EVENTS.filter((e) => e.slug === active)),
    [active]
  )

  // Flat list of every visible photo — the lightbox walks through this in order
  const slides: Slide[] = useMemo(
    () => events.flatMap((event) => photosFor(event).map((p) => ({ ...p, event }))),
    [events, photosFor]
  )

  const totalPhotos = GALLERY_EVENTS.reduce((n, e) => n + e.photos.length, 0)
  const heroSlides = GALLERY_EVENTS.flatMap((e) => e.photos.slice(0, 3))
  const [heroIndex, setHeroIndex] = useState(0)

  // ── Hero crossfade between a few featured photos from each event ──
  useEffect(() => {
    if (heroSlides.length < 2) return
    const id = window.setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 6000)
    return () => window.clearInterval(id)
  }, [heroSlides.length])

  // ── Sliding tab indicator ──
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`)
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
  }, [active])

  // ── Staggered scroll reveal (re-armed whenever the filter changes) ──
  useEffect(() => {
    const root = gridRef.current
    if (!root) return
    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.shown)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [active, moments, visible])

  const open = (src: string) => {
    const index = slides.findIndex((s) => s.src === src)
    if (index !== -1) setLightbox({ index, dir: 1 })
  }
  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((lb) => (lb ? { index: (lb.index + dir + slides.length) % slides.length, dir } : lb)),
    [slides.length]
  )

  // Keyboard navigation + body scroll lock while the lightbox is open
  const isOpen = lightbox !== null
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  // Swipe between photos on touch screens
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const current = lightbox ? slides[lightbox.index] : null

  return (
    <div className={styles.page}>

      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Gallery</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        {heroSlides.length > 0 ? (
          <div className={styles.heroSlides} aria-hidden="true">
            {heroSlides.map((p, i) => (
              <div
                key={p.src}
                className={`${styles.heroSlide} ${i === heroIndex ? styles.heroSlideActive : ''}`}
              >
                <Image src={p.src} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} priority={i === 0} />
              </div>
            ))}
            <div className={styles.heroTint} />
          </div>
        ) : (
          <PageHeroWatermark />
        )}

        <div className={styles.heroInner}>
          <span className={`${styles.heroLabel} ${styles.rise}`}>His Works Among Us</span>
          <h1 className={styles.heroTitle}>
            {['Moments', 'of', 'Glory'].map((word, i) => (
              <span key={word} className={styles.heroWord} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                {word}
              </span>
            ))}
          </h1>
          <div className={`${styles.heroDivider} ${styles.grow}`} />
          <p className={`${styles.heroSub} ${styles.rise}`} style={{ animationDelay: '0.6s' }}>
            From the Great Florida Deliverance Crusade to the dedication of our house of worship —
            relive the moments where the power of God was on full display.
          </p>
          <div className={`${styles.heroStats} ${styles.rise}`} style={{ animationDelay: '0.75s' }}>
            <span><strong>{GALLERY_EVENTS.length}</strong> Events</span>
            <span className={styles.heroDot} />
            <span><strong>{totalPhotos || '—'}</strong> Photos</span>
          </div>
        </div>
        <a href="#albums" className={styles.scrollCue} aria-label="Scroll to the albums">
          <span />
        </a>
      </header>

      {/* ── Event Tabs ── */}
      <div className={styles.tabBar} id="albums">
        <div className={styles.tabInner} ref={tabsRef} role="tablist">
          <span className={styles.tabIndicator} style={{ left: indicator.left, width: indicator.width }} />
          {[{ slug: 'all', label: 'All Events' }, ...GALLERY_EVENTS].map((tab) => (
            <button
              key={tab.slug}
              data-tab={tab.slug}
              role="tab"
              aria-selected={active === tab.slug}
              className={`${styles.tab} ${active === tab.slug ? styles.tabActive : ''}`}
              onClick={() => setActive(tab.slug)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Albums ── */}
      <main className={styles.main} ref={gridRef} key={active}>
        {events.map((event, eventIdx) => (
          <section key={event.slug} className={styles.album}>
            {/* Story panel */}
            <aside className={styles.story}>
              <div className={styles.storySticky} data-reveal>
                <span className={styles.storyNumber}>{String(GALLERY_EVENTS.indexOf(event) + 1).padStart(2, '0')}</span>
                <span className={styles.storyTagline}>{event.tagline}</span>
                <h2 className={styles.storyTitle}>{event.title}</h2>
                <div className={styles.storyMeta}>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    {event.date}
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    {event.venue}
                  </span>
                </div>
                {event.summary.map((para, i) => (
                  <p key={i} className={styles.storyText}>{para}</p>
                ))}
                <dl className={styles.facts}>
                  {event.facts.map((f) => (
                    <div key={f.label} className={styles.fact}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <span className={styles.photoCount}>
                  {event.photos.length > 0
                    ? `${event.photos.length} photo${event.photos.length === 1 ? '' : 's'}`
                    : 'Photos coming soon'}
                </span>
              </div>
            </aside>

            {/* Photo wall */}
            {(() => {
              const filtered = photosFor(event)
              const limit = visible[event.slug] ?? PAGE_SIZE
              const shownPhotos = filtered.slice(0, limit)
              const remaining = filtered.length - shownPhotos.length
              const currentMoment = moments[event.slug] ?? ''
              return (
            <div className={styles.wallCol}>
              {event.moments && event.photos.length > 0 && (
                <div className={styles.chips} role="group" aria-label={`Filter ${event.label} photos`}>
                  {['', ...event.moments].map((m) => {
                    const count = m ? event.photos.filter((p) => p.moment === m).length : event.photos.length
                    return (
                      <button
                        key={m || 'all'}
                        type="button"
                        className={`${styles.chip} ${currentMoment === m ? styles.chipActive : ''}`}
                        aria-pressed={currentMoment === m}
                        onClick={() => pickMoment(event.slug, m)}
                      >
                        {m || 'Highlights'}
                        <span className={styles.chipCount}>{count}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            <div className={styles.wall} key={currentMoment}>
              {event.photos.length > 0
                ? shownPhotos.map((photo, i) => (
                    <button
                      key={photo.src}
                      type="button"
                      data-reveal
                      className={styles.tile}
                      style={{ '--d': `${(i % PAGE_SIZE) * 60}ms` } as React.CSSProperties}
                      onClick={() => open(photo.src)}
                      aria-label={`View photo: ${photo.caption ?? event.title}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption ?? `${event.title} photo ${i + 1}`}
                        width={0}
                        height={0}
                        sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 22vw"
                        className={styles.tileImg}
                      />
                      <span className={styles.tileShade} />
                      <span className={styles.tileCaption}>
                        <span className={styles.tileEvent}>{event.label}</span>
                        {photo.caption && <span className={styles.tileText}>{photo.caption}</span>}
                      </span>
                      <span className={styles.tileZoom} aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  ))
                : Array.from({ length: PLACEHOLDER_TILES }).map((_, i) => (
                    <div
                      key={i}
                      data-reveal
                      className={`${styles.tile} ${styles.tilePlaceholder}`}
                      style={{ '--d': `${i * 70}ms`, aspectRatio: i % 3 === 0 ? '3 / 4' : '4 / 3' } as React.CSSProperties}
                      aria-hidden="true"
                    >
                      <span className={styles.placeholderCrest}>
                        <Image src="/new Logo mfm.png" alt="" fill sizes="120px" style={{ objectFit: 'contain' }} />
                      </span>
                      {i === 0 && <span className={styles.placeholderText}>Photos coming soon</span>}
                    </div>
                  ))}
            </div>
              {remaining > 0 && (
                <div className={styles.moreWrap}>
                  <button
                    type="button"
                    className={styles.moreBtn}
                    onClick={() => setVisible((prev) => ({ ...prev, [event.slug]: limit + PAGE_SIZE }))}
                  >
                    Show {Math.min(remaining, PAGE_SIZE)} more photos
                    <span className={styles.moreMeta}>{shownPhotos.length} of {filtered.length}</span>
                  </button>
                </div>
              )}
            </div>
              )
            })()}

            {eventIdx < events.length - 1 && <div className={styles.albumDivider} aria-hidden="true" />}
          </section>
        ))}

        {/* ── Photo Submission CTA ── */}
        <div className={styles.cta} data-reveal>
          <div className={styles.ctaInner}>
            <h3 className={styles.ctaTitle}>Were You There?</h3>
            <p className={styles.ctaText}>
              Have photos from the crusade or the church dedication? We&apos;d love to feature them here.
              Send us your captured moments of God&apos;s work in our community.
            </p>
            <Link href="/contact" className="btn-gold">Share Your Photos</Link>
          </div>
        </div>
      </main>

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>

      {/* ── Lightbox ── */}
      {current && lightbox && (
        <div
          className={styles.lightbox}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.event.title}
        >
          <button className={styles.lightboxClose} onClick={close} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {slides.length > 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous photo"
            >
              <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                <path d="M14 2L3 13L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
            <div
              key={lightbox.index}
              className={`${styles.lightboxImageWrap} ${lightbox.dir === 1 ? styles.enterRight : styles.enterLeft}`}
            >
              <Image
                src={current.src}
                alt={current.caption ?? current.event.title}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className={styles.lightboxCaption} key={`cap-${lightbox.index}`}>
              <span className={styles.lightboxCategory}>{current.event.label} · {current.event.date}</span>
              {current.caption && <p className={styles.lightboxDesc}>{current.caption}</p>}
              {slides.length > 1 && (
                <span className={styles.lightboxCounter}>{lightbox.index + 1} / {slides.length}</span>
              )}
            </div>

            {slides.length > 1 && (
              <div className={styles.thumbs}>
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    className={`${styles.thumb} ${i === lightbox.index ? styles.thumbActive : ''}`}
                    onClick={() => setLightbox({ index: i, dir: i > lightbox.index ? 1 : -1 })}
                    aria-label={`Go to photo ${i + 1}`}
                  >
                    <Image src={s.src} alt="" fill sizes="64px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {slides.length > 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next photo"
            >
              <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                <path d="M2 2L13 13L2 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
