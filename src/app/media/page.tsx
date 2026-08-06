import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, LIVE_SCHEDULE, PRAYER_LINE, SOCIAL_LINKS, SISTER_MINISTRIES } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import SocialIcon, { type SocialPlatform } from '@/components/SocialIcon'
import YoutubeChannelSection from './YoutubeChannelSection'
import styles from './page.module.css'

const BRAND_COLORS: Record<SocialPlatform, string> = {
  youtube: '#ff0000',
  facebook: '#1877f2',
  instagram: '#d6249f',
}

export const metadata: Metadata = {
  title: `Media and Live — ${CHURCH.shortName}`,
  description:
    'Watch MFM Tampa Florida live services, access the MFM YouTube channels, and find the daily prayer line schedule.',
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Media and Live</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Watch. Listen. Pray.</span>
          <h1 className={styles.heroTitle}>Media and Live Services</h1>
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

            <YoutubeChannelSection />
          </section>

          {/* ── Follow Us ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Stay Connected</span>
              <h2 className={styles.sectionTitle}>Follow MFM Tampa Florida</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                Follow us on social media for updates, sermon clips, and live service reminders.
              </p>
            </div>

            <div className={styles.channelsGrid}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelCard}
                >
                  <span className={styles.channelIcon} style={{ color: BRAND_COLORS[s.platform] }} aria-hidden>
                    <SocialIcon platform={s.platform} size={26} />
                  </span>
                  <div className={styles.channelInfo}>
                    <span className={styles.channelName}>{s.label}</span>
                  </div>
                  <span className={styles.channelArrow}>→</span>
                </a>
              ))}
            </div>
          </section>

          {/* ── Sister Ministries ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>MFM USA Network</span>
              <h2 className={styles.sectionTitle}>Sister Ministries and Platforms</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                MFM Tampa Florida is part of a wider family of MFM ministries across the United States.
                Explore the major MFM USA platforms below.
              </p>
            </div>

            <div className={styles.channelsGrid}>
              {SISTER_MINISTRIES.map((m) => (
                <a
                  key={m.href}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelCard}
                >
                  <div className={styles.channelInfo}>
                    <span className={styles.channelName}>{m.label}</span>
                    <span className={styles.channelHandle}>{m.href.replace('https://', '')}</span>
                    <p className={styles.channelDesc}>{m.description}</p>
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
