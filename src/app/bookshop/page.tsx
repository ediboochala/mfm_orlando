import type { Metadata } from 'next'
import Link from 'next/link'
import { CHURCH, BOOKSHOP } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Bookshop — ${CHURCH.shortName}`,
  description: 'Browse MFM books and prayer resources by Dr. D.K. Olukoya, available through the MFM Tampa Florida Bookstand.',
}

export default function BookshopPage() {
  return (
    <div className={styles.page}>

      {/* ── Back Nav ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Bookshop</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>MFM Bookstand</span>
          <h1 className={styles.heroTitle}>Bookshop &amp; Resources</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Arm yourself with the Word — books and prayer resources by Dr. D.K. Olukoya.
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <p className={styles.intro}>{BOOKSHOP.intro}</p>

          <div className={styles.grid}>
            {BOOKSHOP.books.map((book, i) => (
              <div key={i} className={styles.bookCard}>
                <span className={styles.bookIcon}>📖</span>
                <p className={styles.bookTitle}>{book.title}</p>
                <span className={styles.bookAuthor}>{book.author}</span>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Visit the Bookstand</h3>
            <p className={styles.ctaText}>
              These titles and more are available at the MFM Tampa Florida Bookstand.
              Reach out to check current availability and pricing.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <Link href="/services" className="btn-secondary">Visit a Service</Link>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer Strip ── */}
      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>

    </div>
  )
}
