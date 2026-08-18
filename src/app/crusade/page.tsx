import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CRUSADE, CHURCH } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `${CRUSADE.title} — ${CHURCH.shortName}`,
  description: CRUSADE.description,
  alternates: { canonical: '/crusade' },
  openGraph: {
    title: `${CRUSADE.title} — ${CHURCH.shortName}`,
    description: CRUSADE.description,
    type: 'website',
    images: CRUSADE.image ? [{ url: CRUSADE.image }] : undefined,
  },
}

// Builds an ISO-8601 datetime string (with an explicit UTC offset) from
// CRUSADE.date ("Sunday, September 20, 2026") and CRUSADE.time ("4:00 PM
// Prompt") for the Event schema below. Built from date/time parts directly
// rather than Date#toISOString() so the result doesn't depend on the build
// server's local timezone (Vercel builds run in UTC). The offset is
// hardcoded to Eastern Daylight Time (-04:00), which covers the venue
// (Tampa, FL) for the crusade's Mar–Nov date; update if a future crusade
// date falls in EST instead.
function crusadeStartDateISO(): string {
  const parsed = new Date(CRUSADE.date)
  if (Number.isNaN(parsed.getTime())) return CRUSADE.date

  const y  = parsed.getFullYear()
  const mo = String(parsed.getMonth() + 1).padStart(2, '0')
  const d  = String(parsed.getDate()).padStart(2, '0')

  const timeMatch = CRUSADE.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!timeMatch) return `${y}-${mo}-${d}`

  let hours = parseInt(timeMatch[1], 10)
  const minutes = timeMatch[2]
  const meridiem = timeMatch[3].toUpperCase()
  if (meridiem === 'PM' && hours !== 12) hours += 12
  if (meridiem === 'AM' && hours === 12) hours = 0

  return `${y}-${mo}-${d}T${String(hours).padStart(2, '0')}:${minutes}:00-04:00`
}

const crusadeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: CRUSADE.title,
  description: CRUSADE.description,
  startDate: crusadeStartDateISO(),
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: CRUSADE.venueDetails.name,
    address: CRUSADE.venueDetails.mapAddress,
  },
  image: CRUSADE.image ? [encodeURI(`${CHURCH.website}${CRUSADE.image}`)] : undefined,
  organizer: {
    '@type': 'Organization',
    name: CHURCH.name,
    url: CHURCH.website,
  },
  performer: {
    '@type': 'Person',
    name: CRUSADE.minister,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: 'https://www.eventbrite.com/e/the-great-florida-deliverance-crusade-tickets-1996817130791?aff=oddtdtcreator',
  },
}

export default function CrusadePage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crusadeJsonLd) }}
      />

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
          <div className={styles.heroActions}>
            <a
              href="https://www.eventbrite.com/e/the-great-florida-deliverance-crusade-tickets-1996817130791?aff=oddtdtcreator"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Reserve a Spot
            </a>
            <a
              href={CRUSADE.jingle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              ♫ Crusade Radio Announcements
            </a>
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
              <h2 className={styles.sectionTitle}>Join <span className="title-accent">Us</span></h2>
              <div className={styles.sectionDivider} />
            </div>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ministering</span>
                <span className={styles.detailValue}>{CRUSADE.minister}</span>
                <span className={styles.detailSub}>{CRUSADE.ministerTitle}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date and Time</span>
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

          {/* Jingle */}
          <section className={styles.section}>
            <div className={styles.jingleCard}>
              <div className={styles.jingleCardInfo}>
                <span className={styles.sectionLabel}>On the Radio</span>
                <h3 className={styles.jingleCardTitle}>Hear the Official Crusade Jingle</h3>
                <p className={styles.jingleCardText}>
                  Streaming now on {CRUSADE.jingle.platform} — tap play and get the sound of
                  the crusade stuck in your spirit before the big day.
                </p>
                <a
                  href={CRUSADE.jingle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  ♫ {CRUSADE.jingle.label}
                </a>
              </div>
              <div className={styles.jingleCardLogo}>
                <Image src={CRUSADE.jingle.logo} alt={CRUSADE.jingle.platform} width={140} height={72} style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </section>

          {/* Venue */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Venue and Directions</span>
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
              <h2 className={styles.sectionTitle}>Hotels Close to <span className="title-accent">Yuengling Center</span></h2>
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
              <a
                href="https://www.eventbrite.com/e/the-great-florida-deliverance-crusade-tickets-1996817130791?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Reserve a Spot
              </a>
              <a href={`tel:${CRUSADE.rsvpNumbers[0].replace(/[^0-9+]/g, '')}`} className="btn-secondary">
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
