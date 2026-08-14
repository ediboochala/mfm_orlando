import Image from 'next/image'
import { CHURCH } from '@/data/siteData'
import NextServiceBadge from './NextServiceBadge'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroPhoto}>
        <Image
          src="/pexels-caleboquendo-34612562.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          aria-hidden
        />
      </div>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      <div className={styles.heroContent}>
        {/* Logo badge */}
        <div className={styles.logoBadge}>
          <Image
            src="/new Logo mfm.png"
            alt="Mountain of Fire and Miracles Ministries"
            width={110}
            height={110}
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <p className={styles.eyebrow}>Welcome to!</p>
        <h1 className={styles.title}>
          Mountain of Fire<br />and Miracles Ministries
        </h1>
        <p className={styles.tagline}>Tampa, Florida</p>
        <p className={styles.address}>{CHURCH.address}</p>
        <NextServiceBadge />
        <div className={styles.divider} />

        <div className={styles.btns}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CHURCH.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary ${styles.getDirections}`}
          >
            Get Directions
          </a>
          <a
            href="https://www.youtube.com/@mfm-tampaflorida4355"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-secondary ${styles.watchOnline}`}
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
