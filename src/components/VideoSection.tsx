'use client'

import { useState } from 'react'
import { FEATURED_VIDEOS } from '@/data/siteData'
import styles from './VideoSection.module.css'

export default function VideoSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Watch and Be Blessed</span>
          <h2 className={styles.title}>Featured Messages</h2>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Spirit-filled teachings, prayers, and worship from MFM Ministries.
            Hover a card to watch — or visit the channel for the full library.
          </p>
        </div>

        {/* Video cards */}
        <div className={styles.cards}>
          {FEATURED_VIDEOS.map((video, i) => {
            const isHovered = hovered === i
            const thumbUrl = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
            const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`

            return (
              <div
                key={i}
                className={`${styles.card} ${isHovered ? styles.cardExpanded : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Video area */}
                <div className={styles.videoWrap}>
                  {isHovered ? (
                    <iframe
                      className={styles.iframe}
                      src={embedUrl}
                      title={video.title}
                      allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {/* Thumbnail */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbUrl}
                        alt={video.title}
                        className={styles.thumb}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                      {/* Dark overlay */}
                      <div className={styles.thumbOverlay} />
                      {/* Play button */}
                      <div className={styles.playBtn}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>

                {/* Card info */}
                <div className={styles.info}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.videoDesc}>{video.desc}</p>
                  <a
                    href={video.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Watch on YouTube
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Channel CTA */}
        <div className={styles.cta}>
          <a
            href="https://www.youtube.com/@MFMMinistries"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ flexShrink: 0 }}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Visit MFM Ministries on YouTube
          </a>
        </div>

      </div>
    </section>
  )
}
