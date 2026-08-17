import type { MetadataRoute } from 'next'
import { CHURCH, BLOG_POSTS } from '@/data/siteData'

// Gallery is intentionally excluded — it currently 302-redirects to "/"
// (see src/app/gallery/layout.tsx) and shouldn't be offered to crawlers.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                 priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/about',           priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pastor',          priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ministries',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services',        priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/deliverance',     priority: 0.8, changeFrequency: 'monthly' },
  { path: '/crusade',         priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/global-programs', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog',            priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/media',           priority: 0.6, changeFrequency: 'weekly'  },
  { path: '/prayer-line',     priority: 0.7, changeFrequency: 'monthly' },
  { path: '/bookshop',        priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact',         priority: 0.6, changeFrequency: 'yearly'  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CHURCH.website.replace(/\/$/, '')
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries]
}
