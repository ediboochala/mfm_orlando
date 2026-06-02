import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ChurchCarousel from '@/components/ChurchCarousel'
import {
  CHURCH,
  GENERAL_OVERSEER,
  MISSION_GOALS,
  HISTORY_TIMELINE,
  STATS,
} from '@/data/siteData'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `About Us — ${CHURCH.shortName}`,
  description:
    'Learn about Mountain of Fire and Miracles Ministries Orlando — our history, our General Overseer Dr. D.K. Olukoya, our mission, and our vision.',
}

export default function AboutPage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · About Us</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Who We Are</span>
          <h1 className={styles.heroTitle}>About MFM Orlando</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            {CHURCH.name} — {CHURCH.tagline}.<br />
            A ministry of fire, miracles, and the uncompromising gospel of Jesus Christ.
          </p>
        </div>
      </header>

      {/* ── Stats Strip ── */}
      <div className={styles.statsStrip}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statNum}>{s.num}{s.suffix}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <main className={styles.main}>
        <div className={styles.mainInner}>

          {/* ── Section: Church Overview ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Our Identity</span>
              <h2 className={styles.sectionTitle}>The Citadel of Solution</h2>
              <div className={styles.sectionDivider} />
            </div>
            <div className={styles.twoCol}>
              <p className={styles.bodyText}>
                Mountain of Fire and Miracles Ministries (MFM) is a full-gospel, Pentecostal Christian ministry built on the foundation of aggressive prayer, biblical holiness, and the power of God to deliver, heal, and restore. Founded in Lagos, Nigeria in 1989 by Dr. Daniel Kolawole Olukoya, MFM has grown into one of the fastest-growing Christian ministries in the world, with branches in over 140 nations.
              </p>
              <p className={styles.bodyText}>
                MFM Orlando — The Citadel of Solution — is the Orlando, Florida chapter of this global movement. Under the leadership of Pastor Samuel Omoigberae, we carry the same mandate: to preach the undiluted gospel of Jesus Christ, to pray aggressively, to deliver the captives, and to build an end-time army that is ready for the glorious return of our Lord.
              </p>
            </div>
            <div className={styles.contactStrip}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Address</span>
                <span className={styles.contactValue}>{CHURCH.address}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>{CHURCH.phone}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{CHURCH.email}</span>
              </div>
            </div>

            {/* ── Church & Members Carousel ── */}
            <ChurchCarousel />

          </section>

          {/* ── Section: General Overseer ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Leadership</span>
              <h2 className={styles.sectionTitle}>General Overseer &amp; Founder</h2>
              <div className={styles.sectionDivider} />
            </div>

            <div className={styles.goCard}>
              <div className={styles.goImageWrap}>
                <div className={styles.goImagePlaceholder}>
                  <Image
                    src="/g.o-hmpg-p2yv8mmnlqigraumc5fkktysc1o1hu6a214voa7okq.jpg"
                    alt="Dr. Daniel Kolawole Olukoya — General Overseer & Founder, MFM"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                  />
                </div>
                <div className={styles.goNameTag}>
                  <span className={styles.goNameTagInitials}>{GENERAL_OVERSEER.initials}</span>
                </div>
              </div>

              <div className={styles.goContent}>
                <h3 className={styles.goName}>{GENERAL_OVERSEER.name}</h3>
                <span className={styles.goTitle}>{GENERAL_OVERSEER.title}</span>

                <div className={styles.goCredentials}>
                  <div className={styles.goCredItem}>
                    <span className={styles.goCredLabel}>Academic Background</span>
                    <span className={styles.goCredValue}>{GENERAL_OVERSEER.degree}</span>
                  </div>
                  <div className={styles.goCredItem}>
                    <span className={styles.goCredLabel}>Doctoral Degree</span>
                    <span className={styles.goCredValue}>{GENERAL_OVERSEER.phd}</span>
                  </div>
                  <div className={styles.goCredItem}>
                    <span className={styles.goCredLabel}>Scientific Publications</span>
                    <span className={styles.goCredValue}>{GENERAL_OVERSEER.publications}</span>
                  </div>
                  <div className={styles.goCredItem}>
                    <span className={styles.goCredLabel}>Family</span>
                    <span className={styles.goCredValue}>{GENERAL_OVERSEER.family}</span>
                  </div>
                </div>

                <p className={styles.goBio}>{GENERAL_OVERSEER.bio}</p>

                <blockquote className={styles.goQuote}>
                  &ldquo;{GENERAL_OVERSEER.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </section>

          {/* ── Section: History Timeline ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Our Story</span>
              <h2 className={styles.sectionTitle}>A Legacy of Fire &amp; Miracles</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                From a living room prayer meeting of 24 brethren in Lagos, Nigeria, to a global ministry spanning 140+ nations — the story of MFM is the story of what God can do through willing vessels committed to prayer.
              </p>
            </div>

            <div className={styles.timeline}>
              {HISTORY_TIMELINE.map((item, i) => (
                <div key={i} className={`${styles.timelineItem} ${item.highlight ? styles.highlighted : ''}`}>
                  <div className={styles.timelineYear}>
                    <span>{item.year}</span>
                  </div>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <p className={styles.timelineText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section: Mission Statement ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Our Purpose</span>
              <h2 className={styles.sectionTitle}>MFM Mission Statement</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.sectionDesc}>
                The mandate of Mountain of Fire and Miracles Ministries is rooted in the Great Commission and the full gospel of Jesus Christ. These are the pillars on which the ministry was built.
              </p>
            </div>

            <div className={styles.missionGrid}>
              {MISSION_GOALS.map((goal, i) => (
                <div key={i} className={styles.missionCard}>
                  <span className={styles.missionNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <p className={styles.missionText}>{goal}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Section: Core Values ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>What We Stand For</span>
              <h2 className={styles.sectionTitle}>Core Values</h2>
              <div className={styles.sectionDivider} />
            </div>
            <div className={styles.valuesGrid}>
              {[
                { icon: '🔥', title: 'Aggressive Prayer', desc: 'Prayer is the engine of MFM. We believe in fervent, targeted, faith-filled prayer that produces supernatural results.' },
                { icon: '✝️', title: 'Biblical Holiness', desc: 'Holiness within and without is the standard. We preach a transformed life that reflects the character of Christ.' },
                { icon: '⚔️', title: 'Spiritual Warfare', desc: 'We train believers in the art and science of spiritual warfare — equipping an aggressive, victorious army for God.' },
                { icon: '🕊️', title: 'Deliverance Ministry', desc: 'Jesus came to set the captives free. Deliverance from every bondage is available through the power of His name.' },
                { icon: '📖', title: 'The Word of God', desc: 'The Bible is our sole authority. Every doctrine, every practice, every prayer point is rooted in Scripture.' },
                { icon: '🌍', title: 'Global Evangelism', desc: 'We are commissioned to take the gospel to every nation. MFM now reaches 140+ nations through its branches and media.' },
              ].map((v, i) => (
                <div key={i} className={styles.valueCard}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <h4 className={styles.valueTitle}>{v.title}</h4>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Join Our Family</h3>
            <p className={styles.ctaText}>
              Whether you are new to faith or a seasoned believer, MFM Orlando has a place for you.
              Come as you are — and encounter the God who transforms.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/#services" className="btn-primary">View Service Times</Link>
              <Link href="/#contact" className="btn-secondary">Get in Touch</Link>
            </div>
          </div>

        </div>
      </main>

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>
    </div>
  )
}
