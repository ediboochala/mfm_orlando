'use client'

import { useState } from 'react'
import { CHURCH, PASTOR, SOCIAL_LINKS } from '@/data/siteData'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="section-inner">
        <div className={styles.header}>
          <span className="section-label reveal">Get in Touch</span>
          <h2 className="section-title reveal d1">Connect With Us</h2>
          <div className="section-divider reveal d2" style={{ margin: '0 auto' }} />
        </div>

        <div className={styles.grid}>
          {/* Info */}
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
                  <span
                    className={styles.infoValue}
                    style={item.gold ? { whiteSpace: 'pre-line' } : undefined}
                  >
                    {item.value.split('\n').map((line, i) => (
                      <span key={i} style={i === 1 && item.gold ? { color: 'var(--gold)' } : undefined}>
                        {line}{i < item.value.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}

            <div className={styles.socials}>
              {SOCIAL_LINKS.map((s) => (
                <a key={s.href} href={s.href} className={styles.socialLink} target="_blank" rel="noopener noreferrer" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            <form className={styles.form} onSubmit={handleSubmit}>
              {[
                { key: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Enter your full name' },
                { key: 'email',   label: 'Your Email',   type: 'email', placeholder: 'Enter your email address' },
                { key: 'subject', label: 'Subject',      type: 'text',  placeholder: 'How can we help you?' },
              ].map((field) => (
                <div key={field.key} className={styles.formGroup}>
                  <label className={styles.formLabel}>{field.label}</label>
                  <input
                    type={field.type}
                    className={styles.formInput}
                    placeholder={field.placeholder}
                    value={(form as Record<string, string>)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  />
                </div>
              ))}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Message</label>
                <textarea
                  className={`${styles.formInput} ${styles.textarea}`}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
              {submitted && (
                <p className={styles.success}>✦ Message Sent! We will respond shortly.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
