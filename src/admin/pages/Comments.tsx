import { useMemo, useState } from 'react'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import ConfirmDialog from '@/components/ConfirmDialog'
import EmptyState from '@/components/EmptyState'
import { formatDate, classNames } from '@/lib/utils'
import { Check, X as XIcon, Trash } from '@/components/icons'

type Filter = 'all' | 'pending' | 'approved' | 'hidden'

export default function Comments() {
  useSeo({ title: 'Manage Comments' })
  const { comments, posts } = useContent()
  const { showToast } = useToast()
  const [filter, setFilter] = useState<Filter>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return [...comments.items]
      .filter((c) => (filter === 'all' ? true : c.status === filter))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }, [comments.items, filter])

  function confirmDelete() {
    if (deleteId) { comments.remove(deleteId); showToast('Comment deleted.', 'success'); setDeleteId(null) }
  }

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'hidden', label: 'Hidden' },
  ]

  return (
    <div>
      <PageHeader title="Comments" description={`${comments.items.length} total comments`} />

      <div className="mt-6 flex gap-1 border-b border-line dark:border-line-dark">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={classNames(
              'focus-ring min-h-[40px] border-b-2 px-3 text-sm font-medium',
              filter === t.key ? 'border-accent text-accent' : 'border-transparent text-ink-muted hover:text-ink dark:hover:text-paper'
            )}
          >
            {t.label} ({t.key === 'all' ? comments.items.length : comments.items.filter((c) => c.status === t.key).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No comments here." />
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((c) => {
            const post = posts.items.find((p) => p.id === c.postId)
            return (
              <div key={c.id} className="border border-line bg-paper p-4 dark:border-line-dark dark:bg-surface-darkAlt">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-paper">{c.authorName} <span className="font-normal text-ink-muted">on</span> {post?.title ?? 'Unknown post'}</p>
                    <p className="text-xs text-ink-muted">{formatDate(c.date)} · {c.authorEmail}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <p className="mt-3 text-sm text-ink-soft dark:text-paper/80">{c.text}</p>
                <div className="mt-3 flex gap-2">
                  {c.status !== 'approved' && (
                    <button onClick={() => { comments.update(c.id, { status: 'approved' }); showToast('Comment approved.', 'success') }} className="focus-ring flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-semibold text-ink dark:border-line-dark dark:text-paper"><Check size={13} /> Approve</button>
                  )}
                  {c.status !== 'hidden' && (
                    <button onClick={() => { comments.update(c.id, { status: 'hidden' }); showToast('Comment hidden.', 'success') }} className="focus-ring flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-semibold text-ink dark:border-line-dark dark:text-paper"><XIcon size={13} /> Hide</button>
                  )}
                  <button onClick={() => setDeleteId(c.id)} className="focus-ring flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-semibold text-accent dark:border-line-dark"><Trash size={13} /> Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete this comment?" description="This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
