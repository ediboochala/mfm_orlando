import type { MetadataRoute } from 'next'
import { CHURCH } from '@/data/siteData'

export default function robots(): MetadataRoute.Robots {
  const base = CHURCH.website.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
