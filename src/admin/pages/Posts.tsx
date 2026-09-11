import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useContent } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import { useToast } from '@/lib/toast'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import ConfirmDialog from '@/components/ConfirmDialog'
import EmptyState from '@/components/EmptyState'
import { formatDateShort, formatNumber } from '@/lib/utils'
import { Plus, Edit, Trash, Eye } from '@/components/icons'

export default function Posts() {
  useSeo({ title: 'Manage Posts' })
  const { posts, categories, authors } = useContent()
  const { showToast } = useToast()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const status = params.get('status') ?? 'all'
  const categoryFilter = params.get('category') ?? 'all'

  const filtered = useMemo(() => {
    return posts.items
      .filter((p) => (status === 'all' ? true : p.status === status))
      .filter((p) => (categoryFilter === 'all' ? true : p.categoryId === categoryFilter))
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
  }, [posts.items, status, categoryFilter, query])

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  function confirmDelete() {
    if (deleteId) {
      posts.remove(deleteId)
      showToast('Article deleted.', 'success')
      setDeleteId(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="Posts"
        description={`${posts.items.length} total articles`}
        action={
          <Link to="/admin/posts/new" className="focus-ring flex min-h-[44px] items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">
            <Plus size={16} /> New Post
          </Link>
        }
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper sm:max-w-xs"
        />
        <select value={status} onChange={(e) => setFilter('status', e.target.value)} className="focus-ring border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper">
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setFilter('category', e.target.value)} className="focus-ring border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper">
          <option value="all">All categories</option>
          {categories.items.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No articles yet." description="Create your first article to get started." action={<Link to="/admin/posts/new" className="focus-ring text-sm font-semibold text-accent">+ Write a new story</Link>} />
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-x-auto border border-line dark:border-line-dark lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-paper-dim text-left text-xs font-semibold uppercase tracking-wide text-ink-muted dark:border-line-dark dark:bg-surface-dark">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Views</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const category = categories.items.find((c) => c.id === p.categoryId)
                  const author = authors.items.find((a) => a.id === p.authorId)
                  return (
                    <tr key={p.id} className="border-b border-line last:border-0 dark:border-line-dark">
                      <td className="max-w-xs px-4 py-3">
                        <Link to={`/admin/posts/${p.id}/edit`} className="focus-ring font-medium text-ink hover:text-accent dark:text-paper line-clamp-1">
                          {p.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{author?.name ?? 'N/A'}</td>
                      <td className="px-4 py-3 text-ink-muted">{category?.name ?? 'N/A'}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-ink-muted">{formatNumber(p.views)}</td>
                      <td className="px-4 py-3 text-ink-muted">{formatDateShort(p.updatedAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {p.status === 'published' && (
                            <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" aria-label="View" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70">
                              <Eye size={16} />
                            </a>
                          )}
                          <Link to={`/admin/posts/${p.id}/edit`} aria-label="Edit" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70">
                            <Edit size={16} />
                          </Link>
                          <button onClick={() => setDeleteId(p.id)} aria-label="Delete" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70">
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-6 space-y-3 lg:hidden">
            {filtered.map((p) => {
              const category = categories.items.find((c) => c.id === p.categoryId)
              const author = authors.items.find((a) => a.id === p.authorId)
              return (
                <div key={p.id} className="border border-line bg-paper p-4 dark:border-line-dark dark:bg-surface-darkAlt">
                  <div className="flex items-start justify-between gap-3">
                    <Link to={`/admin/posts/${p.id}/edit`} className="focus-ring font-serif font-semibold text-ink dark:text-paper">{p.title}</Link>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">{author?.name} · {category?.name} · {formatDateShort(p.updatedAt)}</p>
                  <div className="mt-3 flex gap-2">
                    <Link to={`/admin/posts/${p.id}/edit`} className="focus-ring flex-1 border border-line py-2 text-center text-xs font-semibold text-ink dark:border-line-dark dark:text-paper">Edit</Link>
                    <button onClick={() => setDeleteId(p.id)} className="focus-ring flex-1 border border-line py-2 text-center text-xs font-semibold text-accent dark:border-line-dark">Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete this article?"
        description="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
