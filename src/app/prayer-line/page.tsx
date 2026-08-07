import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, PRAYER_LINE, PASTOR } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `USA Prayer Line — ${CHURCH.shortName}`,
  description: `Dial in to the MFM USA Prayer Line, anchored by ${PRAYER_LINE.anchor}. Call in daily and receive a spiritual breakthrough.`,
}

export default function PrayerLinePage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Prayer Line</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Dial In</span>
          <h1 className={styles.heroTitle}>USA Prayer Line</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Anchored by {PRAYER_LINE.anchor}. Call in daily and receive a spiritual breakthrough.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <section className={styles.section}>
            <div className={styles.grid}>

              {/* Left — Numbers */}
              <div>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionLabel}>Call-In Numbers</span>
                  <h2 className={styles.sectionTitle}>Dial and <span className="title-accent">Pray</span></h2>
                  <div className={styles.sectionDivider} />
                </div>

                <ul className={styles.numbers}>
                  {PRAYER_LINE.numbers.map((n, i) => (
                    <li key={i} className={styles.numberItem}>
                      <span className={styles.dot} />
                      <span className={styles.numberLabel}>{n.label}:</span>
                      <strong>{n.number}</strong>
                    </li>
                  ))}
                </ul>

                <div className={styles.cityBox}>
                  <p className={styles.cityLabel}>{PRAYER_LINE.prayerCity.name}</p>
                  <p className={styles.cityText}>
                    {PRAYER_LINE.prayerCity.schedule}
                    <br />
                    {PRAYER_LINE.prayerCity.address}
                  </p>
                </div>
              </div>

              {/* Right — Time Card */}
              <div className={styles.timeCard}>
                <div className={styles.timeSession}>
                  <p className={styles.sessionLabel}>Morning Session</p>
                  <p className={styles.sessionTime}>6:00 — 7:00</p>
                  <p className={styles.sessionTz}>AM · Eastern Time</p>
                </div>
                <div className={styles.timeSession}>
                  <p className={styles.sessionLabel}>Evening Session</p>
                  <p className={styles.sessionTime}>11:00 PM — Midnight</p>
                  <p className={styles.sessionTz}>Eastern Time</p>
                </div>
                <p className={styles.localNote}>
                  Pastoral Counseling and Prayer also available directly with {PASTOR.name}.
                </p>
                <a href={`tel:${PASTOR.cell.replace(/[^0-9+]/g, '')}`} className={styles.localPhone}>
                  {PASTOR.cell}
                </a>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Need Someone to Pray With You?</h3>
            <p className={styles.ctaText}>
              No prayer request is too big or too small. Reach out to our prayer team directly,
              or join us in person for a service of aggressive, faith-filled prayer.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/services" className="btn-primary">View Service Times</Link>
              <Link href="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer Strip ── */}
      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>

    </div>
  )
}
