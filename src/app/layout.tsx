import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import './globals.css'

const CustomCursor  = dynamic(() => import('@/components/CustomCursor'),    { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })

export const metadata: Metadata = {
  metadataBase: new URL('https://mfmorlando.org'),
  title: 'MFM Tampa Florida',
  description:
    'Mountain of Fire and Miracles Ministries Tampa, Florida welcomes all individuals seeking God\'s love. Join us for worship, deliverance, and spiritual breakthroughs.',
  keywords: 'MFM Tampa Florida, Mountain of Fire, Miracles Ministries, Church Tampa, Deliverance, Christian Church Florida',
  icons: {
    icon: [{ url: '/new Logo mfm.png', type: 'image/png' }],
    apple: '/new Logo mfm.png',
  },
  openGraph: {
    title: 'MFM Tampa Florida',
    description: 'Mountain of Fire and Miracles Ministries Tampa, Florida — Join us for worship, deliverance, and spiritual breakthroughs.',
    url: 'https://mfmorlando.org',
    siteName: 'MFM Tampa Florida',
    images: [{ url: '/new Logo mfm.png', width: 1507, height: 1563, alt: 'MFM Tampa Florida Logo' }],
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
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
