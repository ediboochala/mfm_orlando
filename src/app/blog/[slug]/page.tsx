import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CHURCH, BLOG_POSTS } from '@/data/siteData'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — ${CHURCH.shortName}`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const postIndex  = BLOG_POSTS.indexOf(post)
  const prevPost   = BLOG_POSTS[postIndex - 1] ?? null
  const nextPost   = BLOG_POSTS[postIndex + 1] ?? null

  return (
    <div className={styles.page}>

      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link href="/blog" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
          <span className={styles.breadcrumb}>{CHURCH.shortName} · {post.category}</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroCategory}>{post.category}</span>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <div className={styles.heroDivider} />
          <div className={styles.heroMeta}>
            <span className={styles.heroDate}>{post.date}</span>
            <span className={styles.heroDot} />
            <span className={styles.heroReadTime}>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* ── Cover Image ── */}
      <div className={styles.coverWrap}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className={styles.coverImage}
        />
      </div>

      {/* ── Article ── */}
      <main className={styles.main}>
        <div className={styles.mainInner}>

          <article className={styles.article}>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.divider} />
            {post.body.map((para, i) => (
              <div key={i}>
                <p className={`${styles.para} ${i === 0 ? styles.paraFirst : ''}`}>
                  {para}
                </p>
                {post.mediaBlocks.filter(m => m.afterParagraph === i).map((media, j) => (
                  <figure key={j} className={styles.mediaFigure}>
                    {media.type === 'image' ? (
                      <div className={styles.mediaImageWrap}>
                        <Image
                          src={media.src}
                          alt={media.alt ?? ''}
                          fill
                          sizes="(max-width: 780px) 100vw, 780px"
                          className={styles.mediaImage}
                        />
                      </div>
                    ) : (
                      <div className={styles.videoWrap}>
                        <iframe
                          src={media.src}
                          title={media.caption ?? 'Video'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    {media.caption && (
                      <figcaption className={styles.mediaCaption}>{media.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ))}
          </article>

          {/* ── Prev / Next ── */}
          {(prevPost || nextPost) && (
            <nav className={styles.postNav}>
              <div className={styles.postNavInner}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className={styles.navItem}>
                    <span className={styles.navDir}>← Previous</span>
                    <span className={styles.navTitle}>{prevPost.title}</span>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className={`${styles.navItem} ${styles.navRight}`}>
                    <span className={styles.navDir}>Next →</span>
                    <span className={styles.navTitle}>{nextPost.title}</span>
                  </Link>
                ) : <div />}
              </div>
            </nav>
          )}

          {/* ── CTA ── */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Join Us in Worship &amp; Prayer</h3>
            <p className={styles.ctaText}>
              Come and experience the God behind these words — in person, in prayer, in power.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/#services" className="btn-primary">View Service Times</Link>
              <Link href="/blog" className="btn-secondary">More Articles</Link>
            </div>
          </div>

        </div>
      </main>

      <footer className={styles.footerStrip}>
        <p>{CHURCH.copyright}</p>
      </footer>
    </div>
  )
}
