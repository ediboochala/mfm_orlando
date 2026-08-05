import Link from 'next/link'
import Image from 'next/image'
import { PASTOR } from '@/data/siteData'
import { highlightOrgName } from '@/lib/highlightOrgName'
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
                <Image
                  src="/Pastor Tampa.png"
                  alt="Pastor Kehinde Olajide"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />
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

            <p className={styles.greeting}>{highlightOrgName(PASTOR.greeting)}</p>

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
              <Link href="/services" className="btn-primary">
                View Service Times
              </Link>
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
