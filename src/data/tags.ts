import { Tag } from '@/types'
import { slugify } from '@/lib/utils'

/**
 * Order matters: tag ids are positional (t1, t2, ...) and are referenced by
 * story data, so new tags are appended rather than inserted.
 */
const names = [
  'AI', 'Startups', 'Product', 'Developer Tools', 'Privacy', 'Automation',
  'Architecture', 'Typography', 'Branding', 'Interiors', 'Craft',
  'Cities', 'Subcultures', 'Media', 'Language', 'Rituals',
  'Leadership', 'Remote Work', 'Economics', 'Retail', 'Strategy',
  'Mornings', 'Minimalism', 'Wellness', 'Food', 'Slow Living',
  'Solo Travel', 'Road Trips', 'Sustainability', 'Climate',
  'Space', 'Biology', 'Psychology', 'Future', 'Attention', 'Ambition', 'Independent Media',
  'Public Space', 'Housing', 'Cinema', 'Books', 'Music', 'Money', 'Habits', 'Materials', 'Photography',
]

export const tags: Tag[] = names.map((name, i) => ({
  id: `t${i + 1}`,
  slug: slugify(name),
  name,
}))

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug)
}

export function getTagById(id: string): Tag | undefined {
  return tags.find((t) => t.id === id)
}
