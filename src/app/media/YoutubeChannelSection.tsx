'use client'

import { useState } from 'react'
import { YOUTUBE_CHANNELS } from '@/data/siteData'
import styles from './page.module.css'

const YT_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

export default function YoutubeChannelSection() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  return (
    <div className={styles.channelsList}>
      {YOUTUBE_CHANNELS.map((ch) => (
        <div key={ch.handle} className={styles.channelGroup}>

          {/* ── Channel header (links to YouTube) ── */}
          <a
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.channelCard} ${ch.featured ? styles.channelFeatured : ''}`}
          >
            {ch.featured && <span className={styles.featuredBadge}>Official HQ</span>}
            <div className={styles.channelIcon}>{YT_ICON}</div>
            <div className={styles.channelInfo}>
              <h3 className={styles.channelName}>{ch.name}</h3>
              <span className={styles.channelHandle}>{ch.handle}</span>
              <p className={styles.channelDesc}>{ch.description}</p>
            </div>
            <span className={styles.channelArrow}>→</span>
          </a>

          {/* ── Video preview strip ── */}
          <div className={styles.videoStrip}>
            {ch.videos.map((video) => {
              const isPlaying = playingId === `${ch.handle}-${video.videoId}`
              const key = `${ch.handle}-${video.videoId}`
              const thumbHq = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
              const thumbFb = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
              const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`

              return (
                <div key={key} className={styles.videoCard}>
                  <div className={styles.videoThumbWrap}>
                    {isPlaying ? (
                      <>
                        <iframe
                          src={embedUrl}
                          className={styles.videoIframe}
                          title={video.title}
                          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          className={styles.videoClose}
                          onClick={() => setPlayingId(null)}
                          aria-label="Close video"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbHq}
                          alt={video.title}
                          className={styles.videoThumb}
                          onError={(e) => { (e.target as HTMLImageElement).src = thumbFb }}
                        />
                        <div className={styles.videoThumbOverlay} />
                        <button
                          className={styles.videoPlayBtn}
                          onClick={() => setPlayingId(key)}
                          aria-label={`Play ${video.title}`}
                        >
                          <span className={styles.videoPlayCircle}>
                            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                  <p className={styles.videoCardTitle}>{video.title}</p>
                </div>
              )
            })}
          </div>

        </div>
      ))}
    </div>
  )
}
