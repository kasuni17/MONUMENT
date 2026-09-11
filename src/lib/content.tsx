import { createContext, useContext, ReactNode } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { Post, Category, Tag, Author, Comment, MediaAsset, AdminUser, NewsletterSubscriber } from '@/types'
import { posts as seedPosts, draftPosts } from '@/data/posts'
import { categories as seedCategories } from '@/data/categories'
import { tags as seedTags } from '@/data/tags'
import { authors as seedAuthors } from '@/data/authors'
import { comments as seedComments } from '@/data/comments'
import { media as seedMedia, users as seedUsers, newsletterSubscribers as seedSubscribers } from '@/data/media'

const allSeedPosts = [...seedPosts, ...draftPosts]

interface ContentContextValue {
  posts: ReturnType<typeof useCollection<Post>>
  categories: ReturnType<typeof useCollection<Category>>
  tags: ReturnType<typeof useCollection<Tag>>
  authors: ReturnType<typeof useCollection<Author>>
  comments: ReturnType<typeof useCollection<Comment>>
  media: ReturnType<typeof useCollection<MediaAsset>>
  users: ReturnType<typeof useCollection<AdminUser>>
  subscribers: ReturnType<typeof useCollection<NewsletterSubscriber & { id: string }>>
}

const ContentContext = createContext<ContentContextValue | null>(null)

/**
 * Holds all "editorial" data for the session in plain React state, seeded
 * from the static data files under src/data/. There is no persistence layer
 *, every add/update/remove call here is an in-memory state change that is
 * lost on refresh, exactly like the rest of MONUMENT's frontend-only demo
 * architecture. See README.md > Frontend-only Architecture.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const posts = useCollection<Post>(allSeedPosts)
  const categories = useCollection<Category>(seedCategories)
  const tags = useCollection<Tag>(seedTags)
  const authors = useCollection<Author>(seedAuthors)
  const comments = useCollection<Comment>(seedComments)
  const media = useCollection<MediaAsset>(seedMedia)
  const users = useCollection<AdminUser>(seedUsers)
  const subscribers = useCollection<NewsletterSubscriber & { id: string }>(
    seedSubscribers.map((s) => ({ ...s, id: s.email }))
  )

  return (
    <ContentContext.Provider value={{ posts, categories, tags, authors, comments, media, users, subscribers }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}

// Convenience selectors built on top of the live collections.
export function usePublishedPosts(): Post[] {
  const { posts } = useContent()
  return posts.items.filter((p) => p.status === 'published').sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
}
