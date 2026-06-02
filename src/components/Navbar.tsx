'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS, CHURCH } from '@/data/siteData'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      {/* Logo */}
      <a href="#" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className={styles.logoImg}>
          <Image src="/mfm-logo.png" alt="MFM Logo" width={52} height={52} />
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>{CHURCH.shortName}</span>
          <span className={styles.logoTagline}>{CHURCH.tagline}</span>
        </div>
      </a>

      {/* Desktop Nav Links */}
      <ul className={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#giving"
        className={styles.navCta}
        onClick={(e) => { e.preventDefault(); handleNavClick('#giving') }}
      >
        Give Online
      </a>

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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#giving"
            className={styles.mobileCta}
            onClick={(e) => { e.preventDefault(); handleNavClick('#giving') }}
          >
            Give Online
          </a>
        </div>
      )}
    </nav>
  )
}
