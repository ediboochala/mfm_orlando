import Image from 'next/image'
import Link from 'next/link'
import { CRUSADE } from '@/data/siteData'
import styles from './CrusadeSection.module.css'

export default function CrusadeSection() {
  return (
    <section id="crusade" className={styles.section}>
      <div className="section-inner">
        <div className={styles.grid}>
          {/* Image / Flyer */}
          <div className={`${styles.imgWrap} reveal-left`}>
            <Link
              href="/crusade"
              className={styles.imgFrame}
              aria-label={`View full details for ${CRUSADE.title}`}
            >
              <div className={`${styles.imgPlaceholder} ${CRUSADE.image ? styles.hasImage : ''}`}>
                {CRUSADE.image ? (
                  <>
                    <Image
                      src={CRUSADE.image}
                      alt={CRUSADE.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                    <div className={styles.imgHoverHint}>
                      <span>View Full Details</span>
                    </div>
                  </>
                ) : (
                  <>
                    <svg className={styles.flameIcon} width="44" height="60" viewBox="0 0 26 38" fill="none">
                      <path
                        d="M13 2C13 2 20 9 18 18C22 14 24 8 22 4C26 10 27 18 23 25C20 30 16 33 13 38C10 33 6 30 3 25C-1 18 0 10 4 4C2 8 4 14 8 18C6 9 13 2 13 2Z"
                        fill="url(#crusadeFlame)"
                      />
                      <defs>
                        <linearGradient id="crusadeFlame" x1="13" y1="2" x2="13" y2="38" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFF9C4" />
                          <stop offset="50%" stopColor="#FF7A1A" />
                          <stop offset="100%" stopColor="#A8125A" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className={styles.placeholderLabel}>Crusade Flyer</span>
                    <span className={styles.placeholderHint}>Coming Soon</span>
                  </>
                )}
              </div>
              <div className={styles.dateTag}>
                <span className={styles.dateTagDay}>{CRUSADE.date}</span>
                <span className={styles.dateTagTime}>{CRUSADE.time}</span>
              </div>
            </Link>
          </div>

          {/* Details */}
          <div className="reveal-right">
            <span className="section-label">Upcoming Crusade</span>
            <h2 className={`${styles.title} section-title`}>{CRUSADE.title}</h2>
            <p className={styles.presentedBy}>{CRUSADE.presentedBy}</p>
            <div className="section-divider" />

            <p className={styles.motto}>{CRUSADE.motto}</p>
            <p className={styles.description}>{CRUSADE.description}</p>
            <p className={styles.hashtag}>{CRUSADE.hashtag}</p>

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
                <span className={styles.detailLabel}>Venue</span>
                <span className={styles.detailValue}>{CRUSADE.venue}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Host</span>
                {CRUSADE.hosts.map((host) => (
                  <span key={host.name} className={styles.detailValue}>
                    {host.name} <span className={styles.detailSub}>— {host.title}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
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
              <Link href="/crusade" className="btn-secondary">
                More Information
              </Link>
              <span className={styles.rsvpNumbers}>
                {CRUSADE.rsvpNumbers.join('  ·  ')}
              </span>
            </div>

            <div className={styles.jingleBtns}>
              {CRUSADE.jingle.stations.map((station) => (
                <a
                  key={station.url}
                  href={station.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.jingleBtn}
                >
                  <span className={styles.jingleIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  {CRUSADE.jingle.label}
                  <span className={styles.jingleLogo}>
                    <Image src={station.logo} alt={station.platform} width={72} height={37} style={{ objectFit: 'contain' }} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logo watermark */}
      <div className={styles.logoWatermark} aria-hidden="true">
        <Image src="/new Logo mfm.png" alt="" fill style={{ objectFit: 'contain' }} />
      </div>
    </section>
  )
}
