import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import MinistriesContent from './MinistriesContent'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Our Ministries — ${CHURCH.shortName}`,
  description:
    "Discover the ministries of MFM Tampa Florida — Men of Valor, Glorious Women, Children Church, Youth Church, Young Adults Church, Music Ministry, and GEN 2:18.",
}

export default function MinistriesPage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Our Ministries</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Serve &amp; Grow</span>
          <h1 className={styles.heroTitle}>Our Ministries</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            There is a place for every believer in the body of Christ.<br />
            Find your family, find your calling, find your people.
          </p>
        </div>
      </header>

      {/* ── Intro ── */}
      <div className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.introText}>
            MFM Tampa Florida is not just a Sunday church — it is a community of believers who serve together,
            grow together, and fight together. Each of our ministries exists because a specific group of
            people has a specific need and a specific calling, and God has provided a covering for each one.
            Whether you are a man looking for brotherhood, a woman seeking to walk in her full identity,
            a young person searching for purpose, or a couple expecting a child — there is a place here for you.
          </p>
        </div>
      </div>

      {/* ── Interactive ministries + lightbox ── */}
      <MinistriesContent />

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>
    </div>
  )
}
