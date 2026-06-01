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
                <svg width="60" height="80" viewBox="0 0 40 56" fill="none">
                  <path
                    d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
                    fill="url(#fp2)"
                  />
                  <defs>
                    <linearGradient id="fp2" x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stopColor="#FFF9C4" stopOpacity="0.4" />
                      <stop offset="60%"  stopColor="#E53935" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7A0000" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className={styles.placeholderLabel}>
                  PASTOR SAMUEL<br />OMOIGBERAE
                </span>
                <span className={styles.placeholderHint}>
                  Replace with pastor photo
                </span>
              </div>
              <div className={styles.tag}>Host Pastor · MFM Orlando</div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <span className="section-label">A Word from Our Pastor</span>
            <h2 className="section-title">Greetings in the Name of Jesus</h2>
            <div className="section-divider" />
            <blockquote className={styles.quote}>
              &ldquo;Jesus wants to deliver you from the yokes, bondages, oppressions, and the
              strongholds in your lives. He came to set the captives free — and He had you in mind.&rdquo;
            </blockquote>
            <p className={styles.body}>{PASTOR.message}</p>
            <p className={styles.sig}>{PASTOR.signature}</p>
            <a
              href="#services"
              className="btn-primary"
              style={{ marginTop: '30px' }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View Service Times
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
