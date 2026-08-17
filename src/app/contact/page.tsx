import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, PASTOR, SOCIAL_LINKS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import SocialIcon from '@/components/SocialIcon'
import ContactForm from './ContactForm'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Contact Us — ${CHURCH.shortName}`,
  description: 'Get in touch with Mountain of Fire and Miracles Ministries Tampa, Florida — visit us, call us, or send a message.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Contact</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Get in Touch</span>
          <h1 className={styles.heroTitle}>Connect With Us</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            We would love to hear from you. Reach out with a question, a prayer request,
            or simply to say hello — our doors, and our lines, are always open.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <section className={styles.section}>
            <div className={styles.grid}>

              {/* ── Info column ── */}
              <div>
                {[
                  { icon: '📍', label: 'Physical Address', value: CHURCH.address },
                  { icon: '📞', label: 'Phone',            value: CHURCH.phone },
                  { icon: '✉️', label: 'Email',            value: CHURCH.email },
                  { icon: '👤', label: 'Host Pastor',      value: `${PASTOR.name}\n${PASTOR.services}`, gold: true },
                ].map((item) => (
                  <div key={item.label} className={styles.infoItem}>
                    <div className={styles.iconWrap}>{item.icon}</div>
                    <div>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <span className={`${styles.infoValue} ${item.gold ? styles.infoValueMulti : ''}`}>
                        {item.value.split('\n').map((line, i) => (
                          <span key={i} className={i === 1 && item.gold ? styles.infoValueGold : undefined}>
                            {line}{i < item.value.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}

                <div className={styles.socials}>
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                    >
                      <SocialIcon platform={s.platform} size={17} />
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Form column ── */}
              <div>
                <ContactForm />
              </div>
            </div>

            {/* ── Location Map ── */}
            <div className={styles.mapWrap}>
              <div className={styles.mapHeader}>
                <div className={styles.mapInfo}>
                  <span className={styles.mapPin}>📍</span>
                  <div>
                    <span className={styles.mapLabel}>Our Location</span>
                    <span className={styles.mapAddress}>{CHURCH.address}</span>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=4618+North+Florida+Avenue,+Tampa,+FL+33603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapDirections}
                >
                  Get Directions
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <div className={styles.mapFrame}>
                <iframe
                  src="https://maps.google.com/maps?q=4618+North+Florida+Avenue,+Tampa,+FL+33603&hl=en&z=15&output=embed"
                  width="100%"
                  height="100%"
                  className={styles.mapIframe}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MFM Tampa Florida location map"
                />
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Come Worship With Us</h3>
            <p className={styles.ctaText}>
              Whether you write, call, or walk through our doors — we are here for you.
              Join us for a service and experience the family of MFM Tampa Florida.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/services" className="btn-primary">View Service Times</Link>
              <Link href="/#giving" className="btn-secondary">Give Online</Link>
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
