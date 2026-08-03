import { Fragment } from 'react'
import { CHURCH } from '@/data/siteData'

export function highlightOrgName(text: string) {
  const parts = text.split(CHURCH.name)
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="org-name">{CHURCH.name}</span>}
    </Fragment>
  ))
}
