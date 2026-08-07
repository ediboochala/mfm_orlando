'use client'

import { useId } from 'react'

interface MinistryIconProps {
  name: string
  size?: number
}

const FLOWER_PETALS: [number, number][] = [
  [14, 8],
  [19.7, 12],
  [17.5, 19],
  [10.5, 19],
  [8.3, 12],
]

export default function MinistryIcon({ name, size = 32 }: MinistryIconProps) {
  const uid = useId().replace(/:/g, '_')
  const gradientId = `ministryIcon-${uid}`

  const gradientDefs = (
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#800080" />
        <stop offset="55%" stopColor="#E0217A" />
        <stop offset="100%" stopColor="#F2B705" />
      </linearGradient>
    </defs>
  )

  const stroke = `url(#${gradientId})`
  const strokeProps = { stroke, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

  let content: React.ReactNode

  switch (name) {
    case 'sword':
      content = (
        <path
          d="M14 3l9 4v6c0 6-4 10-9 12-5-2-9-6-9-12V7l9-4z"
          {...strokeProps}
        />
      )
      break
    case 'flower':
      content = (
        <>
          {FLOWER_PETALS.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2.8} {...strokeProps} />
          ))}
          <circle cx={14} cy={14} r={2.2} fill={stroke} />
        </>
      )
      break
    case 'sparkle':
      content = (
        <path
          d="M14 3v6M14 19v6M3 14h6M19 14h6M6.5 6.5l4 4M17.5 17.5l4 4M21.5 6.5l-4 4M10.5 17.5l-4 4"
          {...strokeProps}
        />
      )
      break
    case 'flame':
      content = (
        <path
          d="M14 2c0 0 7 7.5 5.5 16.5C24.5 14 27 22 23 29c-3 5-9 8-9 8s-6-3-9-8c-4-7-1.5-15 3-19-1.5 4.5.5 8.5 3.5 10.5C10 16.5 14 2 14 2z"
          fill={stroke}
        />
      )
      break
    case 'music':
      content = (
        <path
          d="M11 24a3 3 0 100-6 3 3 0 000 6zm11-2a3 3 0 100-6 3 3 0 000 6zM11 21V6l11-2v13"
          {...strokeProps}
        />
      )
      break
    case 'ring':
      content = (
        <path
          d="M14 20a6 6 0 100-12 6 6 0 000 12zM14 8l-2-4h4l-2 4z"
          {...strokeProps}
        />
      )
      break
    case 'sprout':
      content = (
        <path
          d="M14 26V13M14 13C14 13 6 13 6 5c8 0 8 8 8 8zm0 0c0-8 8-8 8-8 0 8-8 8-8 8z"
          {...strokeProps}
        />
      )
      break
    case 'heart':
      content = (
        <path
          d="M14 24s-9.5-5.7-9.5-13A5.5 5.5 0 0114 7a5.5 5.5 0 019.5 4c0 7.3-9.5 13-9.5 13z"
          {...strokeProps}
        />
      )
      break
    case 'care':
      content = (
        <>
          <path d="M4 13a10 10 0 0120 0" {...strokeProps} />
          <path d="M4 13c0 4.5 2.2 8 5 10M24 13c0 4.5-2.2 8-5 10" {...strokeProps} />
          <circle cx={14} cy={9} r={2.3} fill={stroke} />
        </>
      )
      break
    case 'pray':
      content = (
        <path
          d="M14 4C10 8 8 13 8 19c0 3 2.5 5 6 6 3.5-1 6-3 6-6 0-6-2-11-6-15z"
          {...strokeProps}
        />
      )
      break
    case 'broadcast':
      content = (
        <>
          <circle cx={14} cy={20} r={1.8} fill={stroke} />
          <path d="M9.5 16.5a7 7 0 019 0" {...strokeProps} />
          <path d="M5.5 12.5a13 13 0 0117 0" {...strokeProps} />
        </>
      )
      break
    default:
      content = <circle cx={14} cy={14} r={6} {...strokeProps} />
  }

  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {gradientDefs}
      {content}
    </svg>
  )
}
