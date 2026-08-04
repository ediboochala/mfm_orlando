'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { NAV_LINKS, CHURCH } from '@/data/siteData'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHashClick = (hash: string) => {
    setMenuOpen(false)
    if (pathname === '/') {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      router.push(`/${hash}`)
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
        {NAV_LINKS.map((link) =>
          link.href.startsWith('#') ? (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => { e.preventDefault(); handleHashClick(link.href) }}>
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* CTA */}
      <div className={styles.navRight}>
        <a
          href="#giving"
          className={styles.navCta}
        onClick={(e) => { e.preventDefault(); handleHashClick('#giving') }}
      >
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
          {NAV_LINKS.map((link) =>
            link.href.startsWith('#') ? (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={(e) => { e.preventDefault(); handleHashClick(link.href) }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="#giving"
            className={styles.mobileCta}
            onClick={(e) => { e.preventDefault(); handleHashClick('#giving') }}
          >
            Give Online
          </a>
        </div>
      )}
    </nav>
  )
}
