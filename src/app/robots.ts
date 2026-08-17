import type { MetadataRoute } from 'next'
import { CHURCH } from '@/data/siteData'

export default function robots(): MetadataRoute.Robots {
  const base = CHURCH.website.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Gallery currently redirects to "/" — keep crawlers from wasting
      // budget on it while it's disabled.
      disallow: '/gallery',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
