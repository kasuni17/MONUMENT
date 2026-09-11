import { useEffect } from 'react'

interface SeoOptions {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeo({ title, description, image, type = 'website' }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes('MONUMENT') ? title : `${title}, MONUMENT`
    document.title = fullTitle
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:type', type)
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', fullTitle)
    if (image) {
      setMeta('property', 'og:image', image)
      setMeta('name', 'twitter:image', image)
    }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.href)
  }, [title, description, image, type])
}
