import Image from 'next/image'
import styles from './GivingSection.module.css'

export default function GivingSection() {
  return (
    <section id="giving" className={styles.section}>

      {/* Logo watermark */}
      <div className={styles.logoWatermark} aria-hidden="true">
        <Image src="/mfm-logo.png" alt="" fill style={{ objectFit: 'contain' }} />
      </div>

      <div className="section-inner">
        <div className={styles.inner}>
          <span className="section-label reveal" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Support the Kingdom
          </span>
          <h2 className={`${styles.title} reveal d1`}>
            Give &amp; Advance<br />God&apos;s Kingdom
          </h2>
          <p className={`${styles.sub} reveal d2`}>
            Your generous offering helps MFM Orlando continue its mission of deliverance,
            discipleship, and reaching souls for Jesus Christ.
          </p>
          <div className={`${styles.btns} reveal d3`}>
            <a href="#contact" className="btn-gold" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Give Online
            </a>
            <a href="#contact" className="btn-outline-white" onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Contact Us to Give
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
