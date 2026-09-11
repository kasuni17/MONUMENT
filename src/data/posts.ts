import { Post, ContentBlock } from '@/types'
import { editorialImages } from './images'
import { estimateReadingTime } from '@/lib/utils'
import { Story } from './stories/types'
import { technologyStories } from './stories/technology'
import { businessStories } from './stories/business'
import { designStories } from './stories/design'
import { cultureStories } from './stories/culture'
import { lifestyleStories } from './stories/lifestyle'
import { travelStories } from './stories/travel'
import { opinionStories } from './stories/opinion'
import { architectureStories } from './stories/architecture'
import { scienceStories } from './stories/science'

const allStories: Story[] = [
  ...technologyStories,
  ...businessStories,
  ...designStories,
  ...cultureStories,
  ...lifestyleStories,
  ...travelStories,
  ...opinionStories,
  ...architectureStories,
  ...scienceStories,
]

/**
 * Turns an editorial story into the block sequence the article page renders.
 *
 * The order varies with the material rather than following one template: the
 * inline photograph lands after the opening section, the pull quote after the
 * section that earns it, and the list only appears if the writer supplied one.
 */
function buildContent(story: Story): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const quoteAfter = story.sections.length > 2 ? 1 : 0

  story.sections.forEach((section, index) => {
    if (section.heading) blocks.push({ type: 'heading', text: section.heading, level: 2 })
    section.paragraphs.forEach((text) => blocks.push({ type: 'paragraph', text }))

    if (index === 0 && story.inlineImageKey) {
      blocks.push({
        type: 'image',
        src: editorialImages[story.inlineImageKey].src,
        alt: story.inlineImageAlt ?? story.imageAlt,
        caption: story.inlineCaption,
      })
    }

    if (index === quoteAfter) {
      blocks.push({ type: 'quote', text: story.quote.text, attribution: story.quote.attribution })
    }
  })

  if (story.list) {
    blocks.push({ type: 'heading', text: story.list.title, level: 2 })
    blocks.push({ type: 'list', style: story.list.style ?? 'bullet', items: story.list.items })
  }

  if (story.callout) blocks.push({ type: 'callout', text: story.callout, tone: 'note' })

  blocks.push({ type: 'divider' })
  blocks.push({ type: 'paragraph', text: story.closing })

  return blocks
}

function wordCount(story: Story): number {
  const parts = [
    story.excerpt,
    ...story.sections.flatMap((s) => [s.heading ?? '', ...s.paragraphs]),
    story.quote.text,
    story.callout ?? '',
    story.closing,
    ...(story.list?.items ?? []),
  ]
  return parts.join(' ').trim().split(/\s+/).length
}

const now = new Date()

function publishedDate(daysAgo: number): Date {
  const date = new Date(now)
  date.setDate(date.getDate() - daysAgo)
  date.setHours(9, 0, 0, 0)
  return date
}

export const posts: Post[] = allStories.map((story, i) => {
  const date = publishedDate(story.daysAgo)
  return {
    id: `p${i + 1}`,
    slug: story.slug,
    title: story.title,
    subtitle: story.subtitle,
    excerpt: story.excerpt,
    content: buildContent(story),
    image: editorialImages[story.imageKey].src,
    imageAlt: story.imageAlt,
    categoryId: story.categoryId,
    tagIds: story.tagIds,
    authorId: story.authorId,
    status: 'published',
    featured: !!story.featured,
    editorsPick: !!story.editorsPick,
    publishedAt: date.toISOString(),
    updatedAt: date.toISOString(),
    readingTime: estimateReadingTime(wordCount(story)),
    views: story.views,
    seoTitle: story.title,
    seoDescription: story.excerpt,
  }
})

/** Workflow states for the admin CMS. Nothing here appears on the public site. */
export const draftPosts: Post[] = [
  {
    id: 'd1', slug: 'the-next-wave-of-ambient-computing', title: 'The next wave of ambient computing',
    subtitle: 'Interfaces that are barely there',
    excerpt: 'Computing is spreading into rooms that were never designed to hold a screen. A first look at what that does to the idea of an interface.',
    content: buildContent(technologyStories[2]),
    image: editorialImages['design-colour-swatches'].src,
    imageAlt: 'Paint swatches and coloured pencils arranged on a wooden table',
    categoryId: 'c1', tagIds: ['t1', 't3'], authorId: 'a1', status: 'draft', featured: false, editorsPick: false,
    publishedAt: now.toISOString(), updatedAt: now.toISOString(), readingTime: 6, views: 0,
  },
  {
    id: 'd2', slug: 'a-quieter-approach-to-brand-identity', title: 'A quieter approach to brand identity',
    subtitle: 'Restraint as a competitive advantage',
    excerpt: 'Why several of the most durable brands of the last decade are the ones saying the least, and what that costs internally.',
    content: buildContent(designStories[4]),
    image: editorialImages['business-handshake'].src,
    imageAlt: 'Two people in conversation at a table during the day',
    categoryId: 'c2', tagIds: ['t9'], authorId: 'a2', status: 'scheduled', featured: false, editorsPick: false,
    publishedAt: new Date(now.getTime() + 3 * 86400000).toISOString(), updatedAt: now.toISOString(), readingTime: 5, views: 0,
  },
  {
    id: 'd3', slug: 'the-archive-of-things-we-almost-published', title: 'The archive of things we almost published',
    subtitle: 'Notes from the cutting room floor',
    excerpt: 'A running and occasionally embarrassing list of stories that did not survive a first draft, and what killed each one.',
    content: buildContent(cultureStories[3]),
    image: editorialImages['portrait-editor-desk'].src,
    imageAlt: 'An old typewriter on a desk beside a lamp',
    categoryId: 'c3', tagIds: ['t14'], authorId: 'a10', status: 'archived', featured: false, editorsPick: false,
    publishedAt: new Date(now.getTime() - 200 * 86400000).toISOString(),
    updatedAt: new Date(now.getTime() - 190 * 86400000).toISOString(), readingTime: 4, views: 120,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostById(id: string): Post | undefined {
  return [...posts, ...draftPosts].find((p) => p.id === id)
}

export function getPublishedPosts(): Post[] {
  return posts
    .filter((p) => p.status === 'published')
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
}

export function getPostsByCategory(categoryId: string): Post[] {
  return getPublishedPosts().filter((p) => p.categoryId === categoryId)
}

export function getPostsByAuthor(authorId: string): Post[] {
  return getPublishedPosts().filter((p) => p.authorId === authorId)
}

export function getPostsByTag(tagId: string): Post[] {
  return getPublishedPosts().filter((p) => p.tagIds.includes(tagId))
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const pool = getPublishedPosts().filter((p) => p.id !== post.id)
  const sameCategory = pool.filter((p) => p.categoryId === post.categoryId)
  const sharedTag = pool.filter(
    (p) => p.categoryId !== post.categoryId && p.tagIds.some((t) => post.tagIds.includes(t))
  )
  return [...sameCategory, ...sharedTag].slice(0, limit)
}

export function getTrendingPosts(limit = 5): Post[] {
  const week = 7 * 86400000
  return [...getPublishedPosts()]
    .sort((a, b) => {
      const boost = (p: Post) => (Date.now() - +new Date(p.publishedAt) < week ? 5000 : 0)
      return b.views + boost(b) - (a.views + boost(a))
    })
    .slice(0, limit)
}
