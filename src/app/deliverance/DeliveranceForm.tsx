'use client'

import { useState } from 'react'
import { DELIVERANCE, PASTOR } from '@/data/siteData'
import styles from './DeliveranceForm.module.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Fields = { name: string; mobile: string; email: string; reason: string }

const EMPTY: Fields = { name: '', mobile: '', email: '', reason: '' }

const STEPS = [
  { title: 'You reach out', text: 'Share as much or as little as you are comfortable with.' },
  { title: 'We pray', text: 'Our prayer team begins to stand in the gap for you right away.' },
  { title: 'A minister follows up', text: 'A minister will call or email you to arrange deliverance ministration.' },
]

export default function DeliveranceForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [areas, setAreas] = useState<string[]>([])
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }))
  const toggle = (area: string) =>
    setAreas((a) => (a.includes(area) ? a.filter((x) => x !== area) : [...a, area]))

  const errors = {
    name: fields.name.trim() ? '' : 'Please tell us your name',
    mobile: fields.mobile.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a phone number we can reach you on',
    email: /^\S+@\S+\.\S+$/.test(fields.email) ? '' : 'Please enter a valid email address',
    reason: fields.reason.trim() || areas.length ? '' : 'Choose an area or tell us a little about what you are facing',
  }
  const valid = Object.values(errors).every((e) => !e)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid || status === 'sending') return
    setStatus('sending')

    // Chosen areas go in front of the free-text reason so the team sees both
    // in the single "Reason for Deliverance" column of the sheet.
    const reason = [areas.length ? `Areas: ${areas.join(', ')}` : '', fields.reason.trim()]
      .filter(Boolean)
      .join('\n\n')

    const body = new FormData()
    body.append(DELIVERANCE.formFields.name, fields.name.trim())
    body.append(DELIVERANCE.formFields.mobile, fields.mobile.trim())
    body.append(DELIVERANCE.formFields.email, fields.email.trim())
    body.append(DELIVERANCE.formFields.reason, reason)

    try {
      // Google Forms doesn't send CORS headers, so the response is opaque —
      // a resolved request means it was delivered.
      await fetch(DELIVERANCE.formUrl.replace(/\/viewform.*$/, '/formResponse'), {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
      setStatus('sent')
      setFields(EMPTY)
      setAreas([])
      setTouched(false)
    } catch {
      setStatus('error')
    }
  }

  const err = (key: keyof Fields) => (touched && errors[key] ? errors[key] : '')

  return (
    <div className={styles.card}>
      {/* ── Left: reassurance panel ── */}
      <aside className={styles.panel}>
        <span className={styles.panelLabel}>Deliverance Request</span>
        <h3 className={styles.panelTitle}>Your chains can be broken.</h3>
        <p className={styles.panelText}>
          Whatever you are facing, you are not too far gone and it is not too late. Tell us how we can stand with you.
        </p>

        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <span className={styles.stepText}>{s.text}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className={styles.private}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Your request is confidential and seen only by our ministers and prayer team.
        </p>
      </aside>

      {/* ── Right: form or confirmation ── */}
      <div className={styles.body}>
        {status === 'sent' ? (
          <div className={styles.sent} role="status">
            <span className={styles.sentIcon} aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className={styles.sentTitle}>Your request has been received</h3>
            <p className={styles.sentText}>
              Our prayer team is already standing with you, and a minister will be in touch soon.
              &ldquo;If the Son therefore shall make you free, ye shall be free indeed.&rdquo; (John 8:36)
            </p>
            <button type="button" className={styles.linkBtn} onClick={() => setStatus('idle')}>
              Send another request
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.label}>Full name</span>
                <input
                  className={`${styles.input} ${err('name') ? styles.invalid : ''}`}
                  value={fields.name}
                  onChange={set('name')}
                  autoComplete="name"
                  placeholder="Your full name"
                />
                {err('name') && <span className={styles.error}>{err('name')}</span>}
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Mobile</span>
                <input
                  className={`${styles.input} ${err('mobile') ? styles.invalid : ''}`}
                  value={fields.mobile}
                  onChange={set('mobile')}
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                />
                {err('mobile') && <span className={styles.error}>{err('mobile')}</span>}
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                className={`${styles.input} ${err('email') ? styles.invalid : ''}`}
                value={fields.email}
                onChange={set('email')}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
              {err('email') && <span className={styles.error}>{err('email')}</span>}
            </label>

            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>
                What do you need deliverance from? <span className={styles.hint}>Choose any that apply</span>
              </legend>
              <div className={styles.chips}>
                {DELIVERANCE.areas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    aria-pressed={areas.includes(area)}
                    className={`${styles.chip} ${areas.includes(area) ? styles.chipOn : ''}`}
                    onClick={() => toggle(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className={styles.field}>
              <span className={styles.label}>
                Tell us more <span className={styles.hint}>Optional if you chose an area above</span>
              </span>
              <textarea
                className={`${styles.input} ${styles.textarea} ${err('reason') ? styles.invalid : ''}`}
                value={fields.reason}
                onChange={set('reason')}
                rows={5}
                placeholder="Share what you are going through, in your own words…"
              />
              {err('reason') && <span className={styles.error}>{err('reason')}</span>}
            </label>

            {status === 'error' && (
              <p className={styles.formError} role="alert">
                We couldn&apos;t send your request. Please check your connection and try again, or call{' '}
                <a href={`tel:${PASTOR.cell.replace(/[^0-9+]/g, '')}`}>{PASTOR.cell}</a>.
              </p>
            )}

            <button type="submit" className={`btn-primary ${styles.submit}`} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send My Deliverance Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
