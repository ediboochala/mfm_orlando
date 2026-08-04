'use client'

import { useEffect, useState } from 'react'
import { getNextService, formatNextService } from '@/lib/nextService'
import styles from './HeroSection.module.css'

export default function NextServiceBadge() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const next = getNextService(new Date())
    if (next) setLabel(formatNextService(next))
  }, [])

  if (!label) return null

  return <p className={styles.nextService}>{label}</p>
}
