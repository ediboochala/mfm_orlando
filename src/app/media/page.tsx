import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, YOUTUBE_CHANNELS, LIVE_SCHEDULE, PRAYER_LINE } from '@/data/siteData'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Media & Live — ${CHURCH.shortName}`,
  description:
    'Watch MFM Orlando live services, access the MFM YouTube channels, and find the daily prayer line schedule.',
}

export default function MediaPage() {
  return (
    <div className={styles.page}>

      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Media &amp; Live</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Watch. Listen. Pray.</span>
          <h1 className={styles.heroTitle}>Media &amp; Live Services</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Access live streams, recorded services, and the MFM daily prayer line —<br />
            wherever you are in the world.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainInner}>

          {/* ── Live Schedule ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Broadcast Schedule</span>
              <h2 className={styles.sectionTitle}>Live Service Schedule</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                The following services are streamed live. Join us online or in person.
              </p>
            </div>

            <div className={styles.scheduleTable}>
              <div className={styles.scheduleHead}>
                <span>Day</span>
                <span>Service</span>
                <span>Time (ET)</span>
                <span>Streamed</span>
              </div>
              {LIVE_SCHEDULE.map((row, i) => (
                <div key={i} className={styles.scheduleRow}>
                  <span className={styles.scheduleDay}>{row.day}</span>
                  <span className={styles.scheduleService}>{row.service}</span>
                  <span className={styles.scheduleTime}>{row.time}</span>
                  <span className={`${styles.scheduleStreamed} ${row.streamed ? styles.streamedYes : styles.streamedNo}`}>
                    {row.streamed ? 'Live' : 'In-Person'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── YouTube Channels ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>YouTube</span>
              <h2 className={styles.sectionTitle}>Watch on YouTube</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                Subscribe to our YouTube channels to watch live services and access a library of
                teachings, prayer sessions, and messages from Dr. D.K. Olukoya.
              </p>
            </div>

            <div className={styles.channelsGrid}>
              {YOUTUBE_CHANNELS.map((ch) => (
                <a
                  key={ch.handle}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.channelCard} ${ch.featured ? styles.channelFeatured : ''}`}
                >
                  {ch.featured && <span className={styles.featuredBadge}>Official HQ</span>}
                  <div className={styles.channelIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div className={styles.channelInfo}>
                    <h3 className={styles.channelName}>{ch.name}</h3>
                    <span className={styles.channelHandle}>{ch.handle}</span>
                    <p className={styles.channelDesc}>{ch.description}</p>
                  </div>
                  <span className={styles.channelArrow}>→</span>
                </a>
              ))}
            </div>
          </section>

          {/* ── Prayer Line ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Daily Prayer</span>
              <h2 className={styles.sectionTitle}>MFM Daily Prayer Line</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                Anchored by Dr. D.K. Olukoya and anointed pastors, the MFM prayer line runs twice
                daily — morning and midnight — connecting believers worldwide in aggressive prayer.
              </p>
            </div>

            <div className={styles.prayerGrid}>
              {/* Sessions */}
              <div className={styles.prayerSessions}>
                <div className={styles.sessionCard}>
                  <span className={styles.sessionIcon}>🌅</span>
                  <div>
                    <span className={styles.sessionLabel}>Morning Session</span>
                    <span className={styles.sessionTime}>{PRAYER_LINE.morningSession}</span>
                  </div>
                </div>
                <div className={styles.sessionCard}>
                  <span className={styles.sessionIcon}>🌙</span>
                  <div>
                    <span className={styles.sessionLabel}>Evening / Midnight Session</span>
                    <span className={styles.sessionTime}>{PRAYER_LINE.eveningSession}</span>
                  </div>
                </div>
                <div className={styles.anchorCard}>
                  <span className={styles.anchorLabel}>Anchored by</span>
                  <span className={styles.anchorValue}>{PRAYER_LINE.anchor}</span>
                </div>
              </div>

              {/* Numbers */}
              <div className={styles.prayerNumbers}>
                <span className={styles.numbersLabel}>Dial-In Numbers</span>
                {PRAYER_LINE.numbers.map((n, i) => (
                  <div key={i} className={styles.numberRow}>
                    <span className={styles.numberTag}>{n.label}</span>
                    <a href={`tel:${n.number.replace(/\D/g, '')}`} className={styles.numberVal}>
                      {n.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer City */}
            <div className={styles.prayerCityCard}>
              <div className={styles.prayerCityLeft}>
                <span className={styles.prayerCityLabel}>Prayer City</span>
                <h3 className={styles.prayerCityName}>{PRAYER_LINE.prayerCity.name}</h3>
                <p className={styles.prayerCitySchedule}>{PRAYER_LINE.prayerCity.schedule}</p>
              </div>
              <div className={styles.prayerCityRight}>
                <span className={styles.prayerCityAddrLabel}>Address</span>
                <span className={styles.prayerCityAddr}>{PRAYER_LINE.prayerCity.address}</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>
    </div>
  )
}
