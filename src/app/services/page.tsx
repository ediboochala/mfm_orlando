import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, THEMED_SUNDAYS, ONLINE_PROGRAMS } from '@/data/siteData'
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

      <main className={styles.main}>
        <div className={styles.mainInner}>

          {/* ── Online Programs ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Streamed Live</span>
              <h2 className={styles.sectionTitle}>Online <span className="title-accent">Programs</span></h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                Can&apos;t make it in person? Join our online-only prayer program, streamed live wherever you are.
              </p>
            </div>

            {ONLINE_PROGRAMS.map((prog, i) => (
              <div key={i} className={styles.onlineCard}>
                <div className={styles.onlineInfo}>
                  <p className={styles.onlineName}>{prog.name}</p>
                  <p className={styles.onlineDesc}>{prog.description}</p>
                </div>
                <div className={styles.onlineMeta}>
                  <span className={styles.onlinePlatform}>{prog.platform}</span>
                  <span className={styles.onlineDays}>{prog.days}</span>
                  <span className={styles.onlineTime}>{prog.time}</span>
                  {prog.watchHref && (
                    <a
                      href={prog.watchHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-primary ${styles.onlineWatchBtn}`}
                    >
                      Watch on Facebook
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* ── Themed Sundays ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Every Month</span>
              <h2 className={styles.sectionTitle}>Themed <span className="title-accent">Sundays</span></h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                Each Sunday of the month carries its own focus — here&apos;s what to expect.
              </p>
            </div>

            <div className={styles.themedGrid}>
              {THEMED_SUNDAYS.map((t, i) => (
                <div key={i} className={styles.themedCard}>
                  <span className={styles.themedWeek}>{t.week}</span>
                  <p className={styles.themedTheme}>{t.theme}</p>
                  {t.note && <span className={styles.themedNote}>{t.note}</span>}
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

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
