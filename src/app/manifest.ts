import type { MetadataRoute } from 'next'
import { CHURCH } from '@/data/siteData'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${CHURCH.name} — ${CHURCH.shortName}`,
    short_name: CHURCH.shortName,
    description:
      "Mountain of Fire and Miracles Ministries Tampa, Florida welcomes all individuals seeking God's love. Join us for worship, deliverance, and spiritual breakthroughs.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F2',
    theme_color: '#800080',
    icons: [
      {
        src: encodeURI('/new Logo mfm.png'),
        sizes: '1507x1563',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: encodeURI('/new Logo mfm.png'),
        sizes: '1507x1563',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
