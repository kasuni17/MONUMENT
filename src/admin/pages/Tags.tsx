import { useState } from 'react'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '@/components/ConfirmDialog'
import { slugify } from '@/lib/utils'
import { Plus, Edit, Trash } from '@/components/icons'
import { Tag } from '@/types'

export default function Tags() {
  useSeo({ title: 'Manage Tags' })
  const { tags, posts } = useContent()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Tag | null>(null)
  const [name, setName] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = tags.items.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))

  function openNew() { setEditing(null); setName(''); setFormOpen(true) }
  function openEdit(t: Tag) { setEditing(t); setName(t.name); setFormOpen(true) }

  function save() {
    if (!name.trim()) return showToast('Tag name is required.', 'error')
    const slug = slugify(name)
    if (editing) { tags.update(editing.id, { name, slug }); showToast('Tag updated.', 'success') }
    else { tags.add({ id: `t-${Date.now()}`, name, slug }); showToast('Tag created.', 'success') }
    setFormOpen(false)
  }

  function confirmDelete() {
    if (deleteId) { tags.remove(deleteId); showToast('Tag deleted.', 'success'); setDeleteId(null) }
  }

  return (
    <div>
      <PageHeader title="Tags" description={`${tags.items.length} tags`} action={<button onClick={openNew} className="focus-ring flex min-h-[44px] items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"><Plus size={16} /> New Tag</button>} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tags…" className="focus-ring mt-6 w-full max-w-xs border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />

      <div className="mt-6 overflow-x-auto border border-line dark:border-line-dark">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-dim text-left text-xs font-semibold uppercase tracking-wide text-ink-muted dark:border-line-dark dark:bg-surface-dark">
              <th className="px-4 py-3">Tag</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Articles</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0 dark:border-line-dark">
                <td className="px-4 py-3 font-medium text-ink dark:text-paper">#{t.name}</td>
                <td className="px-4 py-3 text-ink-muted">{t.slug}</td>
                <td className="px-4 py-3 text-ink-muted">{posts.items.filter((p) => p.tagIds.includes(t.id)).length}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(t)} aria-label="Edit" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70"><Edit size={16} /></button>
                    <button onClick={() => setDeleteId(t.id)} aria-label="Delete" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70"><Trash size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setFormOpen(false)} />
          <div className="relative w-full max-w-sm border border-line bg-paper p-6 dark:border-line-dark dark:bg-surface-darkAlt">
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">{editing ? 'Edit Tag' : 'New Tag'}</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tag name" className="focus-ring mt-4 w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setFormOpen(false)} className="focus-ring min-h-[40px] border border-line px-4 text-sm text-ink dark:border-line-dark dark:text-paper">Cancel</button>
              <button onClick={save} className="focus-ring min-h-[40px] bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete this tag?" description="This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
