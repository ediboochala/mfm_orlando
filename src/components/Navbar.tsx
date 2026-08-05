'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV_GROUPS, CHURCH, type NavEntry, type NavGroup } from '@/data/siteData'
import styles from './Navbar.module.css'

function isGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile accordion whenever the menu itself closes
  useEffect(() => {
    if (!menuOpen) setOpenGroup(null)
  }, [menuOpen])

  const handleGivingClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname === '/') {
      document.querySelector('#giving')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = '/#giving'
    }
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        <div className={styles.logoImg}>
          <Image src="/mfm-logo.png" alt="MFM Logo" width={52} height={52} />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>{CHURCH.shortName}</span>
        </div>
      </Link>

      {/* Desktop Nav Links */}
      <ul className={styles.navLinks}>
        {NAV_GROUPS.map((item) =>
          isGroup(item) ? (
            <li key={item.label} className={styles.navGroup}>
              <button type="button" className={styles.navGroupTrigger}>
                {item.label}
                <svg className={styles.chevronIcon} width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden>
                  <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className={styles.dropdown}>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href}>{child.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          )
        )}
      </ul>

      {/* CTA */}
      <div className={styles.navRight}>
        <Link href="/deliverance" className={styles.deliveranceCta}>
          Need Deliverance?
        </Link>
        <a href="#giving" className={styles.navCta} onClick={handleGivingClick}>
          Give Online
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_GROUPS.map((item) =>
            isGroup(item) ? (
              <div key={item.label} className={styles.mobileGroup}>
                <button
                  type="button"
                  className={styles.mobileGroupTrigger}
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                  aria-expanded={openGroup === item.label}
                >
                  {item.label}
                  <svg
                    className={`${styles.chevronIcon} ${openGroup === item.label ? styles.chevronOpen : ''}`}
                    width="11" height="7" viewBox="0 0 9 6" fill="none" aria-hidden
                  >
                    <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openGroup === item.label && (
                  <div className={styles.mobileSubLinks}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.mobileSubLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/deliverance"
            className={styles.mobileDeliveranceCta}
            onClick={() => setMenuOpen(false)}
          >
            Need Deliverance?
          </Link>
          <a href="#giving" className={styles.mobileCta} onClick={handleGivingClick}>
            Give Online
          </a>
        </div>
      )}
    </nav>
  )
}
