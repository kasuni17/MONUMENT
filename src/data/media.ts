import { MediaAsset } from '@/types'
import { editorialImages } from './images'
import { posts } from './posts'

export const media: MediaAsset[] = posts.slice(0, 16).map((post, i) => ({
  id: `m${i + 1}`,
  name: `${post.slug}.jpg`,
  url: post.image,
  width: 1600,
  height: 1000,
  type: 'image/jpeg',
  size: `${(180 + i * 12) % 420 + 90} KB`,
  uploadedAt: post.publishedAt,
})).concat([
  { id: 'm17', name: 'brand-mark-primary.jpg', url: editorialImages['design-colour-swatches'].src, width: 1600, height: 1067, type: 'image/jpeg', size: '198 KB', uploadedAt: new Date().toISOString() },
  { id: 'm18', name: 'homepage-hero-fallback.jpg', url: editorialImages['portrait-city-window'].src, width: 1600, height: 1067, type: 'image/jpeg', size: '256 KB', uploadedAt: new Date().toISOString() },
])

export const users = [
  { id: 'u1', name: 'Julia Hartmann', email: 'julia@monument.pub', role: 'admin' as const, status: 'active' as const },
  { id: 'u2', name: 'Mira Solberg', email: 'mira@monument.pub', role: 'editor' as const, status: 'active' as const },
  { id: 'u3', name: 'Daniel Oyelaran', email: 'daniel@monument.pub', role: 'editor' as const, status: 'active' as const },
  { id: 'u4', name: 'Kenji Watanabe', email: 'kenji@monument.pub', role: 'contributor' as const, status: 'active' as const },
  { id: 'u5', name: 'Priya Nair', email: 'priya@monument.pub', role: 'contributor' as const, status: 'invited' as const },
  { id: 'u6', name: 'Nadia Silva', email: 'nadia@monument.pub', role: 'editor' as const, status: 'active' as const },
  { id: 'u7', name: 'Leah Morgan', email: 'leah@monument.pub', role: 'contributor' as const, status: 'active' as const },
  { id: 'u8', name: 'Oliver Grant', email: 'oliver@monument.pub', role: 'contributor' as const, status: 'invited' as const },
]

export const newsletterSubscribers = Array.from({ length: 24 }).map((_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i * 5 - 3)
  return {
    email: `reader${i + 1}@example.com`,
    subscribedAt: date.toISOString(),
    status: (i % 11 === 0 ? 'unsubscribed' : 'subscribed') as 'subscribed' | 'unsubscribed',
  }
})
