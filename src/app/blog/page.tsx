import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CHURCH, BLOG_POSTS } from '@/data/siteData'
import PageHeroWatermark from '@/components/PageHeroWatermark'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: `Blog — ${CHURCH.shortName}`,
  description: 'Articles, teachings, and devotionals from Mountain of Fire and Miracles Ministries Tampa, Florida on prayer, deliverance, holiness, and end-time living.',
}

export default function BlogPage() {
  return (
    <div className={styles.page}>

      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
          <span className={styles.breadcrumb}>{CHURCH.shortName} · Blog</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <PageHeroWatermark />
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Word and Wisdom</span>
          <h1 className={styles.heroTitle}>The MFM Blog</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Teachings, devotionals, and fire-filled articles to build your faith,<br />
            sharpen your prayer life, and prepare you for the Lord&apos;s return.
          </p>
        </div>
      </header>

      {/* ── Posts Grid ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <div className={styles.postsGrid}>
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCard}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.postTop}>
                    <span className={styles.postCategory}>{post.category}</span>
                    <span className={styles.postReadTime}>{post.readTime}</span>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.postDate}>{post.date}</span>
                    <span className={styles.postCta}>Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>
    </div>
  )
}
