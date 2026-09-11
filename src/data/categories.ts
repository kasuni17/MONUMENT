import { Category } from '@/types'
import { editorialImages } from './images'

/**
 * MONUMENT's eight standing sections plus Science, which began as a series
 * and stayed. Each carries its own photograph: no topic shares an image with
 * another topic or with an article.
 */
export const categories: Category[] = [
  {
    id: 'c1', slug: 'technology', name: 'Technology',
    description: 'Software, the people who build it, and the decisions that never make it into a launch post.',
    image: editorialImages['topic-technology'].src,
    imageAlt: 'A close view of a blue circuit board',
    featured: true,
  },
  {
    id: 'c2', slug: 'design', name: 'Design',
    description: 'Objects, interfaces and rooms, and the thinking behind the things we stop noticing.',
    image: editorialImages['topic-design'].src,
    imageAlt: 'Hands assembling pieces of a puzzle on a work surface',
    featured: true,
  },
  {
    id: 'c3', slug: 'culture', name: 'Culture',
    description: 'What audiences queue for, keep, and quietly stop showing up to.',
    image: editorialImages['topic-culture'].src,
    imageAlt: 'A heavy red theatre curtain',
    featured: true,
  },
  {
    id: 'c4', slug: 'business', name: 'Business',
    description: 'Strategy and economics, reported from inside the companies people actually work in.',
    image: editorialImages['topic-business'].src,
    imageAlt: 'Office towers seen from street level against the sky',
    featured: true,
  },
  {
    id: 'c5', slug: 'lifestyle', name: 'Lifestyle',
    description: 'Small habits, domestic rituals, and what actually holds up on a Tuesday.',
    image: editorialImages['topic-lifestyle'].src,
    imageAlt: 'A potted plant hanging against a pale wall',
    featured: false,
  },
  {
    id: 'c6', slug: 'travel', name: 'Travel',
    description: 'Journeys that change how somebody sees a place, including the one they live in.',
    image: editorialImages['topic-travel'].src,
    imageAlt: 'A road running between two mountain slopes',
    featured: false,
  },
  {
    id: 'c8', slug: 'opinion', name: 'Opinion',
    description: 'Argument and perspective, from writers with a position and a reason for it.',
    image: editorialImages['topic-opinion'].src,
    imageAlt: 'People crossing a wide walkway in a city',
    featured: false,
  },
  {
    id: 'c9', slug: 'architecture', name: 'Architecture',
    description: 'Buildings judged from the pavement up, starting with how they treat the people passing.',
    image: editorialImages['topic-architecture'].src,
    imageAlt: 'Looking up the corner of a modern residential building',
    featured: true,
  },
  {
    id: 'c7', slug: 'science', name: 'Science',
    description: 'Research and method, including the long, unglamorous part between a result and its use.',
    image: editorialImages['topic-science'].src,
    imageAlt: 'A telescope mounted on the side of an observatory building',
    featured: false,
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}
