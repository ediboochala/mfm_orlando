'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import GivingFormEmbed from './GivingFormEmbed'
import styles from './GivingSection.module.css'

const TEXT_TO_GIVE_NUMBER = '+1 (813) 592-3641'
const TEXT_TO_GIVE_SMS_HREF = `sms:${TEXT_TO_GIVE_NUMBER.replace(/[^0-9+]/g, '')}`

const ZELLE_PHONE = '+1 (813) 592-3641'
const ZELLE_PHONE_TEL_HREF = `tel:${ZELLE_PHONE.replace(/[^0-9+]/g, '')}`
const ZELLE_EMAIL = 'mfmtampaflorida@gmail.com'

const ZELLE_STEPS = [
  'Open the Zelle® tab in your bank’s app (or the Zelle app)',
  'Tap "Send Money"',
  'Enter our phone number or email above',
  'Add the amount and a note like "Tithe" or "Offering"',
  'Review and send — it arrives instantly, with no fees',
]

type ActiveModal = 'text' | 'zelle' | null

export default function GivingSection() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)

  // Escape to close + lock body scroll while a modal is open
  useEffect(() => {
    if (!activeModal) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [activeModal])

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
              onClick={() => setActiveModal('text')}
              className="btn-gold"
            >
              Text-To-Give
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('zelle')}
              className="btn-gold"
            >
              Give with Zelle
            </button>
          </div>

          {/* Embedded giving form */}
          <div id="giving-form" className={`${styles.formCard} reveal d4`}>
            <GivingFormEmbed />
          </div>
        </div>
      </div>

      {/* Text-To-Give modal — portalled to <body> so it isn't trapped under the
          navbar by the global `section { z-index: 1 }` stacking context */}
      {activeModal === 'text' && createPortal(
        <div
          className={styles.textGiveModal}
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Text-To-Give"
        >
          <button
            className={styles.textGiveClose}
            onClick={() => setActiveModal(null)}
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
        </div>,
        document.body
      )}

      {/* Give with Zelle modal */}
      {activeModal === 'zelle' && createPortal(
        <div
          className={styles.textGiveModal}
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Give with Zelle"
        >
          <button
            className={styles.textGiveClose}
            onClick={() => setActiveModal(null)}
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <div className={styles.zelleCard} onClick={(e) => e.stopPropagation()}>
            <Image
              src="/zelle-logo.png"
              alt="Zelle"
              width={800}
              height={371}
              className={styles.zelleLogo}
            />

            <div className={styles.zelleQrWrap}>
              <Image
                src="/zelle-qr.png"
                alt="QR code that scans to our Zelle email, mfmtampaflorida@gmail.com"
                width={640}
                height={640}
                className={styles.zelleQr}
              />
            </div>
            <p className={styles.zelleQrHint}>Scan to copy our Zelle email</p>

            <div className={styles.zelleContact}>
              <a href={ZELLE_PHONE_TEL_HREF} className={styles.zelleContactLine}>
                {ZELLE_PHONE}
              </a>
              <a href={`mailto:${ZELLE_EMAIL}`} className={styles.zelleContactLine}>
                {ZELLE_EMAIL}
              </a>
            </div>

            <div className={styles.zelleGuide}>
              <span className={styles.zelleGuideLabel}>How to give with Zelle</span>
              <ol className={styles.zelleGuideList}>
                {ZELLE_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
