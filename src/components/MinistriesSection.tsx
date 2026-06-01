import { MINISTRIES } from '@/data/siteData'
import styles from './MinistriesSection.module.css'

export default function MinistriesSection() {
  return (
    <section id="ministries" className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <span className="section-label reveal">Serve &amp; Grow</span>
          <h2 className="section-title reveal d1">Our Ministries</h2>
          <div className="section-divider reveal d2" style={{ margin: '0 auto' }} />
        </div>

        <div className={styles.grid}>
          {MINISTRIES.map((m, i) => (
            <div
              key={i}
              className={`ministry-card ${styles.card} reveal d${(i % 6) + 1}`}
              style={i === MINISTRIES.length - 1 ? { gridColumn: '1 / 3' } : undefined}
            >
              <div className={styles.cardBg} />
              <span className={styles.icon}>{m.icon}</span>
              <p className={styles.name}>{m.name}</p>
              <p className={styles.desc}>{m.desc}</p>
              <a
                href="#contact"
                className={styles.learn}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
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
