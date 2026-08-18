import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Montserrat, Playfair_Display } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { CHURCH, SOCIAL_LINKS } from '@/data/siteData'
import './globals.css'

const CustomCursor  = dynamic(() => import('@/components/CustomCursor'),    { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })

// Self-hosted via next/font — no external Google Fonts request, no
// render-blocking @import, automatic font-display: swap and CLS-safe
// fallback metrics. Weights/styles mirror the old @import exactly.
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mfmtampaflorida.org'),
  title: {
    default: 'MFM Tampa Florida',
    template: '%s',
  },
  description:
    'Mountain of Fire and Miracles Ministries Tampa, Florida welcomes all individuals seeking God\'s love. Join us for worship, deliverance, and spiritual breakthroughs.',
  keywords: 'MFM Tampa Florida, Mountain of Fire, Miracles Ministries, Church Tampa, Deliverance, Christian Church Florida',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: [{ url: '/new Logo mfm.png', type: 'image/png' }],
    apple: '/new Logo mfm.png',
  },
  openGraph: {
    title: 'MFM Tampa Florida',
    description: 'Mountain of Fire and Miracles Ministries Tampa, Florida — Join us for worship, deliverance, and spiritual breakthroughs.',
    url: 'https://www.mfmtampaflorida.org',
    siteName: 'MFM Tampa Florida',
    images: [{ url: '/new Logo mfm.png', width: 1507, height: 1563, alt: 'MFM Tampa Florida Logo' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MFM Tampa Florida',
    description: 'Mountain of Fire and Miracles Ministries Tampa, Florida — Join us for worship, deliverance, and spiritual breakthroughs.',
    images: ['/new Logo mfm.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#800080',
  width: 'device-width',
  initialScale: 1,
}

// Church/Organization structured data — helps Google understand this is a
// place of worship with real service times, and can surface a Knowledge
// Panel / rich result with address, phone, and social profiles.
const churchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: CHURCH.name,
  alternateName: CHURCH.shortName,
  url: CHURCH.website,
  logo: encodeURI(`${CHURCH.website}/new Logo mfm.png`),
  image: encodeURI(`${CHURCH.website}/new Logo mfm.png`),
  telephone: CHURCH.phone,
  email: CHURCH.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4618 North Florida Avenue',
    addressLocality: 'Tampa',
    addressRegion: 'FL',
    postalCode: '33603',
    addressCountry: 'US',
  },
  sameAs: SOCIAL_LINKS.map((s) => s.href),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfairDisplay.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
        <CustomCursor />
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
