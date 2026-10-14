import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CHURCH, GLOBAL_PROGRAMS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Global Programs — ${CHURCH.shortName}`,
  description: `Join MFM branches worldwide for the ${GLOBAL_PROGRAMS.globalThanksgiving.name}.`,
  alternates: { canonical: '/global-programs' },
}

export default function GlobalProgramsPage() {
  const { globalThanksgiving } = GLOBAL_PROGRAMS

  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Global Programs', path: '/global-programs' }]} />

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

          <div className={`${styles.programCard} ${globalThanksgiving.image ? styles.programCardWithImage : ''}`}>
            <div className={styles.programContent}>
              <span className={styles.programLabel}>Global Program · This Sunday</span>
              <h2 className={styles.programName}>{globalThanksgiving.name}</h2>
              <p className={styles.programWhen}>{globalThanksgiving.when}</p>
              <div className={styles.programDivider} />
              <p className={styles.programDesc}>{globalThanksgiving.description}</p>

              {globalThanksgiving.link ? (
                <div className={styles.programLinkWrap}>
                  <a
                    href={globalThanksgiving.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Learn More and Join In
                  </a>
                </div>
              ) : (
                <div className={styles.programLinkWrap}>
                  <Link href="/services" className="btn-primary">
                    Plan Your Visit
                  </Link>
                </div>
              )}
            </div>
            {globalThanksgiving.image && (
              <div className={styles.programImageWrap}>
                <Image
                  src={globalThanksgiving.image}
                  alt={globalThanksgiving.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 320px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Come With a Grateful Heart</h3>
            <p className={styles.ctaText}>
              Whatever season you are in, there is a reason to thank God.
              Join us in person or online as we give Him praise together.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/services" className="btn-gold">View Service Times</Link>
              <Link href="/contact" className="btn-outline-white">Contact Us</Link>
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
