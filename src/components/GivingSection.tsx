import Image from 'next/image'
import Link from 'next/link'
import GivingFormEmbed from './GivingFormEmbed'
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
          <span className={`section-label reveal ${styles.sectionLabel}`}>
            Support the Kingdom
          </span>
          <h2 className={`${styles.title} reveal d1`}>
            Give &amp; Advance<br />God&apos;s Kingdom
          </h2>
          <p className={`${styles.sub} reveal d2`}>
            Your generous offering helps MFM Tampa Florida continue its mission of deliverance,
            discipleship, and reaching souls for Jesus Christ.
          </p>
          <div className={`${styles.btns} reveal d3`}>
            <a href="#giving-form" className={`btn-gold ${styles.giveBtn}`} onClick={(e) => {
              e.preventDefault()
              document.getElementById('giving-form')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Give Online
            </a>
            <Link href="/contact" className="btn-outline-white">
              Contact Us to Give
            </Link>
          </div>

          {/* Embedded giving form */}
          <div id="giving-form" className={`${styles.formCard} reveal d4`}>
            <GivingFormEmbed />
          </div>
        </div>
      </div>
    </section>
  )
}
