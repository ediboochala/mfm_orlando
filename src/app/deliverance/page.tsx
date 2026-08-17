import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, PASTOR, DELIVERANCE } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Need Deliverance? — ${CHURCH.shortName}`,
  description: 'Request deliverance prayer from MFM Tampa Florida. Fill out our deliverance signup form and a minister will follow up with you.',
  alternates: { canonical: '/deliverance' },
}

export default function DeliverancePage() {
  // Google Forms "viewform" links embed cleanly with `embedded=true` appended.
  const embedUrl = DELIVERANCE.formUrl
    ? DELIVERANCE.formUrl.includes('embedded=true')
      ? DELIVERANCE.formUrl
      : `${DELIVERANCE.formUrl}${DELIVERANCE.formUrl.includes('?') ? '&' : '?'}embedded=true`
    : ''

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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Deliverance</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Set the Captives Free</span>
          <h1 className={styles.heroTitle}>Need Deliverance?</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Jesus came to set the captives free — and He has you in mind. Reach out and let us
            stand with you in prayer.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Deliverance Signup</span>
              <h2 className={styles.sectionScripture}>
                &ldquo;But on Mount Zion there shall be deliverance… and the house of Jacob shall possess their possessions.&rdquo;
                <span className={styles.sectionScriptureRef}>— Obadiah 1:17</span>
              </h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>{DELIVERANCE.intro}</p>
            </div>

            {embedUrl ? (
              <div className={styles.formWrap}>
                <iframe
                  src={embedUrl}
                  className={styles.formFrame}
                  title="Deliverance Signup Form"
                >
                  Loading form…
                </iframe>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.placeholderIcon}>🕊️</span>
                <p className={styles.placeholderTitle}>Signup Form Coming Online Soon</p>
                <p className={styles.placeholderText}>
                  Our deliverance signup form is being connected to this page. In the meantime,
                  call or message us directly and our prayer team will follow up with you.
                </p>
                <div className={styles.ctaActions}>
                  <a href={`tel:${PASTOR.cell.replace(/[^0-9+]/g, '')}`} className="btn-primary">
                    Call {PASTOR.cell}
                  </a>
                  <Link href="/contact" className="btn-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>You Do Not Have to Carry It Alone</h3>
            <p className={styles.ctaText}>
              Join us for a Friday Deliverance Service or reach out to our prayer team directly.
              There is nothing wrong with asking for help — that is wisdom, not weakness.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/services" className="btn-primary">View Service Times</Link>
              <Link href="/prayer-line" className="btn-secondary">USA Prayer Line</Link>
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
