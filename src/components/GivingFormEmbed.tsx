'use client'

import { useEffect, useRef } from 'react'

const EMBED_SRC = 'https://forms.ministryforms.net/embed.aspx?formId=019e20c5-6b38-4718-ab6c-d81b3a9098a6&custom-templates=null'

export default function GivingFormEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    // Guard against React StrictMode's dev-only double-invoke (mount ->
    // cleanup -> mount), which would otherwise insert the embed twice:
    // the first script's async load can still land content after cleanup
    // wipes the container, then the second mount inserts it again.
    if (!container || container.childElementCount > 0) return

    // Insert the script directly into our own container so the embed's
    // self-locating logic (it finds itself by matching its own <script>
    // tag, then inserts the form iframe right after it) places the form
    // here instead of wherever Next.js's <Script> component would put it.
    const script = document.createElement('script')
    script.src = EMBED_SRC
    container.appendChild(script)
  }, [])

  return <div ref={containerRef} />
}
