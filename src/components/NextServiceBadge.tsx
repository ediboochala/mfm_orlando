'use client'

import { useEffect, useState } from 'react'
import { getNextService, formatNextServiceDateTime, type NextService } from '@/lib/nextService'
import styles from './HeroSection.module.css'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function diffToCountdown(msRemaining: number): Countdown {
  const clamped = Math.max(0, msRemaining)
  const totalSeconds = Math.floor(clamped / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export default function NextServiceBadge() {
  const [next, setNext] = useState<NextService | null>(null)
  const [countdown, setCountdown] = useState<Countdown | null>(null)

  useEffect(() => {
    let current = getNextService(new Date())
    setNext(current)

    const tick = () => {
      const now = Date.now()
      if (!current || now >= current.timestamp) {
        current = getNextService(new Date(now))
        setNext(current)
      }
      if (current) {
        setCountdown(diffToCountdown(current.timestamp - now))
      }
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!next) return null

  return (
    <div className={styles.nextServiceWrap}>
      <span className={styles.nextServiceLabel}>Next Up</span>
      <p className={styles.nextServiceName}>{next.name}</p>
      <p className={styles.nextServiceDate}>{formatNextServiceDateTime(next)}</p>
      {countdown && (
        <div className={styles.countdown} role="timer" aria-label="Countdown to next service">
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hrs' },
            { value: countdown.minutes, label: 'Min' },
            { value: countdown.seconds, label: 'Sec' },
          ].map((unit) => (
            <div key={unit.label} className={styles.countdownUnit}>
              <span className={styles.countdownValue}>{String(unit.value).padStart(2, '0')}</span>
              <span className={styles.countdownLabel}>{unit.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
