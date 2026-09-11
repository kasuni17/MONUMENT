import { ImageKey } from '../images'

export interface StorySection {
  /** Optional subhead. The opening section usually runs without one. */
  heading?: string
  paragraphs: string[]
}

export interface StoryList {
  title: string
  items: string[]
  style?: 'bullet' | 'number'
}

/**
 * The editorial shape of a story, kept separate from the `Post` record the
 * UI consumes. Writers fill this in; `buildPosts` turns it into content
 * blocks, reading time, dates and the rest.
 */
export interface Story {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  categoryId: string
  authorId: string
  tagIds: string[]
  /** Days before today, so the archive always looks freshly published. */
  daysAgo: number
  views: number
  featured?: boolean
  editorsPick?: boolean
  imageKey: ImageKey
  imageAlt: string
  inlineImageKey?: ImageKey
  inlineImageAlt?: string
  inlineCaption?: string
  sections: StorySection[]
  quote: { text: string; attribution?: string }
  list?: StoryList
  callout?: string
  closing: string
}
