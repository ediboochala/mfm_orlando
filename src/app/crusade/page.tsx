import type { Metadata } from 'next'
import Link from 'next/link'
import { CRUSADE, CHURCH } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `${CRUSADE.title} — ${CHURCH.shortName}`,
  description: CRUSADE.description,
}

export default function CrusadePage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Crusade</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Upcoming Crusade</span>
          <h1 className={styles.heroTitle}>{CRUSADE.title}</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>{CRUSADE.presentedBy}</p>
          <p className={styles.heroMotto}>{CRUSADE.motto}</p>
          <div className={styles.heroMeta}>
            <span>{CRUSADE.date}</span>
            <span className={styles.heroMetaDot} />
            <span>{CRUSADE.time}</span>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          {/* About */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>About This Crusade</span>
              <h2 className={styles.sectionTitle}>{CRUSADE.motto}</h2>
              <div className={styles.sectionDivider} />
            </div>
            <div className={styles.proseCol}>
              {CRUSADE.detailedDescription.map((para, i) => (
                <p key={i} className={styles.bodyText}>{para}</p>
              ))}
              <p className={styles.hashtag}>{CRUSADE.hashtag}</p>
            </div>
          </section>

          {/* Event Details */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Event Details</span>
              <h2 className={styles.sectionTitle}>Join Us</h2>
              <div className={styles.sectionDivider} />
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ministering</span>
                <span className={styles.detailValue}>{CRUSADE.minister}</span>
                <span className={styles.detailSub}>{CRUSADE.ministerTitle}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date &amp; Time</span>
                <span className={styles.detailValue}>{CRUSADE.date}</span>
                <span className={styles.detailSub}>{CRUSADE.time}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Host</span>
                {CRUSADE.hosts.map((host) => (
                  <span key={host.name} className={styles.detailValue}>
                    {host.name} <span className={styles.detailSub}>— {host.title}</span>
                  </span>
                ))}
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>RSVP / Prayer Line</span>
                <span className={styles.detailValue}>{CRUSADE.rsvpNumbers.join('  ·  ')}</span>
              </div>
            </div>
          </section>

          {/* Venue */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Venue &amp; Directions</span>
              <h2 className={styles.sectionTitle}>{CRUSADE.venueDetails.name}</h2>
              <div className={styles.sectionDivider} />
            </div>
            <div className={styles.venueCard}>
              <div className={styles.venueAddress}>
                {CRUSADE.venueDetails.lines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CRUSADE.venueDetails.mapAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Get Directions
              </a>
            </div>
          </section>

          {/* Hotels */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Where to Stay</span>
              <h2 className={styles.sectionTitle}>Hotels Close to Yuengling Center</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                Traveling in for the crusade? Here are a few nearby hotel options near the venue.
              </p>
            </div>
            <div className={styles.hotelsGrid}>
              {CRUSADE.hotels.map((hotel) => (
                <a
                  key={hotel.name}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hotelCard}
                >
                  <span className={styles.hotelName}>{hotel.name}</span>
                  <span className={styles.hotelAddress}>{hotel.address}</span>
                  <span className={styles.hotelLink}>Get Directions →</span>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className={styles.cta}>
            <h3 className={styles.ctaTitle}>Expect. Receive. Testify.</h3>
            <p className={styles.ctaText}>
              This crusade is free and open to everyone. Reserve your spot today and come ready
              to encounter the power of God.
            </p>
            <div className={styles.ctaActions}>
              <a href={`tel:${CRUSADE.rsvpNumbers[0].replace(/[^0-9+]/g, '')}`} className="btn-primary">
                RSVP Now
              </a>
              <Link href="/#crusade" className="btn-secondary">
                Back to Overview
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* ── Footer Strip ── */}
      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>

    </div>
  )
}
