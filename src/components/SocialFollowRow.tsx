import { SOCIAL_LINKS } from '@/data/siteData'
import SocialIcon from './SocialIcon'
import styles from './SocialFollowRow.module.css'

// MFM Tampa's own channels only (skips the HQ YouTube entry). Styled for dark backgrounds.
const TAMPA_SOCIALS = SOCIAL_LINKS.filter((s) => s.label !== 'YouTube (MFM HQ)')

const NAMES = { youtube: 'YouTube', facebook: 'Facebook', instagram: 'Instagram' } as const

export default function SocialFollowRow({ label = 'Follow MFM Tampa' }: { label?: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <div className={styles.links}>
        {TAMPA_SOCIALS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.link} ${styles[s.platform]}`}
          >
            <SocialIcon platform={s.platform} size={16} />
            {NAMES[s.platform]}
          </a>
        ))}
      </div>
    </div>
  )
}
