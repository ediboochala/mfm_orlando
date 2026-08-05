import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, GLOBAL_PROGRAMS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Global Programs — ${CHURCH.shortName}`,
  description: `Join MFM branches worldwide for the ${GLOBAL_PROGRAMS.seventyDays.name}.`,
}

export default function GlobalProgramsPage() {
  const { seventyDays } = GLOBAL_PROGRAMS

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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Global Programs</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>One Ministry, One World</span>
          <h1 className={styles.heroTitle}>Global Programs</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Join believers from MFM branches all over the world in these global, unifying programs.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <div className={styles.programCard}>
            <span className={styles.programLabel}>Annual Global Program</span>
            <h2 className={styles.programName}>{seventyDays.name}</h2>
            <div className={styles.programDivider} />
            <p className={styles.programDesc}>{seventyDays.description}</p>

            {seventyDays.link ? (
              <div className={styles.programLinkWrap}>
                <a
                  href={seventyDays.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Learn More &amp; Join In
                </a>
              </div>
            ) : (
              <div className={styles.pendingNote}>
                The link for this year&apos;s {seventyDays.name} is being finalized and will be
                posted here soon. In the meantime, contact the church office for details.
              </div>
            )}
          </div>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Prayer Changes Everything</h3>
            <p className={styles.ctaText}>
              Whatever season you are in, prayer and fasting position you for a breakthrough.
              Join us in person or online as we press into God together.
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
