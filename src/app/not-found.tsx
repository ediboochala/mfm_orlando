import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | MFM Orlando',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Lato', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(176, 26, 26, 0.14) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Flame SVG */}
      <div style={{
        marginBottom: '32px',
        filter: 'drop-shadow(0 0 24px rgba(229, 57, 53, 0.6))',
        animation: 'flamePulse 2.4s ease-in-out infinite',
      }}>
        <svg width="52" height="70" viewBox="0 0 40 56" fill="none">
          <path
            d="M20 2C20 2 30 14 28 26C34 20 36 12 34 6C40 14 42 26 36 36C32 42 26 46 20 54C14 46 8 42 4 36C-2 26 0 14 6 6C4 12 6 20 12 26C10 14 20 2 20 2Z"
            fill="url(#nfFlame)"
          />
          <defs>
            <linearGradient id="nfFlame" x1="20" y1="2" x2="20" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%"  stopColor="#FFF9C4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E53935" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7A0000" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 404 Number */}
      <p style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(80px, 18vw, 160px)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '8px',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(212, 160, 23, 0.35)',
        margin: '0 0 8px',
        position: 'relative',
        zIndex: 1,
      }}>404</p>

      {/* Divider */}
      <div style={{
        width: '60px',
        height: '2px',
        background: 'linear-gradient(90deg, #D4A017, #B01A1A)',
        margin: '0 auto 28px',
      }} />

      {/* Heading */}
      <h1 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(20px, 4vw, 32px)',
        fontWeight: 700,
        letterSpacing: '3px',
        color: '#fff',
        marginBottom: '16px',
        position: 'relative',
        zIndex: 1,
      }}>
        Page Not Found
      </h1>

      {/* Sub-text */}
      <p style={{
        fontSize: '15px',
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.45)',
        maxWidth: '440px',
        marginBottom: '48px',
        position: 'relative',
        zIndex: 1,
      }}>
        The page you are looking for may have been moved, renamed, or does not exist.
        Return home and continue seeking the Lord.
      </p>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/blog" className="btn-secondary">Read the Blog</Link>
      </div>

      {/* Bottom label */}
      <p style={{
        position: 'absolute',
        bottom: '28px',
        fontFamily: "'Cinzel', serif",
        fontSize: '10px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: 'rgba(212, 160, 23, 0.3)',
      }}>
        MFM Orlando — The Citadel of Solution
      </p>
    </div>
  )
}
