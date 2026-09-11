import { useMemo, useState } from 'react'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import ConfirmDialog from '@/components/ConfirmDialog'
import { formatDateShort } from '@/lib/utils'
import { Trash } from '@/components/icons'

export default function NewsletterAdmin() {
  useSeo({ title: 'Newsletter Subscribers' })
  const { subscribers } = useContent()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const active = subscribers.items.filter((s) => s.status === 'subscribed')
  const filtered = useMemo(
    () => subscribers.items.filter((s) => s.email.toLowerCase().includes(query.toLowerCase())),
    [subscribers.items, query]
  )

  function confirmDelete() {
    if (deleteId) { subscribers.remove(deleteId); showToast('Subscriber removed.', 'success'); setDeleteId(null) }
  }

  function exportCsv() {
    showToast('Export ready (demo only, no file is generated).')
  }

  return (
    <div>
      <PageHeader
        title="Newsletter"
        description="No real email service is connected, this is a demo subscriber list."
        action={<button onClick={exportCsv} className="focus-ring min-h-[44px] border border-line px-4 text-sm font-semibold text-ink dark:border-line-dark dark:text-paper">Export</button>}
      />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Subscribers" value={String(active.length)} change="8.2%" />
        <StatCard label="Total signups" value={String(subscribers.items.length)} />
        <StatCard label="Unsubscribed" value={String(subscribers.items.length - active.length)} trend="down" change="N/A" />
      </div>

      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search subscribers…" className="focus-ring mt-6 w-full max-w-xs border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />

      <div className="mt-6 overflow-x-auto border border-line dark:border-line-dark">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-dim text-left text-xs font-semibold uppercase tracking-wide text-ink-muted dark:border-line-dark dark:bg-surface-dark">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Signup Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-line last:border-0 dark:border-line-dark">
                <td className="px-4 py-3 text-ink dark:text-paper">{s.email}</td>
                <td className="px-4 py-3 text-ink-muted">{formatDateShort(s.subscribedAt)}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button onClick={() => setDeleteId(s.id)} aria-label="Remove" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70"><Trash size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog open={!!deleteId} title="Remove this subscriber?" description="This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
