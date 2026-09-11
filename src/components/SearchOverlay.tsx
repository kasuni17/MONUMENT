import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { searchPosts } from '@/lib/search'
import { X, Search as SearchIcon } from './icons'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

/**
 * Search runs entirely over the static story data held in React state. There
 * is no request, no index to warm, and nothing is recorded about the query.
 */
export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const posts = usePublishedPosts()
  const { categories, authors, tags } = useContent()

  useEffect(() => {
    if (!open) return
    setQuery('')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  const results = useMemo(
    () => searchPosts(posts, query, { categories: categories.items, authors: authors.items, tags: tags.items }).slice(0, 6),
    [posts, query, categories.items, authors.items, tags.items]
  )

  if (!open) return null

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    onClose()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search stories">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-sm"
      />
      <div className="relative animate-overlayIn border-b border-line bg-paper dark:border-line-dark dark:bg-surface-dark">
        <div className="container-editorial py-5">
          <form onSubmit={submit} className="flex items-center gap-3">
            <SearchIcon size={20} className="flex-none text-ink-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search stories, topics, writers"
              aria-label="Search stories"
              className="focus-ring min-w-0 flex-1 bg-transparent py-2 font-display text-lg text-ink placeholder:font-sans placeholder:text-base placeholder:text-faint focus-visible:ring-0 dark:text-paper sm:text-xl"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="focus-ring flex h-10 w-10 flex-none items-center justify-center text-ink-muted transition-colors hover:text-ink dark:hover:text-paper"
            >
              <X size={20} />
            </button>
          </form>

          {query.trim().length > 0 && (
            <div className="mt-4 border-t border-line pt-4 dark:border-line-dark">
              {results.length === 0 ? (
                <p className="py-6 text-sm text-ink-muted">
                  Nothing matches “{query.trim()}” yet. Try a topic, a writer, or a word from a headline.
                </p>
              ) : (
                <ul className="max-h-[52vh] overflow-y-auto">
                  {results.map((post) => {
                    const category = categories.items.find((c) => c.id === post.categoryId)
                    return (
                      <li key={post.id} className="border-b border-line last:border-b-0 dark:border-line-dark">
                        <Link
                          to={`/blog/${post.slug}`}
                          onClick={onClose}
                          className="focus-ring group flex items-baseline gap-4 py-3"
                        >
                          <span className="eyebrow w-24 flex-none text-faint">{category?.name}</span>
                          <span className="min-w-0 flex-1 font-display text-[1.0625rem] font-medium leading-snug text-ink dark:text-paper">
                            <span className="link-underline">{post.title}</span>
                          </span>
                          <span className="meta hidden flex-none sm:block">{post.readingTime} min</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
              <button
                type="button"
                onClick={submit}
                className="focus-ring mt-4 text-sm font-medium text-accent dark:text-accent-soft"
              >
                See all results for “{query.trim()}”
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
