import Image from 'next/image'
import { CHURCH } from '@/data/siteData'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      {/* Faint building watermark */}
      <div className={styles.logoWatermark}>
        <Image src="/building.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center' }} aria-hidden />
      </div>

      <div className={styles.heroContent}>
        {/* Live Badge */}
        <div className={styles.liveBadge}>
          <span className={styles.liveDot} />
          <span>Live Services Every Sunday</span>
        </div>

        {/* Flame */}
        <div className={styles.fireWrap}>
          <div className={styles.flameContainer}>
            <div className={`${styles.flame} ${styles.flame1}`} />
            <div className={`${styles.flame} ${styles.flame2}`} />
            <div className={`${styles.flame} ${styles.flame3}`} />
          </div>
        </div>

        <p className={styles.eyebrow}>Welcome to!</p>
        <h1 className={styles.title}>Mountain of Fire</h1>
        <p className={styles.of}>and Miracles</p>
        <h2 className={styles.subtitle}>Ministries</h2>
        <p className={styles.tagline}>Tampa, Florida</p>
        <p className={styles.address}>{CHURCH.address}</p>
        <div className={styles.divider} />

        <div className={styles.btns}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CHURCH.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Get Directions
          </a>
          <a
            href="https://www.youtube.com/@mfm-tampaflorida4355"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Watch Online
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  )
}
