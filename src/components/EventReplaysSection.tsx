'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EVENT_REPLAYS } from '@/data/siteData'
import SocialFollowRow from './SocialFollowRow'
import styles from './EventReplaysSection.module.css'

export default function EventReplaysSection() {
  // The YouTube player only loads once a card is clicked — keeps the homepage light
  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.label}>Watch the Replays</span>
          <h2 className={styles.title}>
            Relive the <em>Moments</em>
          </h2>
          <div className={styles.divider} />
          <p className={styles.sub}>
            Missed it, or want to experience it again? Watch the full Great Florida Deliverance Crusade
            and the Dedication Ceremony of MFM Tampa right here.
          </p>
        </div>

        <div className={styles.cards}>
          {EVENT_REPLAYS.map((video, i) => {
            const isPlaying = playing === video.videoId
            return (
              <article
                key={video.videoId}
                className={`${styles.card} reveal`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className={styles.frame}>
                  {isPlaying ? (
                    <iframe
                      className={styles.iframe}
                      src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title={video.title}
                      allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      className={styles.poster}
                      onClick={() => setPlaying(video.videoId)}
                      aria-label={`Play video: ${video.title}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`}
                        alt=""
                        className={styles.thumb}
                        loading="lazy"
                      />
                      <span className={styles.shade} />
                      <span className={styles.badge}>{video.badge}</span>
                      <span className={styles.play}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span className={styles.watchHint}>Click to watch</span>
                    </button>
                  )}
                </div>

                <div className={styles.info}>
                  <span className={styles.date}>{video.date}</span>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.desc}>{video.desc}</p>
                  <div className={styles.actions}>
                    {!isPlaying && (
                      <button type="button" className={styles.primaryBtn} onClick={() => setPlaying(video.videoId)}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Now
                      </button>
                    )}
                    <Link href="/gallery" className={styles.linkBtn}>View Photos</Link>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkBtn}
                    >
                      Open on YouTube ↗
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className={`${styles.follow} reveal`}>
          <SocialFollowRow label="Never miss a service, follow MFM Tampa" />
        </div>
      </div>
    </section>
  )
}
