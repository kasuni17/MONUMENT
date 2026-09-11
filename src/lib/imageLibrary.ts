import { editorialImages, ImageKey } from '@/data/images'

/**
 * A thin adapter over the editorial picture library for the admin CMS, which
 * needs to suggest an image when an editor creates a post or category without
 * supplying one. The public site never calls this: every published story names
 * its own photograph in the story data, so no two articles can collide.
 *
 * Keys in the library are prefixed by section (`design-…`, `travel-…`), which
 * is all the grouping this needs.
 */
const keys = Object.keys(editorialImages) as ImageKey[]

function poolFor(prefix: string): string[] {
  const matches = keys.filter((key) => key.startsWith(`${prefix}-`))
  return (matches.length ? matches : keys).map((key) => editorialImages[key].src)
}

export const imagePools: Record<string, string[]> = {
  technology: poolFor('tech'),
  design: poolFor('design'),
  culture: poolFor('culture'),
  business: poolFor('business'),
  lifestyle: poolFor('lifestyle'),
  travel: poolFor('travel'),
  science: poolFor('science'),
  opinion: poolFor('opinion'),
  architecture: poolFor('architecture'),
}

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Deterministic suggestion: the same seed always resolves to the same photo. */
export function topicImage(categorySlug: string, seed: string): string {
  const pool = imagePools[categorySlug] ?? imagePools.culture
  return pool[hashString(seed) % pool.length]
}
