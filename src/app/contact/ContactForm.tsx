'use client'

import { useState } from 'react'
import { CHURCH } from '@/data/siteData'
import styles from './page.module.css'

type FormState = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: FormState = { name: '', email: '', subject: '', message: '' }

export default function ContactForm() {
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
  )
}
