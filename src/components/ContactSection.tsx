'use client'

import { useState } from 'react'
import { CHURCH, PASTOR, SOCIAL_LINKS } from '@/data/siteData'
import styles from './ContactSection.module.css'

type FormState = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: FormState = { name: '', email: '', subject: '', message: '' }

export default function ContactSection() {
  const [form, setForm]     = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const formData = new FormData(e.currentTarget)
      formData.append('access_key', 'd0cc811c-aab9-4069-8692-049790e60eea')
      formData.append('from_name', 'MFM Tampa Florida Website')
      formData.append(
        'subject',
        (formData.get('subject') as string) || 'New Contact Message — MFM Tampa Florida'
      )

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm(EMPTY)
        setTimeout(() => setStatus('idle'), 7000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 6000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <span className="section-label reveal">Get in Touch</span>
          <h2 className="section-title reveal d1">Connect With Us</h2>
          <div className={`section-divider reveal d2 ${styles.centeredDivider}`} />
        </div>

        <div className={styles.grid}>

          {/* ── Info column ── */}
          <div className="reveal-left">
            {[
              { icon: '📍', label: 'Physical Address', value: CHURCH.address },
              { icon: '📞', label: 'Phone',            value: CHURCH.phone },
              { icon: '✉️', label: 'Email',            value: CHURCH.email },
              { icon: '👤', label: 'Host Pastor',      value: `${PASTOR.name}\n${PASTOR.services}`, gold: true },
            ].map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <div className={styles.iconWrap}>{item.icon}</div>
                <div>
                  <span className={styles.infoLabel}>{item.label}</span>
                  <span className={`${styles.infoValue} ${item.gold ? styles.infoValueMulti : ''}`}>
                    {item.value.split('\n').map((line, i) => (
                      <span key={i} className={i === 1 && item.gold ? styles.infoValueGold : undefined}>
                        {line}{i < item.value.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}

            <div className={styles.socials}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Form column ── */}
          <div className="reveal-right">
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              {[
                { key: 'name',    label: 'Your Name',  type: 'text',  placeholder: 'Enter your full name',     required: true },
                { key: 'email',   label: 'Your Email', type: 'email', placeholder: 'Enter your email address', required: true },
                { key: 'subject', label: 'Subject',    type: 'text',  placeholder: 'How can we help you?',     required: false },
              ].map((field) => (
                <div key={field.key} className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.key}
                    className={styles.formInput}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    disabled={status === 'loading'}
                  />
                </div>
              ))}

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  className={`${styles.formInput} ${styles.textarea}`}
                  placeholder="Write your message here..."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${status === 'loading' ? styles.submitLoading : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className={styles.spinner} />
                ) : (
                  'Send Message'
                )}
              </button>

              {status === 'success' && (
                <div className={styles.successBox}>
                  <span className={styles.successIcon}>✦</span>
                  <div>
                    <p className={styles.successTitle}>Message Received</p>
                    <p className={styles.successSub}>
                      Thank you, {form.name || 'friend'}. We will respond to you shortly at your email address.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className={styles.errorBox}>
                  <p className={styles.errorTitle}>Message could not be sent.</p>
                  <p className={styles.errorSub}>
                    Please email us directly at{' '}
                    <a href={`mailto:${CHURCH.email}`} className={styles.errorLink}>
                      {CHURCH.email}
                    </a>
                  </p>
                </div>
              )}

            </form>
          </div>
        </div>

        {/* ── Location Map ── */}
        <div className={`${styles.mapWrap} reveal`}>
          <div className={styles.mapHeader}>
            <div className={styles.mapInfo}>
              <span className={styles.mapPin}>📍</span>
              <div>
                <span className={styles.mapLabel}>Our Location</span>
                <span className={styles.mapAddress}>{CHURCH.address}</span>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=4618+North+Florida+Avenue,+Tampa,+FL+33603"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapDirections}
            >
              Get Directions
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className={styles.mapFrame}>
            <iframe
              src="https://maps.google.com/maps?q=4618+North+Florida+Avenue,+Tampa,+FL+33603&hl=en&z=15&output=embed"
              width="100%"
              height="100%"
              className={styles.mapIframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MFM Tampa Florida location map"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
