import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CHURCH, GLOBAL_PROGRAMS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Global Programs — ${CHURCH.shortName}`,
  description: `Join MFM branches worldwide for ${GLOBAL_PROGRAMS.map(p => p.name).join(' and the ')}.`,
  alternates: { canonical: '/global-programs' },
}

export default function GlobalProgramsPage() {
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

          {GLOBAL_PROGRAMS.map(program => {
            const hasVisual = program.image || program.status === 'coming-soon'
            return (
              <div
                key={program.id}
                className={`${styles.programCard} ${hasVisual ? styles.programCardWithImage : ''}`}
              >
                <div className={styles.programContent}>
                  <span className={styles.programLabel}>{program.label}</span>
                  <h2 className={styles.programName}>{program.name}</h2>
                  <p className={styles.programWhen}>{program.when}</p>
                  <div className={styles.programDivider} />
                  <p className={styles.programDesc}>{program.description}</p>

                  {program.link ? (
                    <div className={styles.programLinkWrap}>
                      <a
                        href={program.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Learn More and Join In
                      </a>
                    </div>
                  ) : program.status === 'ongoing' ? (
                    <div className={styles.programLinkWrap}>
                      <Link href="/services" className="btn-primary">
                        Plan Your Visit
                      </Link>
                    </div>
                  ) : null}
                </div>
                {program.image ? (
                  <div className={styles.programImageWrap}>
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      sizes="(max-width: 700px) 100vw, 320px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : program.status === 'coming-soon' && (
                  <div className={styles.comingSoon} aria-label={`${program.name} — coming soon`}>
                    <span className={styles.comingSoonKicker}>Starts</span>
                    <span className={styles.comingSoonDate}>{program.startDate}</span>
                    <span className={styles.comingSoonRule} />
                    <span className={styles.comingSoonTitle}>Coming<br />Soon</span>
                  </div>
                )}
              </div>
            )
          })}

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Pray With Us</h3>
            <p className={styles.ctaText}>
              Whatever season you are in, there is power in praying together.
              Join us in person or online as we seek God&apos;s face as one family.
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
