import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
          <h1 className={styles.heroTitle}>Bookshop and Resources</h1>
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
            {BOOKSHOP.books.map((book, i) => {
              const content = book.cover ? (
                <>
                  <Image
                    src={book.cover}
                    alt={`${book.title} cover`}
                    fill
                    sizes="(max-width: 420px) 45vw, (max-width: 1024px) 30vw, 190px"
                    className={styles.bookCoverImg}
                  />
                  <span className={styles.coverScrim} />
                  {book.price && <span className={styles.bookPrice}>{book.price}</span>}
                  {book.href && <span className={styles.bookLinkTagOnCover}>View E-Book →</span>}
                </>
              ) : (
                <>
                  <span className={styles.bookIcon}>📖</span>
                  {book.price && <span className={styles.bookPrice}>{book.price}</span>}
                  <p className={styles.bookTitle}>{book.title}</p>
                  <span className={styles.bookAuthor}>{book.author}</span>
                  {book.href && <span className={styles.bookLinkTag}>View E-Book →</span>}
                </>
              )
              return book.href ? (
                <a
                  key={i}
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.bookCard} ${styles.bookCardLink} ${book.cover ? styles.bookCardCover : ''}`}
                >
                  {content}
                </a>
              ) : (
                <div key={i} className={styles.bookCard}>
                  {content}
                </div>
              )
            })}
          </div>

          <div className={styles.moreBooksWrap}>
            <a
              href={BOOKSHOP.moreBooksHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary ${styles.moreBooksBtn}`}
            >
              View More Books on DKO eBooks →
            </a>
          </div>

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Visit the Bookstand</h3>
            <p className={styles.ctaText}>
              More titles are available.
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
