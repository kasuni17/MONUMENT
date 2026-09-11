import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import ConfirmDialog from '@/components/ConfirmDialog'
import { slugify } from '@/lib/utils'
import { generateAvatar } from '@/lib/avatar'
import { Author } from '@/types'
import { Plus, Edit, Trash } from '@/components/icons'

const empty: Omit<Author, 'id'> = { slug: '', name: '', role: '', bio: '', avatar: '', email: '', location: '', specialties: [], status: 'active' }

export default function Authors() {
  useSeo({ title: 'Manage Authors' })
  const { authors, posts } = useContent()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Author | null>(null)
  const [form, setForm] = useState<Omit<Author, 'id'>>(empty)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = authors.items.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))

  function openNew() { setEditing(null); setForm(empty); setFormOpen(true) }
  function openEdit(a: Author) { setEditing(a); setForm(a); setFormOpen(true) }

  function save() {
    if (!form.name.trim() || !form.email.trim()) return showToast('Name and email are required.', 'error')
    const slug = form.slug.trim() || slugify(form.name)
    const avatar = form.avatar.trim() || generateAvatar(form.name)
    if (editing) { authors.update(editing.id, { ...form, slug, avatar }); showToast('Author updated.', 'success') }
    else { authors.add({ id: `a-${Date.now()}`, ...form, slug, avatar }); showToast('Author created.', 'success') }
    setFormOpen(false)
  }

  function confirmDelete() {
    if (deleteId) { authors.remove(deleteId); showToast('Author deleted.', 'success'); setDeleteId(null) }
  }

  return (
    <div>
      <PageHeader title="Authors" description={`${authors.items.length} authors`} action={<button onClick={openNew} className="focus-ring flex min-h-[44px] items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"><Plus size={16} /> New Author</button>} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search authors…" className="focus-ring mt-6 w-full max-w-xs border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />

      <div className="mt-6 overflow-x-auto border border-line dark:border-line-dark">
        <table className="w-full min-w-[620px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-dim text-left text-xs font-semibold uppercase tracking-wide text-ink-muted dark:border-line-dark dark:bg-surface-dark">
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Articles</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-line last:border-0 dark:border-line-dark">
                <td className="px-4 py-3">
                  <Link to={`/author/${a.slug}`} className="focus-ring flex items-center gap-3">
                    <img src={a.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                    <span className="font-medium text-ink hover:text-accent dark:text-paper">{a.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-muted">{a.email}</td>
                <td className="px-4 py-3 text-ink-muted">{posts.items.filter((p) => p.authorId === a.id).length}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(a)} aria-label="Edit" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70"><Edit size={16} /></button>
                    <button onClick={() => setDeleteId(a.id)} aria-label="Delete" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70"><Trash size={16} /></button>
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
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto border border-line bg-paper p-6 dark:border-line-dark dark:bg-surface-darkAlt">
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">{editing ? 'Edit Author' : 'New Author'}</h2>
            <div className="mt-4 space-y-3">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <textarea placeholder="Bio" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setFormOpen(false)} className="focus-ring min-h-[40px] border border-line px-4 text-sm text-ink dark:border-line-dark dark:text-paper">Cancel</button>
              <button onClick={save} className="focus-ring min-h-[40px] bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete this author?" description="This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
