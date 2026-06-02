'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './PageHeroWatermark.module.css'

const IMAGES = [
  '/22 (1).jpg',
  '/22 (2).jpg',
  '/22 (3).jpg',
  '/22 (4).jpg',
]

export default function PageHeroWatermark() {
  const [src, setSrc] = useState<string | null>(null)

  // Pick random image on client only to avoid SSR mismatch
  useEffect(() => {
    setSrc(IMAGES[Math.floor(Math.random() * IMAGES.length)])
  }, [])

  if (!src) return null

  return (
    <div className={styles.wrap} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
      />
    </div>
  )
}
