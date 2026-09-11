import { useState } from 'react'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import ConfirmDialog from '@/components/ConfirmDialog'
import { AdminUser } from '@/types'
import { Plus, Trash } from '@/components/icons'

export default function Users() {
  useSeo({ title: 'Manage Users' })
  const { users } = useContent()
  const { showToast } = useToast()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'contributor' as AdminUser['role'] })

  function invite() {
    if (!form.name.trim() || !form.email.trim()) return showToast('Name and email are required.', 'error')
    users.add({ id: `u-${Date.now()}`, name: form.name, email: form.email, role: form.role, status: 'invited' })
    showToast('Invitation sent.', 'success')
    setForm({ name: '', email: '', role: 'contributor' })
    setFormOpen(false)
  }

  function confirmDelete() {
    if (deleteId) { users.remove(deleteId); showToast('User removed.', 'success'); setDeleteId(null) }
  }

  return (
    <div>
      <PageHeader title="Users" description={`${users.items.length} team members`} action={<button onClick={() => setFormOpen(true)} className="focus-ring flex min-h-[44px] items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"><Plus size={16} /> Invite user</button>} />

      <div className="mt-6 overflow-x-auto border border-line dark:border-line-dark">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-dim text-left text-xs font-semibold uppercase tracking-wide text-ink-muted dark:border-line-dark dark:bg-surface-dark">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.items.map((u) => (
              <tr key={u.id} className="border-b border-line last:border-0 dark:border-line-dark">
                <td className="px-4 py-3 font-medium text-ink dark:text-paper">{u.name}</td>
                <td className="px-4 py-3 text-ink-muted">{u.email}</td>
                <td className="px-4 py-3 capitalize text-ink-muted">{u.role}</td>
                <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button onClick={() => setDeleteId(u.id)} aria-label="Remove" className="focus-ring flex h-9 w-9 items-center justify-center text-ink-muted hover:text-accent dark:text-paper/70"><Trash size={16} /></button>
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
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Invite user</h2>
            <div className="mt-4 space-y-3">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as AdminUser['role'] })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="contributor">Contributor</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setFormOpen(false)} className="focus-ring min-h-[40px] border border-line px-4 text-sm text-ink dark:border-line-dark dark:text-paper">Cancel</button>
              <button onClick={invite} className="focus-ring min-h-[40px] bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">Send invite</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Remove this user?" description="They will lose access immediately." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
