import Image from 'next/image'
import { SERVICES, CHURCH } from '@/data/siteData'
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className="section-inner">
        <div className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <div key={i} className={`service-card ${styles.card}`}>
              <div className={styles.cardImgWrap} aria-hidden="true">
                <Image
                  src="/new Logo mfm.png"
                  alt=""
                  fill
                  style={{ objectFit: 'contain', opacity: 0.14, filter: 'grayscale(1) brightness(3)' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardGlow} />
              <span className={styles.cardIcon}>{svc.icon}</span>
              <div className={styles.cardContent}>
                <span className={styles.cardDay}>{svc.day}</span>
                <p className={styles.cardName}>{svc.name}</p>
                <p className={styles.cardTime}>{svc.time}</p>
                {'note' in svc && svc.note && (
                  <p className={styles.cardNote}>{svc.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className={styles.address}>
          📍 {CHURCH.address}
        </p>
      </div>
    </section>
  )
}
