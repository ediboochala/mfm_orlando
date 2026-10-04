'use client'

import { useEffect, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { GALLERY_EVENTS, WEB3FORMS_KEY } from '@/data/siteData'
import styles from './SharePhotosForm.module.css'

// Photos upload straight from the browser to Vercel Blob (via /api/photo-upload),
// then Web3Forms emails the church the details plus a link to every photo.
// Web3Forms attachments are a paid feature, so links are sent instead.
const MAX_FILES = 10
const MAX_MB = 15

type Picked = { id: string; file: File; preview: string | null }
type Status = 'idle' | 'uploading' | 'sending' | 'success' | 'error'

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'photo'

export default function SharePhotosForm() {
  const [files, setFiles] = useState<Picked[]>([])
  const [dragging, setDragging] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Free preview object URLs when files are removed or the form unmounts
  const filesRef = useRef(files)
  filesRef.current = files
  useEffect(() => () => filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview)), [])

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list)
    const skipped: string[] = []
    const accepted: Picked[] = []

    for (const file of incoming) {
      if (!file.type.startsWith('image/')) { skipped.push(`${file.name} is not an image`); continue }
      if (file.size > MAX_MB * 1024 * 1024) { skipped.push(`${file.name} is over ${MAX_MB} MB`); continue }
      if (files.length + accepted.length >= MAX_FILES) { skipped.push(`only ${MAX_FILES} photos per submission`); break }
      // Browsers can't preview HEIC (iPhone) photos — they still upload fine
      const canPreview = !/hei[cf]/i.test(file.type)
      accepted.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        preview: canPreview ? URL.createObjectURL(file) : null,
      })
    }

    setFiles((prev) => [...prev, ...accepted])
    setNotice(skipped.length ? `Skipped: ${skipped.join('; ')}.` : null)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const gone = prev.find((f) => f.id === id)
      if (gone?.preview) URL.revokeObjectURL(gone.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  const busy = status === 'uploading' || status === 'sending'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    if (files.length === 0) { setNotice('Please add at least one photo.'); return }

    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const event = String(data.get('event') || 'Other')

    setNotice(null)
    setStatus('uploading')
    setProgress(0)

    try {
      // Upload one at a time so the progress bar is meaningful on slow connections
      const totalBytes = files.reduce((n, f) => n + f.file.size, 0)
      let doneBytes = 0
      const urls: string[] = []

      for (const { file } of files) {
        const blob = await upload(`photo-submissions/${slug(event)}/${slug(name)}-${slug(file.name)}`, file, {
          access: 'public',
          handleUploadUrl: '/api/photo-upload',
          onUploadProgress: ({ loaded }) => setProgress(Math.round(((doneBytes + loaded) / totalBytes) * 100)),
        })
        doneBytes += file.size
        urls.push(blob.url)
      }

      setStatus('sending')
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New photos shared: ${event} (${urls.length})`,
          from_name: 'MFM Tampa Florida Website',
          name,
          email: data.get('email'),
          phone: data.get('phone') || 'Not provided',
          event,
          message: data.get('message') || '(no message)',
          permission_to_feature: data.get('consent') ? 'Yes' : 'No',
          photo_count: urls.length,
          photos: urls.map((u, i) => `Photo ${i + 1}: ${u}`).join('\n'),
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Email failed')

      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
      setFiles([])
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h4>Thank you for sharing!</h4>
        <p>Your photos have been received. Our media team will review them for the gallery.</p>
        <button type="button" className={styles.again} onClick={() => setStatus('idle')}>
          Share more photos
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Your name <em>*</em></span>
          <input name="name" type="text" required placeholder="Full name" disabled={busy} />
        </label>
        <label className={styles.field}>
          <span>Email <em>*</em></span>
          <input name="email" type="email" required placeholder="you@example.com" disabled={busy} />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Phone</span>
          <input name="phone" type="tel" placeholder="Optional" disabled={busy} />
        </label>
        <label className={styles.field}>
          <span>Which event? <em>*</em></span>
          <select name="event" required defaultValue="" disabled={busy}>
            <option value="" disabled>Choose an event</option>
            {GALLERY_EVENTS.map((ev) => (
              <option key={ev.slug} value={ev.title}>{ev.title}</option>
            ))}
            <option value="Other">Other church event</option>
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={3} placeholder="Tell us about these photos (optional)" disabled={busy} />
      </label>

      {/* Drop zone */}
      <div
        className={`${styles.drop} ${dragging ? styles.dropActive : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); if (!busy) addFiles(e.dataTransfer.files) }}
        onClick={() => !busy && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !busy) { e.preventDefault(); inputRef.current?.click() } }}
        aria-label="Add photos"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }}
        />
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3.5 17l5-4.5 4 3.5 3-2.5 5 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <strong>Tap to choose photos</strong>
        <span>or drag and drop them here · up to {MAX_FILES} photos, {MAX_MB} MB each</span>
      </div>

      {files.length > 0 && (
        <ul className={styles.previews}>
          {files.map((f) => (
            <li key={f.id} className={styles.preview}>
              {f.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.preview} alt={f.file.name} />
              ) : (
                <span className={styles.noPreview}>{f.file.name.split('.').pop()?.toUpperCase()}</span>
              )}
              {!busy && (
                <button type="button" onClick={() => removeFile(f.id)} aria-label={`Remove ${f.file.name}`}>
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <label className={styles.consent}>
        <input type="checkbox" name="consent" defaultChecked disabled={busy} />
        <span>I took these photos (or have permission to share them) and I&apos;m happy for MFM Tampa Florida to feature them on the website.</span>
      </label>

      {notice && <p className={styles.notice}>{notice}</p>}
      {status === 'error' && (
        <p className={styles.error} role="alert">
          Something went wrong sending your photos. Please check your connection and try again.
        </p>
      )}

      {busy && (
        <div className={styles.progress} aria-live="polite">
          <div className={styles.progressBar} style={{ width: `${status === 'sending' ? 100 : progress}%` }} />
          <span>{status === 'sending' ? 'Almost done…' : `Uploading photos… ${progress}%`}</span>
        </div>
      )}

      <button type="submit" className={`btn-gold ${styles.submit}`} disabled={busy}>
        {busy ? 'Sending…' : `Send ${files.length > 0 ? files.length : ''} Photo${files.length === 1 ? '' : 's'}`}
      </button>
    </form>
  )
}
