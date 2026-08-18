import { CHURCH } from '@/data/siteData'

interface Crumb {
  name: string
  /** Path relative to the site root, e.g. "/about". Use "/" for Home. */
  path: string
}

/** Renders BreadcrumbList structured data (schema.org) for a page. Google
 *  uses this to understand site hierarchy and can show it in place of a
 *  raw URL in search results. Always include "Home" as the first crumb. */
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const base = CHURCH.website.replace(/\/$/, '')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${base}${item.path === '/' ? '' : item.path}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
