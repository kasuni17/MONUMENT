import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { searchPosts } from '@/lib/search'
import Container from '@/components/Container'
import PageIntro from '@/components/PageIntro'
import EditorialCard from '@/components/EditorialCard'
import FeaturedStory from '@/components/FeaturedStory'
import EmptyState from '@/components/EmptyState'
import Newsletter from '@/components/Newsletter'
import { useSeo } from '@/hooks/useSeo'
import { classNames } from '@/lib/utils'
import { Search as SearchIcon, X, ChevronDown } from '@/components/icons'
import type { Category } from '@/types'

const PAGE_SIZE = 9
const PRIMARY_CATEGORY_COUNT = 7

type SortOption = 'newest' | 'oldest' | 'popular'

const sortLabels: Record<SortOption, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  popular: 'Most read',
}

export default function Blog() {
  useSeo({
    title: 'Stories',
    description:
      'The full MONUMENT archive: reporting and essays on technology, design, culture, business, travel and architecture.',
  })

  const published = usePublishedPosts()
  const { categories, authors, tags } = useContent()
  const [params, setParams] = useSearchParams()
  const [visible, setVisible] = useState(PAGE_SIZE)

  const activeCategory = params.get('category') ?? 'all'
  const sort = (params.get('sort') as SortOption) ?? 'newest'
  const query = params.get('q') ?? ''

  const filtered = useMemo(() => {
    const base = query.trim()
      ? searchPosts(published, query, { categories: categories.items, authors: authors.items, tags: tags.items })
      : published

    const byCategory = activeCategory === 'all' ? base : base.filter((p) => p.categoryId === activeCategory)

    // A search already returns results in relevance order, so only re-sort
    // when the reader has actually asked for a different order.
    if (query.trim() && sort === 'newest') return byCategory

    return [...byCategory].sort((a, b) => {
      if (sort === 'oldest') return +new Date(a.publishedAt) - +new Date(b.publishedAt)
      if (sort === 'popular') return b.views - a.views
      return +new Date(b.publishedAt) - +new Date(a.publishedAt)
    })
  }, [published, query, activeCategory, sort, categories.items, authors.items, tags.items])

  const showLead = !query.trim() && activeCategory === 'all' && sort === 'newest'
  const lead = showLead ? filtered[0] : undefined
  const rest = lead ? filtered.slice(1) : filtered
  const visiblePosts = rest.slice(0, visible)

  function update(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === 'all' || (key === 'sort' && value === 'newest')) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
    setVisible(PAGE_SIZE)
  }

  const activeName = categories.items.find((c) => c.id === activeCategory)?.name
  const primaryCategories = categories.items.slice(0, PRIMARY_CATEGORY_COUNT)
  const moreCategories = categories.items.slice(PRIMARY_CATEGORY_COUNT)
  const activeInMore = moreCategories.some((c) => c.id === activeCategory)

  return (
    <>
      <PageIntro
        eyebrow="The archive"
        title="Every story we have published"
        description="Reporting and essays across nine sections. Filter by section, search the archive, or simply start at the top."
        meta={`${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'}${activeName ? ` in ${activeName}` : ''}`}
      />

      <Container as="section" className="py-6">
        {/* Filter bar, aligned to the same grid as everything else */}
        <div className="flex flex-col gap-4 border-b border-line py-4 dark:border-line-dark lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 lg:flex-nowrap lg:shrink-0 lg:gap-x-6">
            <FilterButton active={activeCategory === 'all'} onClick={() => update('category', 'all')}>
              All
            </FilterButton>
            {primaryCategories.map((category) => (
              <FilterButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => update('category', category.id)}
              >
                {category.name}
              </FilterButton>
            ))}
            {moreCategories.length > 0 && (
              <MoreCategoriesMenu
                categories={moreCategories}
                activeCategory={activeCategory}
                active={activeInMore}
                onSelect={(id) => update('category', id)}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-none lg:shrink-0">
            <label className="relative w-full sm:w-56 lg:w-56">
              <span className="sr-only">Search the archive</span>
              <SearchIcon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Search the archive"
                className="focus-ring h-11 w-full border border-line bg-paper pl-9 pr-3 text-sm text-ink placeholder:text-faint dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper"
              />
            </label>
            <label className="flex w-full items-center gap-2 text-sm text-ink-muted sm:w-auto">
              <span className="sr-only sm:not-sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => update('sort', e.target.value)}
                className="focus-ring h-11 w-full border border-line bg-paper px-3 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper sm:w-auto"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {sortLabels[option]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {(query.trim() || activeCategory !== 'all') && (
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <p className="meta">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              {query.trim() && <> for “{query.trim()}”</>}
              {activeName && <> in {activeName}</>}
            </p>
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="focus-ring inline-flex items-center gap-1.5 text-xs font-medium text-accent dark:text-accent-soft"
            >
              <X size={13} /> Clear filters
            </button>
          </div>
        )}
      </Container>

      <Container as="section" className="pb-16 lg:pb-20">
        {filtered.length === 0 ? (
          <EmptyState
            title="No stories match that yet."
            description="Try a broader search, another section, or start from the most recent edition."
            action={
              <Link
                to="/blog"
                className="focus-ring inline-flex min-h-[44px] items-center border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
              >
                Back to the archive
              </Link>
            }
          />
        ) : (
          <>
            {lead && (
              <div className="border-b border-line pb-12 dark:border-line-dark">
                <FeaturedStory post={lead} />
              </div>
            )}

            <div
              className={classNames(
                'grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3',
                lead ? 'pt-12' : 'pt-2'
              )}
            >
              {visiblePosts.map((post) => (
                <EditorialCard key={post.id} post={post} variant="standard" showSave />
              ))}
            </div>

            {visible < rest.length && (
              <div className="mt-14 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="focus-ring min-h-[48px] border border-ink px-10 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
                >
                  Load more stories
                </button>
                <p className="meta">
                  Showing {visiblePosts.length + (lead ? 1 : 0)} of {filtered.length}
                </p>
              </div>
            )}
          </>
        )}
      </Container>

      <Container as="section" className="pb-16">
        <Newsletter variant="panel" />
      </Container>
    </>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={classNames(
        'focus-ring inline-flex min-h-[40px] items-center whitespace-nowrap border-b-2 pb-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-colors',
        active
          ? 'border-accent text-accent dark:border-accent-soft dark:text-accent-soft'
          : 'border-transparent text-ink-muted hover:border-line hover:text-ink dark:hover:border-line-dark dark:hover:text-paper'
      )}
    >
      {children}
    </button>
  )
}

function MoreCategoriesMenu({
  categories,
  activeCategory,
  active,
  onSelect,
}: {
  categories: Category[]
  activeCategory: string
  active: boolean
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={classNames(
          'focus-ring inline-flex min-h-[40px] items-center gap-1 whitespace-nowrap border-b-2 pb-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-colors',
          active
            ? 'border-accent text-accent dark:border-accent-soft dark:text-accent-soft'
            : 'border-transparent text-ink-muted hover:border-line hover:text-ink dark:hover:border-line-dark dark:hover:text-paper'
        )}
      >
        More
        <ChevronDown size={14} className={classNames('transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="More sections"
          className="absolute left-0 top-full z-20 mt-3 min-w-[11rem] border border-line bg-paper py-1.5 shadow-lg dark:border-line-dark dark:bg-surface-darkAlt"
        >
          {categories.map((category) => {
            const isActive = category.id === activeCategory
            return (
              <button
                key={category.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  onSelect(category.id)
                  setOpen(false)
                }}
                className={classNames(
                  'focus-ring flex w-full items-center px-4 py-2.5 text-left text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-colors',
                  isActive
                    ? 'text-accent dark:text-accent-soft'
                    : 'text-ink-muted hover:bg-paper-dim hover:text-ink dark:hover:bg-surface-dark dark:hover:text-paper'
                )}
              >
                {category.name}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
