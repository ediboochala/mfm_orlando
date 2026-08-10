'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import GivingFormEmbed from './GivingFormEmbed'
import styles from './GivingSection.module.css'

const TEXT_TO_GIVE_NUMBER = '+1 (813) 592-3641'
const TEXT_TO_GIVE_SMS_HREF = `sms:${TEXT_TO_GIVE_NUMBER.replace(/[^0-9+]/g, '')}`

export default function GivingSection() {
  const [showTextToGive, setShowTextToGive] = useState(false)

  // Escape to close + lock body scroll while the modal is open
  useEffect(() => {
    if (!showTextToGive) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowTextToGive(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [showTextToGive])

  return (
    <section id="giving" className={styles.section}>

      {/* Logo watermark */}
      <div className={styles.logoWatermark} aria-hidden="true">
        <Image src="/new Logo mfm.png" alt="" fill style={{ objectFit: 'contain' }} />
      </div>

      <div className="section-inner">
        <div className={styles.inner}>
          <span className={`section-label reveal ${styles.sectionLabel}`}>
            Support the Kingdom
          </span>
          <h2 className={`${styles.title} reveal d1`}>
            Give and Advance<br />God&apos;s Kingdom
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
            <button
              type="button"
              onClick={() => setShowTextToGive(true)}
              className="btn-outline-white"
            >
              Text-To-Give
            </button>
          </div>

          {/* Embedded giving form */}
          <div id="giving-form" className={`${styles.formCard} reveal d4`}>
            <GivingFormEmbed />
          </div>
        </div>
      </div>

      {/* Text-To-Give modal */}
      {showTextToGive && (
        <div
          className={styles.textGiveModal}
          onClick={() => setShowTextToGive(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Text-To-Give"
        >
          <button
            className={styles.textGiveClose}
            onClick={() => setShowTextToGive(false)}
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <div className={styles.textGiveCard} onClick={(e) => e.stopPropagation()}>
            <span className={styles.textGiveLabel}>Text-To-Give</span>
            <a href={TEXT_TO_GIVE_SMS_HREF} className={styles.textGiveNumber}>
              {TEXT_TO_GIVE_NUMBER}
            </a>
            <p className={styles.textGiveHint}>Text this number directly to give from your phone.</p>
            <a href={TEXT_TO_GIVE_SMS_HREF} className={`btn-gold ${styles.textGiveBtn}`}>
              Open Messages
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
