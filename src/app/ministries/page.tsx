import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CHURCH, MINISTRIES, MINISTRY_PROJECTS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Our Ministries — ${CHURCH.shortName}`,
  description:
    'Discover the ministries of MFM Orlando — Men of Valor, Women Foundation, Youth Fellowship, Children\'s Church, Music Ministry, GEN 2:18, and the Expectant Family Ministry.',
}

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

      {/* ── Ministries Grid ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.ministriesGrid}>
            {MINISTRIES.map((ministry) => (
              <article key={ministry.id} className={styles.ministryCard}>
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
              </article>
            ))}
          </div>

          {/* ── Projects & Impact ── */}
          <section className={styles.projects}>
            <div className={styles.projectsHeader}>
              <span className={styles.projectsLabel}>Our Works</span>
              <h2 className={styles.projectsTitle}>Impact We Have Built Together</h2>
              <div className={styles.projectsDivider} />
              <p className={styles.projectsDesc}>
                Real moments. Real people. Real transformation. Here is a glimpse of what God has done through the ministries of MFM Orlando.
              </p>
            </div>
            <div className={styles.projectsGrid}>
              {MINISTRY_PROJECTS.map((project) => (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.projectImageWrap}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={styles.projectImage}
                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={styles.projectPlaceholder}>
                        <svg width="36" height="48" viewBox="0 0 36 52" fill="none">
                          <path d="M18 2C18 2 27 12 25 23C30 18 32 11 30 6C35 13 37 23 32 32C28 38 22 42 18 50C14 42 8 38 4 32C-1 23 1 13 6 6C4 11 6 18 11 23C9 12 18 2 18 2Z" fill="url(#projFlame)" />
                          <defs>
                            <linearGradient id="projFlame" x1="18" y1="2" x2="18" y2="50" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.35" />
                              <stop offset="50%" stopColor="#E53935" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#7A0000" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className={styles.placeholderText}>Photo Coming Soon</span>
                      </div>
                    )}
                    <div className={styles.projectOverlay}>
                      <span className={styles.projectMinistryTag}>{project.ministry}</span>
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <span className={styles.projectDate}>{project.date}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

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
