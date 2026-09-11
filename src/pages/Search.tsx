import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { searchPosts } from '@/lib/search'
import Container from '@/components/Container'
import EditorialCard from '@/components/EditorialCard'
import EmptyState from '@/components/EmptyState'
import { useSeo } from '@/hooks/useSeo'
import { Search as SearchIcon } from '@/components/icons'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const [input, setInput] = useState(query)
  const published = usePublishedPosts()
  const { authors, categories, tags } = useContent()

  useSeo({
    title: query ? `Search: ${query}` : 'Search',
    description: 'Search the MONUMENT archive by headline, section, writer or subject.',
  })

  useEffect(() => setInput(query), [query])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { posts: [], writers: [], sections: [], subjects: [] }
    return {
      posts: searchPosts(published, query, {
        categories: categories.items,
        authors: authors.items,
        tags: tags.items,
      }),
      writers: authors.items.filter(
        (a) => a.name.toLowerCase().includes(q) || a.specialties.join(' ').toLowerCase().includes(q)
      ),
      sections: categories.items.filter((c) => c.name.toLowerCase().includes(q)),
      subjects: tags.items.filter((t) => t.name.toLowerCase().includes(q)),
    }
  }, [query, published, authors.items, categories.items, tags.items])

  const total =
    results.posts.length + results.writers.length + results.sections.length + results.subjects.length

  const suggestions = ['attention', 'kyoto', 'architecture', 'small teams', 'slow living']

  return (
    <>
      <Container as="header" className="border-b border-line py-10 dark:border-line-dark lg:py-14">
        <p className="eyebrow text-accent dark:text-accent-soft">Search</p>
        <h1 className="display-lg mt-3 text-ink dark:text-paper">Find a story</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setParams(input.trim() ? { q: input.trim() } : {})
          }}
          className="relative mt-7 max-w-2xl"
        >
          <label htmlFor="search-input" className="sr-only">
            Search stories
          </label>
          <SearchIcon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            id="search-input"
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Headline, section, writer or subject"
            autoFocus
            className="focus-ring h-14 w-full border border-line bg-paper pl-12 pr-28 text-base text-ink placeholder:text-faint dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper"
          />
          <button
            type="submit"
            className="focus-ring absolute right-1.5 top-1.5 h-11 bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
          >
            Search
          </button>
        </form>

        {query.trim() ? (
          <p className="meta mt-4">
            {total} {total === 1 ? 'result' : 'results'} for “{query.trim()}”
          </p>
        ) : (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="meta">Try</span>
            {suggestions.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setParams({ q: term })}
                className="focus-ring border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper/70"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </Container>

      <Container as="section" className="section-tight">
        {!query.trim() ? (
          <p className="text-sm text-ink-muted dark:text-paper/60">
            Search runs across the whole archive, right here in the browser. Nothing you type leaves the page.
          </p>
        ) : total === 0 ? (
          <EmptyState
            title={`Nothing matches “${query.trim()}”.`}
            description="Try a single word, a writer's name, or browse the sections instead."
            action={
              <Link
                to="/categories"
                className="focus-ring inline-flex min-h-[44px] items-center border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
              >
                Browse topics
              </Link>
            }
          />
        ) : (
          <div className="space-y-14">
            {results.posts.length > 0 && (
              <section>
                <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">
                  Stories ({results.posts.length})
                </h2>
                <div className="mt-8 space-y-8">
                  {results.posts.map((post) => (
                    <div key={post.id} className="border-b border-line pb-8 last:border-b-0 dark:border-line-dark">
                      <EditorialCard post={post} variant="row" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {results.writers.length > 0 && (
              <section>
                <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">Writers</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {results.writers.map((writer) => (
                    <Link
                      key={writer.id}
                      to={`/author/${writer.slug}`}
                      className="focus-ring flex items-center gap-3 border border-line p-3 pr-5 transition-colors hover:border-accent dark:border-line-dark"
                    >
                      <img src={writer.avatar} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
                      <span>
                        <span className="block text-sm font-medium text-ink dark:text-paper">{writer.name}</span>
                        <span className="meta">{writer.role}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {(results.sections.length > 0 || results.subjects.length > 0) && (
              <section>
                <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">
                  Sections and subjects
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {results.sections.map((section) => (
                    <Link
                      key={section.id}
                      to={`/category/${section.slug}`}
                      className="focus-ring border border-line px-3 py-2 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper/70"
                    >
                      {section.name}
                    </Link>
                  ))}
                  {results.subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/tag/${subject.slug}`}
                      className="focus-ring border border-line px-3 py-2 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper/70"
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </Container>
    </>
  )
}
