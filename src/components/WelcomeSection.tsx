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
                <div className={styles.flameIcon}>
                  <svg width="52" height="72" viewBox="0 0 40 56" fill="none">
                    <path
                      d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
                      fill="url(#fp2)"
                    />
                    <defs>
                      <linearGradient id="fp2" x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
                        <stop offset="0%"   stopColor="#FFF9C4" stopOpacity="0.6" />
                        <stop offset="50%"  stopColor="#E53935" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#7A0000" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className={styles.placeholderLabel}>
                  PASTOR SAMUEL<br />OMOIGBERAE
                </span>
                <span className={styles.placeholderHint}>Host Pastor · MFM Orlando</span>
              </div>
              <div className={styles.tag}>Host Pastor · MFM Orlando</div>
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
