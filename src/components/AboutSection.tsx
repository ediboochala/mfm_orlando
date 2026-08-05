import { HISTORY_TIMELINE, MISSION_GOALS, GENERAL_OVERSEER } from '@/data/siteData'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="section-inner">
        <div className={styles.grid}>
          {/* Left — Timeline */}
          <div>
            <span className="section-label reveal">Our Story</span>
            <h2 className="section-title reveal d1">A Legacy of Fire &amp; Miracles</h2>
            <div className="section-divider reveal d2" />

            <div className={`${styles.timeline} reveal d3`}>
              {HISTORY_TIMELINE.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div
                    className={styles.dot}
                    style={item.highlight ? { background: 'var(--primary)', boxShadow: '0 0 12px var(--primary)' } : undefined}
                  />
                  <span className={styles.year}>{item.year}</span>
                  <p className={styles.text}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Sticky content */}
          <div className={`${styles.right} reveal-right`}>
            <div className={styles.verseBox}>
              <p className={styles.verse}>
                &ldquo;Seek the Lord while He may be found, call upon Him while He is near.&rdquo;
              </p>
              <p className={styles.verseRef}>— Isaiah 55:6</p>
            </div>

            <h3 className={styles.missionTitle}>MFM Mission</h3>
            <ul className={styles.missionList}>
              {MISSION_GOALS.slice(0, 5).map((goal, i) => (
                <li key={i} className={styles.missionItem}>
                  <span className={styles.bullet}>✦</span>
                  {goal}
                </li>
              ))}
            </ul>

            <div className={styles.quoteBox}>
              <p className={styles.quoteText}>{GENERAL_OVERSEER.quote}</p>
              <p className={styles.quoteAuthor}>— Dr. D.K. Olukoya</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
