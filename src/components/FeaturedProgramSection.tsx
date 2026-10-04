'use client'

import Image from 'next/image'
import { FEATURED_PROGRAM } from '@/data/siteData'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './FeaturedProgramSection.module.css'

export default function FeaturedProgramSection() {
  useScrollReveal()
  const p = FEATURED_PROGRAM
  return (
    <section id="bring-your-problems-to-god" className={styles.section}>
      <div className="section-inner">
        <div className={styles.grid}>
          {/* Flyer */}
          <div className={`${styles.imgWrap} reveal-left`}>
            <a
              href={p.eventbriteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imgFrame}
              aria-label={`RSVP for ${p.title} on Eventbrite`}
            >
              <div className={`${styles.imgPlaceholder} ${styles.hasImage}`}>
                <Image
                  src={p.image}
                  alt={`${p.title} flyer — ${p.schedule} at ${p.time}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  style={{ objectFit: 'contain' }}
                />
                <div className={styles.imgHoverHint}>
                  <span>RSVP on Eventbrite</span>
                </div>
              </div>
              <div className={styles.dateTag}>
                <span className={styles.dateTagDay}>{p.schedule}</span>
                <span className={styles.dateTagTime}>{p.time}</span>
              </div>
            </a>
          </div>

          {/* Details */}
          <div className="reveal-right">
            <span className="section-label">New Weekly Program</span>
            <h2 className={`${styles.title} section-title`}>{p.title}</h2>
            <p className={styles.presentedBy}>{p.presentedBy}</p>
            <div className="section-divider" />

            <p className={styles.description}>{p.description}</p>

            <blockquote className={styles.scripture}>
              <p>&ldquo;{p.scripture.text}&rdquo;</p>
              <cite>{p.scripture.reference}</cite>
            </blockquote>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>When</span>
                <span className={styles.detailValue}>{p.schedule}</span>
                <span className={styles.detailSub}>{p.time}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Where</span>
                <span className={styles.detailValue}>{p.venue}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Registration</span>
                <span className={styles.detailValue}>Reserve your spot</span>
                <span className={styles.detailSub}>via Eventbrite</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Follow</span>
                <a
                  href={p.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailValue}
                >
                  {p.instagram.handle}
                </a>
                <span className={styles.detailSub}>on Instagram</span>
              </div>
            </div>

            <div className={styles.actions}>
              <a
                href={p.eventbriteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                RSVP on Eventbrite
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.venue)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo watermark */}
      <div className={styles.logoWatermark} aria-hidden="true">
        <Image src="/new Logo mfm.png" alt="" fill style={{ objectFit: 'contain' }} />
      </div>
    </section>
  )
}
