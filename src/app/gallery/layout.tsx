import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery — MFM Tampa Florida',
  description:
    'Relive the Great Florida Deliverance Crusade and our Church Dedication Service — photo albums from MFM Tampa Florida events.',
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
