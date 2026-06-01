import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MFM Orlando — The Citadel of Solution',
  description:
    'Mountain of Fire and Miracles Ministries Orlando welcomes all individuals seeking God\'s love. Join us for worship, deliverance, and spiritual breakthroughs.',
  keywords: 'MFM Orlando, Mountain of Fire, Miracles Ministries, Church Orlando, Deliverance, Christian Church Florida',
  icons: {
    icon: [{ url: '/mfm-logo.svg', type: 'image/svg+xml' }],
    apple: '/mfm-logo.svg',
  },
  openGraph: {
    title: 'MFM Orlando — The Citadel of Solution',
    description: 'Mountain of Fire and Miracles Ministries Orlando — Join us for worship, deliverance, and spiritual breakthroughs.',
    url: 'https://mfmorlando.org',
    siteName: 'MFM Orlando',
    images: [{ url: '/mfm-logo.svg', width: 500, height: 500, alt: 'MFM Orlando Logo' }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
