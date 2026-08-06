'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CHURCH, GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = active === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === active)

  // Only photos that actually have an image can be viewed in the lightbox
  const viewable = filtered.filter((item) => item.image)

  const closeLightbox = () => setLightboxIndex(null)
  const showPrev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + viewable.length) % viewable.length))
  const showNext = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % viewable.length))

  // Keyboard navigation + body scroll lock while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, viewable.length])

  const current = lightboxIndex !== null ? viewable[lightboxIndex] : null

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
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>His Works Among Us</span>
          <h1 className={styles.heroTitle}>Photo Gallery</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Glimpses of worship, prayer, deliverance, and fellowship at MFM Tampa Florida —
            moments where the power of God was on full display.
          </p>
        </div>
      </header>

      {/* ── Filter Tabs ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${active === cat ? styles.filterActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Gallery Grid ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.grid}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`${styles.card} ${item.image ? styles.cardClickable : ''}`}
                onClick={() => {
                  if (!item.image) return
                  const idx = viewable.findIndex((v) => v.id === item.id)
                  if (idx !== -1) setLightboxIndex(idx)
                }}
                role={item.image ? 'button' : undefined}
                tabIndex={item.image ? 0 : undefined}
                onKeyDown={(e) => {
                  if (!item.image) return
                  if (e.key === 'Enter' || e.key === ' ') {
                    const idx = viewable.findIndex((v) => v.id === item.id)
                    if (idx !== -1) setLightboxIndex(idx)
                  }
                }}
              >
                <div className={styles.cardImage}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={styles.cardImg}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <svg width="40" height="54" viewBox="0 0 40 56" fill="none">
                        <path
                          d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
                          fill={`url(#gf-${item.id})`}
                        />
                        <defs>
                          <linearGradient id={`gf-${item.id}`} x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
                            <stop offset="0%"  stopColor="#FFF9C4" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#E0217A" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#A8125A" stopOpacity="0.35" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className={styles.placeholderText}>Photo Coming Soon</span>
                    </div>
                  )}
                  <div className={styles.cardOverlay}>
                    <span className={styles.overlayCategory}>{item.category}</span>
                    <p className={styles.overlayDesc}>{item.description}</p>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.cardCategory}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Photo Submission CTA ── */}
          <div className={styles.cta}>
            <div className={styles.ctaInner}>
              <h3 className={styles.ctaTitle}>Share Your Moments</h3>
              <p className={styles.ctaText}>
                Have photos from an MFM Tampa Florida service or event? We&apos;d love to feature them here.
                Contact us to share your captured moments of God&apos;s work in our community.
              </p>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>

      {/* ── Lightbox ── */}
      {current && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {viewable.length > 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
              onClick={(e) => { e.stopPropagation(); showPrev() }}
              aria-label="Previous photo"
            >
              <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                <path d="M14 2L3 13L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={current.image!}
                alt={current.title}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className={styles.lightboxCaption}>
              <span className={styles.lightboxCategory}>{current.category}</span>
              <h3 className={styles.lightboxTitle}>{current.title}</h3>
              <p className={styles.lightboxDesc}>{current.description}</p>
              {viewable.length > 1 && (
                <span className={styles.lightboxCounter}>
                  {lightboxIndex! + 1} / {viewable.length}
                </span>
              )}
            </div>
          </div>

          {viewable.length > 1 && (
            <button
              className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
              onClick={(e) => { e.stopPropagation(); showNext() }}
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
