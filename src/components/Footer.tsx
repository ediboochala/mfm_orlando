'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CHURCH, NAV_LINKS, FOOTER_EXTRA_LINKS, SOCIAL_LINKS } from '@/data/siteData'
import SocialIcon from './SocialIcon'
import styles from './Footer.module.css'

// Only one icon per platform in the footer — de-duped from SOCIAL_LINKS,
// which lists both the Tampa and HQ YouTube channels separately.
const FOOTER_SOCIALS = SOCIAL_LINKS.filter(
  (s, i, arr) => arr.findIndex(x => x.platform === s.platform) === i
)

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoWrap}>
        <Image
          src="/new Logo mfm.png"
          alt="Mountain of Fire and Miracles Ministries"
          width={72}
          height={72}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <p className={styles.copy}>{CHURCH.copyright}</p>
      <nav className={styles.links}>
        {NAV_LINKS.map((link) =>
          link.href.startsWith('#') ? (
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
          ) : (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          )
        )}
        {FOOTER_EXTRA_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.socials}>
        {FOOTER_SOCIALS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            title={s.label}
            aria-label={s.label}
          >
            <SocialIcon platform={s.platform} size={16} />
          </a>
        ))}
      </div>
    </footer>
  )
}
