import { Author, Category, Post, Tag } from '@/types'

interface SearchIndexes {
  categories: Category[]
  authors: Author[]
  tags: Tag[]
}

/**
 * Frontend-only search across the static story data: title, standfirst,
 * excerpt, section, writer and tags. Results are ranked so a headline match
 * always outranks a passing mention in a tag.
 */
export function searchPosts(posts: Post[], rawQuery: string, indexes: SearchIndexes): Post[] {
  const query = rawQuery.trim().toLowerCase()
  if (!query) return []

  const terms = query.split(/\s+/).filter(Boolean)

  const scored = posts.map((post) => {
    const category = indexes.categories.find((c) => c.id === post.categoryId)
    const author = indexes.authors.find((a) => a.id === post.authorId)
    const tagNames = post.tagIds
      .map((id) => indexes.tags.find((t) => t.id === id)?.name ?? '')
      .join(' ')

    const fields: Array<[string, number]> = [
      [post.title.toLowerCase(), 6],
      [post.subtitle.toLowerCase(), 3],
      [post.excerpt.toLowerCase(), 2],
      [(category?.name ?? '').toLowerCase(), 3],
      [(author?.name ?? '').toLowerCase(), 3],
      [tagNames.toLowerCase(), 2],
    ]

    let score = 0
    for (const term of terms) {
      let matchedTerm = false
      for (const [value, weight] of fields) {
        if (value.includes(term)) {
          score += weight
          matchedTerm = true
        }
      }
      // Every term has to appear somewhere, so "kyoto design" does not match
      // an article that only mentions design.
      if (!matchedTerm) return { post, score: 0 }
    }

    return { post, score }
  })

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt))
    .map((entry) => entry.post)
}
