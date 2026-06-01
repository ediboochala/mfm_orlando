import { CHURCH, NAV_LINKS } from '@/data/siteData'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoWrap}>
        <img src="/mfm-logo.png" alt="Mountain of Fire and Miracles Ministries" width={72} height={72} />
      </div>
      <p className={styles.copy}>{CHURCH.copyright}</p>
      <nav className={styles.links}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
