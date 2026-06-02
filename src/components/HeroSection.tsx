import Image from 'next/image'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      {/* Faint logo watermark */}
      <div className={styles.logoWatermark}>
        <Image src="/mfm-logo.png" alt="" width={600} height={600} aria-hidden />
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

        <p className={styles.eyebrow}>Welcome to</p>
        <h1 className={styles.title}>Mountain of Fire</h1>
        <p className={styles.of}>and Miracles</p>
        <h2 className={styles.subtitle}>Ministries</h2>
        <p className={styles.tagline}>The Citadel of Solution — Orlando, Florida</p>
        <div className={styles.divider} />
        <p className={styles.desc}>
          MFM Orlando welcomes all souls seeking God&apos;s love, deliverance, and His abundant
          grace. You are welcome to join our growing family.
        </p>

        <div className={styles.btns}>
          <a href="#services" className="btn-primary" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Join Us Sunday
          </a>
          <a href="#contact" className="btn-secondary" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Plan Your Visit
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
