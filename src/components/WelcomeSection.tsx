import Link from 'next/link'
import { PASTOR } from '@/data/siteData'
import styles from './WelcomeSection.module.css'

export default function WelcomeSection() {
  return (
    <section id="welcome" className={styles.section}>
      <div className="section-inner">
        <div className={styles.grid}>
          {/* Image / Pastor Card */}
          <div className={`${styles.imgWrap} reveal-left`}>
            <div className={styles.imgFrame}>
              <div className={styles.imgPlaceholder}>
                <svg className={styles.flameIcon} width="40" height="56" viewBox="0 0 26 38" fill="none">
                  <path
                    d="M13 2C13 2 20 9 18 18C22 14 24 8 22 4C26 10 27 18 23 25C20 30 16 33 13 38C10 33 6 30 3 25C-1 18 0 10 4 4C2 8 4 14 8 18C6 9 13 2 13 2Z"
                    fill="url(#welcomeFlame)"
                  />
                  <defs>
                    <linearGradient id="welcomeFlame" x1="13" y1="2" x2="13" y2="38" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFF9C4" />
                      <stop offset="50%" stopColor="#FF7A1A" />
                      <stop offset="100%" stopColor="#A8125A" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className={styles.placeholderLabel}>Pastor Kehinde Olajide</span>
                <span className={styles.placeholderHint}>Photo Coming Soon</span>
              </div>
              <div className={styles.tag}>Host Pastor · MFM Tampa Florida</div>
            </div>

            {/* Scripture accent */}
            <div className={styles.scriptureAccent}>
              <span className={styles.scriptureText}>
                &ldquo;This is the day the Lord hath made&rdquo;
              </span>
              <span className={styles.scriptureRef}>Psalm 118:24</span>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <span className="section-label">A Word from Our Pastor</span>
            <h2 className="section-title">Greetings in the<br />Name of Jesus</h2>
            <div className="section-divider" />

            <p className={styles.greeting}>{PASTOR.greeting}</p>

            <blockquote className={styles.quote}>
              &ldquo;Jesus wants to deliver you from the yokes, bondages, oppressions,
              and the strongholds in your lives. He came to set the captives free —
              and He had you in mind.&rdquo;
            </blockquote>

            <p className={styles.body}>{PASTOR.message}</p>

            <div className={styles.sigBlock}>
              <span className={styles.sigLine}>{PASTOR.signature}</span>
              <span className={styles.sig}>{PASTOR.signatureName}</span>
            </div>

            <div className={styles.actions}>
              <a
                href="#services"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Service Times
              </a>
              <Link href="/pastor" className="btn-secondary">
                Read Full Message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
