import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery — MFM Tampa Florida',
  description:
    'Glimpses of worship, prayer, deliverance, and fellowship at MFM Tampa Florida — moments where the power of God was on full display.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
