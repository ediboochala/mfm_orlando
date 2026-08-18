'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { CHURCH, NAV_LINKS, FOOTER_EXTRA_LINKS, SOCIAL_LINKS } from '@/data/siteData'
import SocialIcon from './SocialIcon'
import styles from './Footer.module.css'

// Only one icon per platform in the footer — de-duped from SOCIAL_LINKS,
// which lists both the Tampa and HQ YouTube channels separately.
const FOOTER_SOCIALS = SOCIAL_LINKS.filter(
  (s, i, arr) => arr.findIndex(x => x.platform === s.platform) === i
)

const FACEBOOK_LINK = SOCIAL_LINKS.find((s) => s.platform === 'facebook')

const linkByLabel = (label: string) =>
  [...NAV_LINKS, ...FOOTER_EXTRA_LINKS].find((l) => l.label === label)

const EXPLORE_LINKS = ['About', 'Pastor', 'Ministries', 'Services', 'Global Programs']
  .map(linkByLabel)
  .filter((l): l is NonNullable<typeof l> => Boolean(l))

const CONNECT_LINKS = ['Deliverance', 'Blog', 'Media', 'Prayer Line', 'Contact']
  .map(linkByLabel)
  .filter((l): l is NonNullable<typeof l> => Boolean(l))

export default function Footer() {
  const pathname = usePathname()

  const handleGivingClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === '/') {
      document.querySelector('#giving')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = '/#giving'
    }
  }

  return (
    <footer className={styles.footer}>
      {/* ── Stay Connected bar ── */}
      <div className={styles.connectBar}>
        <div className={styles.connectInner}>
          <div className={styles.connectText}>
            <h3>Stay Connected</h3>
            <p>Follow us for announcements, sermon updates, and event invites.</p>
          </div>
          <div className={styles.connectActions}>
            {FACEBOOK_LINK && (
              <a
                href={FACEBOOK_LINK.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.connectBtnPrimary}
              >
                <SocialIcon platform="facebook" size={15} />
                Follow on Facebook
              </a>
            )}
            <Link href="/media" className={styles.connectBtnGhost}>
              Watch Live
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className={styles.main}>
        <div className={styles.mainInner}>

          {/* About / contact column */}
          <div className={styles.colAbout}>
            <div className={styles.brand}>
              <Image
                src="/new Logo mfm.png"
                alt={CHURCH.name}
                width={52}
                height={52}
                className={styles.brandLogo}
              />
              <span className={styles.brandName}>{CHURCH.shortName}</span>
            </div>
            <p className={styles.aboutText}>
              {CHURCH.name}, {CHURCH.location}. Nobody comes here by chance — God brought you here.
            </p>

            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s7-7.1 7-12.5A7 7 0 1 0 5 9.5C5 14.9 12 22 12 22Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                <span>{CHURCH.address}</span>
              </li>
              <li>
                <span className={styles.contactIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.6 19.5 4.5 12.4 4.5 5.5c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <a href={`tel:${CHURCH.phone.replace(/[^+\d]/g, '')}`}>{CHURCH.phone}</a>
              </li>
              <li>
                <span className={styles.contactIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="m4 6.5 8 6.5 8-6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
              </li>
            </ul>

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
                  <SocialIcon platform={s.platform} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div className={styles.colLinks}>
            <h4>Explore</h4>
            <nav>
              {EXPLORE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect column */}
          <div className={styles.colLinks}>
            <h4>Connect</h4>
            <nav>
              {CONNECT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Give + Watch Live column */}
          <div className={styles.colGive}>
            <h4>Give and More</h4>
            <nav>
              <a href="#giving" className={styles.link} onClick={handleGivingClick}>Give Online</a>
              <Link href="/bookshop" className={styles.link}>Bookshop</Link>
              <Link href="/crusade" className={styles.link}>The Crusade</Link>
              <Link href="/gallery" className={styles.link}>Photo Gallery</Link>
            </nav>

            <Link href="/media" className={styles.qrCard}>
              <Image
                src="/footer-live-qr.png"
                alt="QR code linking to MFM Tampa Florida sermons and live schedule"
                width={72}
                height={72}
                className={styles.qrImg}
              />
              <span className={styles.qrText}>
                <strong>Watch Us Live</strong>
                <span>Scan for sermons and our live schedule</span>
              </span>
            </Link>
          </div>

        </div>

        {/* Live visitor counter */}
        <div className={styles.visitorBar}>
          <div className={styles.visitorInner}>
            <span className={styles.visitorLabel}>Visitors From Around the World</span>
            <a
              href="https://info.flagcounter.com/N061"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitorCounter}
              aria-label="View live visitor statistics by country"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://s01.flagcounter.com/count2/N061/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                alt="Flag Counter — live map of countries visiting this site"
              />
            </a>
            <span className={styles.visitorHint}>Updates live as visitors arrive · Tap the flags for full stats</span>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copy}>{CHURCH.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
