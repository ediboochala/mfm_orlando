'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
        <div className={styles.logoFlame}>
          <svg viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
              fill="url(#navFlame)"
            />
            <defs>
              <linearGradient id="navFlame" x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="30%" stopColor="#FDD835" />
                <stop offset="65%" stopColor="#E53935" />
                <stop offset="100%" stopColor="#7A0000" />
              </linearGradient>
            </defs>
          </svg>
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
