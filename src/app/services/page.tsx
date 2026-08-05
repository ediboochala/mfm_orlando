import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import ServicesSection from '@/components/ServicesSection'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Weekly Services — ${CHURCH.shortName}`,
  description: 'Join MFM Tampa Florida for worship, deliverance, and prayer throughout the week — see our full weekly service schedule.',
}

export default function ServicesPage() {
  return (
    <div className={styles.page}>

      {/* ── Back Nav ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Services</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Worship With Us</span>
          <h1 className={styles.heroTitle}>Weekly Services</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Join us throughout the week for powerful times of worship, deliverance,
            and the uncompromising Word of God.
          </p>
        </div>
      </header>

      {/* ── Services Grid ── */}
      <ServicesSection />

      {/* ── CTA ── */}
      <div className={styles.ctaWrap}>
        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>Plan Your Visit</h3>
          <p className={styles.ctaText}>
            We would love to have you join us. Whether it&apos;s your first time or you&apos;re
            already part of the family, there&apos;s a seat waiting for you.
          </p>
          <div className={styles.ctaActions}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CHURCH.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Directions
            </a>
            <Link href="/#giving" className="btn-secondary">
              Give Online
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer Strip ── */}
      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>

    </div>
  )
}
