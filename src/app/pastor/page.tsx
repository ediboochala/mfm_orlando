import type { Metadata } from 'next'
import Link from 'next/link'
import { PASTOR, CHURCH } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Pastor Kehinde Olajide — ${CHURCH.shortName}`,
  description: 'A personal greeting and pastoral message from Pastor Kehinde Olajide, Host Pastor of Mountain of Fire and Miracles Ministries Tampa, Florida.',
}

const SCRIPTURES = [
  { verse: '"Seek the Lord while he may be found, call upon him while he is near."', ref: 'Isaiah 55:6' },
  { verse: '"Jesus came to set the captives free — and He had you in mind."', ref: 'Luke 4:18' },
  { verse: '"This is the day that the Lord hath made; we will rejoice and be glad in it."', ref: 'Psalm 118:24' },
]

export default function PastorPage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Pastoral Message</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <div className={styles.heroAccent}>
            <div className={styles.flameWrap}>
              <svg width="56" height="76" viewBox="0 0 40 56" fill="none">
                <path
                  d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
                  fill="url(#heroFlame)"
                />
                <defs>
                  <linearGradient id="heroFlame" x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#FFF9C4" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#E0217A" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#A8125A" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <span className={styles.heroLabel}>A Word from Our Pastor</span>
          <h1 className={styles.heroTitle}>
            Greetings in the<br />Name of Jesus
          </h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            A personal letter from Pastor Kehinde Olajide,<br />
            Host Pastor — Mountain of Fire and Miracles Ministries Tampa, Florida
          </p>
        </div>

        {/* Decorative border bottom */}
        <div className={styles.heroBorder} />
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <div className={styles.letterWrap}>

            {/* Pastor Card */}
            <aside className={styles.sidebar}>
              <div className={styles.pastorCard}>
                <div className={styles.cardPlaceholder}>
                  <svg className={styles.cardFlameIcon} width="40" height="56" viewBox="0 0 26 38" fill="none">
                    <path
                      d="M13 2C13 2 20 9 18 18C22 14 24 8 22 4C26 10 27 18 23 25C20 30 16 33 13 38C10 33 6 30 3 25C-1 18 0 10 4 4C2 8 4 14 8 18C6 9 13 2 13 2Z"
                      fill="url(#cardFlame)"
                    />
                    <defs>
                      <linearGradient id="cardFlame" x1="13" y1="2" x2="13" y2="38" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFF9C4" />
                        <stop offset="50%" stopColor="#FF7A1A" />
                        <stop offset="100%" stopColor="#A8125A" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className={styles.cardName}>{PASTOR.name}</span>
                  <span className={styles.cardHint}>Photo Coming Soon</span>
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{PASTOR.name}</h3>
                  <p className={styles.cardRole}>{PASTOR.title}</p>
                  <div className={styles.cardDivider} />
                  <div className={styles.cardDetails}>
                    <div className={styles.cardDetail}>
                      <span className={styles.detailLabel}>Direct Line</span>
                      <span className={styles.detailValue}>{PASTOR.cell}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.detailLabel}>Ministry</span>
                      <span className={styles.detailValue}>{CHURCH.name}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.detailLabel}>Location</span>
                      <span className={styles.detailValue}>{CHURCH.address}</span>
                    </div>
                    <div className={styles.cardDetail}>
                      <span className={styles.detailLabel}>Services</span>
                      <span className={styles.detailValue}>{PASTOR.services}</span>
                    </div>
                  </div>
                  <Link href="/#contact" className={styles.contactBtn}>
                    Contact Pastor
                  </Link>
                </div>
              </div>

              {/* Scripture Sidebar */}
              <div className={styles.scriptureBox}>
                <span className={styles.scriptureBoxLabel}>Scripture</span>
                {SCRIPTURES.map((s, i) => (
                  <div key={i} className={styles.scriptureItem}>
                    <p className={styles.scriptureVerse}>{s.verse}</p>
                    <span className={styles.scriptureRef}>{s.ref}</span>
                  </div>
                ))}
              </div>
            </aside>

            {/* Letter Body */}
            <article className={styles.letter}>
              <div className={styles.letterHeader}>
                <div className={styles.letterSeal}>
                  <span>MFM</span>
                </div>
                <div>
                  <p className={styles.letterFrom}>From the Desk of the Host Pastor</p>
                  <p className={styles.letterChurch}>{CHURCH.name}</p>
                  <p className={styles.letterLocation}>{CHURCH.location}</p>
                </div>
              </div>

              <div className={styles.letterDivider} />

              {PASTOR.paragraphs.map((para, i) => (
                <p key={i} className={`${styles.para} ${i === 0 ? styles.paraFirst : ''}`}>
                  {para}
                </p>
              ))}

              <div className={styles.signatureBlock}>
                <div className={styles.signatureLine} />
                <p className={styles.signatureText}>{PASTOR.signature}</p>
                <p className={styles.signatureName}>{PASTOR.signatureName}</p>
                <p className={styles.signatureTitle}>{PASTOR.title}</p>
                <p className={styles.signatureChurch}>{CHURCH.name}, {CHURCH.location}</p>
              </div>

              {/* Call to Action */}
              <div className={styles.cta}>
                <div className={styles.ctaInner}>
                  <h3 className={styles.ctaTitle}>You Are Welcome Here</h3>
                  <p className={styles.ctaText}>
                    Join us for worship, prayer, and fellowship. Whether you are seeking a spiritual home,
                    in need of deliverance, or simply want to encounter the living God — our doors are open to you.
                  </p>
                  <div className={styles.ctaActions}>
                    <a
                      href="/#services"
                      className="btn-primary"
                    >
                      View Service Times
                    </a>
                    <a
                      href="/#contact"
                      className="btn-secondary"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </article>

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
