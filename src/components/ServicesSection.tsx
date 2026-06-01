import { SERVICES, CHURCH } from '@/data/siteData'
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <span className="section-label reveal">Worship with Us</span>
          <h2 className="section-title reveal d1">Weekly Services</h2>
          <div className="section-divider reveal d2" style={{ margin: '0 auto' }} />
        </div>

        <div className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <div key={i} className={`service-card ${styles.card} reveal d${(i % 6) + 1}`}>
              <div className={styles.cardGlow} />
              <span className={styles.cardIcon}>{svc.icon}</span>
              <span className={styles.cardDay}>{svc.day}</span>
              <p className={styles.cardName}>{svc.name}</p>
              <p className={styles.cardTime}>{svc.time}</p>
            </div>
          ))}
        </div>

        <p className={`${styles.address} reveal`}>
          📍 {CHURCH.address}
        </p>
      </div>
    </section>
  )
}
