import { useState } from 'react'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '@/components/ConfirmDialog'
import { slugify } from '@/lib/utils'
import { topicImage } from '@/lib/imageLibrary'
import { Category } from '@/types'
import { Plus, Edit, Trash } from '@/components/icons'
import ArticleImage from '@/components/ArticleImage'

const empty: Omit<Category, 'id'> = { slug: '', name: '', description: '', image: '', imageAlt: '', featured: false }

export default function Categories() {
  useSeo({ title: 'Manage Categories' })
  const { categories, posts } = useContent()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState<Omit<Category, 'id'>>(empty)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const filtered = categories.items.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

  function openNew() {
    setEditing(null)
    setForm(empty)
    setFormOpen(true)
  }

  function openEdit(cat: Category) {
    setEditing(cat)
    setForm(cat)
    setFormOpen(true)
  }

  function save() {
    if (!form.name.trim()) return showToast('Name is required.', 'error')
    const slug = form.slug.trim() || slugify(form.name)
    const image = form.image.trim() || topicImage(slug, slug)
    if (editing) {
      categories.update(editing.id, { ...form, slug, image, imageAlt: form.imageAlt || form.name })
      showToast('Category updated.', 'success')
    } else {
      categories.add({ id: `c-${Date.now()}`, ...form, slug, image, imageAlt: form.imageAlt || form.name })
      showToast('Category created.', 'success')
    }
    setFormOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      categories.remove(deleteId)
      showToast('Category deleted.', 'success')
      setDeleteId(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="Categories"
        description={`${categories.items.length} categories`}
        action={<button onClick={openNew} className="focus-ring flex min-h-[44px] items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"><Plus size={16} /> New Category</button>}
      />

      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search categories…" className="focus-ring mt-6 w-full max-w-xs border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="border border-line bg-paper dark:border-line-dark dark:bg-surface-darkAlt">
            <ArticleImage src={c.image} alt={c.imageAlt || c.name} ratio="free" className="h-32 w-full" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">{c.name}</h3>
                {c.featured && <span className="rounded-sm bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">Featured</span>}
              </div>
              <p className="mt-1 text-xs text-ink-muted">{posts.items.filter((p) => p.categoryId === c.id).length} articles</p>
              <p className="mt-2 text-sm text-ink-muted line-clamp-2">{c.description}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(c)} className="focus-ring flex flex-1 items-center justify-center gap-1.5 border border-line py-2 text-xs font-semibold text-ink dark:border-line-dark dark:text-paper"><Edit size={13} /> Edit</button>
                <button onClick={() => setDeleteId(c.id)} className="focus-ring flex flex-1 items-center justify-center gap-1.5 border border-line py-2 text-xs font-semibold text-accent dark:border-line-dark"><Trash size={13} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setFormOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto border border-line bg-paper p-6 dark:border-line-dark dark:bg-surface-darkAlt">
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">{editing ? 'Edit Category' : 'New Category'}</h2>
            <div className="mt-4 space-y-3">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <input placeholder="Slug (auto-generated if blank)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper" />
              <label className="flex items-center gap-2 text-sm text-ink dark:text-paper">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured on homepage
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setFormOpen(false)} className="focus-ring min-h-[40px] border border-line px-4 text-sm text-ink dark:border-line-dark dark:text-paper">Cancel</button>
              <button onClick={save} className="focus-ring min-h-[40px] bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink">Save</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete this category?" description="This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
