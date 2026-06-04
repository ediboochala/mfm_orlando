import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery — MFM Orlando',
  description:
    'Glimpses of worship, prayer, deliverance, and fellowship at MFM Orlando — moments where the power of God was on full display.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
