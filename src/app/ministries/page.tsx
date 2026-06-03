import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CHURCH, MINISTRIES, MINISTRY_PROJECTS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Our Ministries — ${CHURCH.shortName}`,
  description:
    "Discover the ministries of MFM Orlando — Men of Valor, Women Foundation, Youth Fellowship, Children's Church, Music Ministry, GEN 2:18, and the Expectant Family Ministry.",
}

const PhotoPlaceholder = () => (
  <div className={styles.photoPlaceholder}>
    <svg width="28" height="38" viewBox="0 0 28 40" fill="none">
      <path
        d="M14 2C14 2 21 10 19 19C23 15 25 9 23 5C27 11 28 19 24 26C21 31 17 34 14 40C11 34 7 31 4 26C0 19 1 11 5 5C3 9 5 15 9 19C7 10 14 2 14 2Z"
        fill="url(#ph)"
      />
      <defs>
        <linearGradient id="ph" x1="14" y1="2" x2="14" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#FFF9C4" stopOpacity="0.3" />
          <stop offset="50%"  stopColor="#E53935" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7A0000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
    <span className={styles.photoPlaceholderText}>Photos Coming Soon</span>
  </div>
)

export default function MinistriesPage() {
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
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Our Ministries</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Serve &amp; Grow</span>
          <h1 className={styles.heroTitle}>Our Ministries</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            There is a place for every believer in the body of Christ.<br />
            Find your family, find your calling, find your people.
          </p>
        </div>
      </header>

      {/* ── Intro ── */}
      <div className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.introText}>
            MFM Orlando is not just a Sunday church — it is a community of believers who serve together, grow together, and fight together. Each of our ministries exists because a specific group of people has a specific need and a specific calling, and God has provided a covering for each one. Whether you are a man looking for brotherhood, a woman seeking to walk in her full identity, a young person searching for purpose, or a couple expecting a child — there is a place here for you.
          </p>
        </div>
      </div>

      {/* ── Ministries (side-by-side per ministry) ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.ministriesList}>
            {MINISTRIES.map((ministry) => {
              const photos = MINISTRY_PROJECTS.filter((p) => p.ministryId === ministry.id)
              return (
                <section key={ministry.id} className={styles.ministrySection}>
                  <div className={styles.ministrySplit}>

                    {/* LEFT — Ministry Info */}
                    <div className={styles.splitInfo}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>{ministry.icon}</span>
                        <div className={styles.cardTitles}>
                          <h2 className={styles.cardName}>{ministry.name}</h2>
                          <span className={styles.cardSubtitle}>{ministry.subtitle}</span>
                        </div>
                      </div>

                      <div className={styles.cardDivider} />

                      <p className={styles.cardTagline}>{ministry.tagline}</p>
                      <p className={styles.cardDescription}>{ministry.description}</p>

                      <ul className={styles.cardDetails}>
                        {ministry.details.map((detail, i) => (
                          <li key={i} className={styles.cardDetail}>
                            <span className={styles.detailDot} />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className={styles.cardFooter}>
                        <div className={styles.membershipBadge}>
                          <span className={styles.membershipLabel}>Membership</span>
                          <span className={styles.membershipValue}>{ministry.membership}</span>
                        </div>
                        <blockquote className={styles.cardScripture}>
                          {ministry.scripture}
                        </blockquote>
                      </div>
                    </div>

                    {/* RIGHT — Photos */}
                    <div className={styles.splitPhotos}>
                      <div className={styles.photosHeader}>
                        <span className={styles.photosLabel}>Our Work</span>
                        <div className={styles.photosRule} />
                      </div>
                      <div className={styles.photosGrid}>
                        {photos.map((project) => (
                          <article key={project.id} className={styles.photoCard}>
                            <div className={styles.photoWrap}>
                              {project.image ? (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className={styles.photoImg}
                                  sizes="(max-width: 900px) 80vw, 28vw"
                                />
                              ) : (
                                <PhotoPlaceholder />
                              )}
                            </div>
                            <div className={styles.photoCaption}>
                              <span className={styles.photoDate}>{project.date}</span>
                              <h3 className={styles.photoTitle}>{project.title}</h3>
                              <p className={styles.photoDesc}>{project.description}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>
              )
            })}
          </div>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Ready to Get Involved?</h3>
            <p className={styles.ctaText}>
              Every ministry at MFM Orlando is open and welcoming. Whether you want to join, serve, or simply find out more — reach out to us and we will connect you with the right family.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/#contact" className="btn-primary">Contact Us</Link>
              <Link href="/#services" className="btn-secondary">View Service Times</Link>
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
