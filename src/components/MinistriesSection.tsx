import { MINISTRIES } from '@/data/siteData'
import MinistryIcon from './MinistryIcon'
import styles from './MinistriesSection.module.css'

export default function MinistriesSection() {
  return (
    <section id="ministries" className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <span className="section-label reveal">Serve and Grow</span>
          <h2 className="section-title reveal d1">Our Ministries</h2>
          <div className="section-divider reveal d2" style={{ margin: '0 auto' }} />
        </div>

        <div className={styles.grid}>
          {MINISTRIES.map((m, i) => (
            <div
              key={i}
              className={`ministry-card ${styles.card} reveal d${(i % 6) + 1}`}
            >
              <div className={styles.cardBg} />
              <span className={styles.icon}><MinistryIcon name={m.icon} /></span>
              <p className={styles.name}>{m.name}</p>
              <p className={styles.desc}>{m.tagline}</p>
              <a
                href="/ministries"
                className={styles.learn}
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
