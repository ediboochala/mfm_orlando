export type SocialPlatform = 'youtube' | 'facebook' | 'instagram'

interface SocialIconProps {
  platform: SocialPlatform
  size?: number
}

export default function SocialIcon({ platform, size = 18 }: SocialIconProps) {
  switch (platform) {
    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23 12s0-3.5-.45-5.15a2.9 2.9 0 0 0-2.05-2.05C18.85 4.35 12 4.35 12 4.35s-6.85 0-8.5.45a2.9 2.9 0 0 0-2.05 2.05C1 8.5 1 12 1 12s0 3.5.45 5.15a2.9 2.9 0 0 0 2.05 2.05c1.65.45 8.5.45 8.5.45s6.85 0 8.5-.45a2.9 2.9 0 0 0 2.05-2.05C23 15.5 23 12 23 12Z"
            fill="currentColor"
          />
          <path d="M9.75 15.5v-7l6 3.5-6 3.5Z" fill="var(--icon-bg, #fff)" />
        </svg>
      )
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24 12a12 12 0 1 0-13.88 11.86v-8.39H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.92-1.96 1.87V12h3.33l-.53 3.47h-2.8v8.39A12 12 0 0 0 24 12Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}
