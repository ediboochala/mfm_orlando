import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: '404 — Page Not Found | MFM Tampa Florida',
}

export default function NotFound() {
  return (
    <div className={styles.page}>

      <div className={styles.bgGlow} />

      <div className={styles.flameWrap}>
        <svg width="52" height="70" viewBox="0 0 40 56" fill="none" aria-hidden="true">
          <path
            d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
            fill="url(#nfFlame)"
          />
          <defs>
            <linearGradient id="nfFlame" x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%"  stopColor="#FFF9C4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E0217A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A8125A" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className={styles.errorCode} aria-label="404">404</p>

      <div className={styles.divider} aria-hidden="true" />

      <h1 className={styles.heading}>Page Not Found</h1>

      <p className={styles.sub}>
        The page you are looking for may have been moved, renamed, or does not exist.
        Return home and continue seeking the Lord.
      </p>

      <div className={styles.actions}>
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/blog" className="btn-secondary">Read the Blog</Link>
      </div>

      <p className={styles.bottomLabel} aria-hidden="true">
        MFM Tampa Florida
      </p>
    </div>
  )
}
