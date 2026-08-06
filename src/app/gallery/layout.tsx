import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Photo Gallery — MFM Tampa Florida',
  description:
    'Glimpses of worship, prayer, deliverance, and fellowship at MFM Tampa Florida — moments where the power of God was on full display.',
}

// Gallery is temporarily taken down — page code is untouched, just not
// linked from nav and not reachable directly. Remove this redirect (and
// re-add the nav links in siteData.ts) to bring it back.
export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  redirect('/')
  // eslint-disable-next-line no-unreachable
  return <>{children}</>
}
