export type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived'

export interface Author {
  id: string
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
  email: string
  location: string
  specialties: string[]
  twitter?: string
  linkedin?: string
  website?: string
  status: 'active' | 'inactive'
}

export interface Category {
  id: string
  slug: string
  name: string
  /** One-line editorial promise, used on topic cards and section headers. */
  description: string
  image: string
  imageAlt: string
  featured: boolean
}

export interface Tag {
  id: string
  slug: string
  name: string
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level: 2 | 3 }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; style: 'bullet' | 'number'; items: string[] }
  | { type: 'code'; code: string; language?: string }
  | { type: 'divider' }
  | { type: 'callout'; text: string; tone?: 'note' | 'warning' }

export interface Post {
  id: string
  slug: string
  title: string
  subtitle: string
  excerpt: string
  content: ContentBlock[]
  image: string
  imageAlt: string
  categoryId: string
  tagIds: string[]
  authorId: string
  status: PostStatus
  featured: boolean
  /** Hand-picked by the editors, used for the curated homepage rail. */
  editorsPick: boolean
  publishedAt: string
  updatedAt: string
  readingTime: number
  views: number
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
}

export interface Comment {
  id: string
  postId: string
  authorName: string
  authorEmail: string
  text: string
  date: string
  status: 'pending' | 'approved' | 'hidden'
  parentId?: string
}

export interface NewsletterSubscriber {
  email: string
  subscribedAt: string
  status: 'subscribed' | 'unsubscribed'
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'contributor'
  status: 'active' | 'invited'
}

export interface MediaAsset {
  id: string
  name: string
  url: string
  width: number
  height: number
  type: string
  size: string
  uploadedAt: string
}
