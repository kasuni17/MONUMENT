import { useState } from 'react'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import ConfirmDialog from '@/components/ConfirmDialog'
import EmptyState from '@/components/EmptyState'
import { formatDateShort } from '@/lib/utils'
import { topicImage, imagePools } from '@/lib/imageLibrary'
import { Upload, Trash, Link2 } from '@/components/icons'
import ArticleImage from '@/components/ArticleImage'

const demoCategories = Object.keys(imagePools)

export default function Media() {
  useSeo({ title: 'Media Library' })
  const { media } = useContent()
  const { showToast } = useToast()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  function uploadDemoAsset() {
    const id = `m-${Date.now()}`
    const name = `demo-upload-${media.items.length + 1}.jpg`
    const category = demoCategories[media.items.length % demoCategories.length]
    media.add({ id, name, url: topicImage(category, id), width: 1600, height: 1067, type: 'image/jpeg', size: `${120 + Math.floor(Math.random() * 300)} KB`, uploadedAt: new Date().toISOString() })
    showToast('Demo asset uploaded.', 'success')
  }

  function confirmDelete() {
    if (deleteId) { media.remove(deleteId); if (selected === deleteId) setSelected(null); showToast('Asset deleted.', 'success'); setDeleteId(null) }
  }

  function copyPath(url: string) {
    navigator.clipboard?.writeText(url).then(() => showToast('Path copied.', 'success'))
  }

  const activeAsset = media.items.find((m) => m.id === selected)

  return (
    <div>
      <PageHeader
        title="Media Library"
        description={`${media.items.length} assets, uploads are simulated for this demo`}
        action={<button onClick={uploadDemoAsset} className="focus-ring flex min-h-[44px] items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper dark:bg-paper dark:text-ink"><Upload size={16} /> Upload demo asset</button>}
      />

      {media.items.length === 0 ? (
        <EmptyState title="No media yet." action={<button onClick={uploadDemoAsset} className="focus-ring text-sm font-semibold text-accent">Upload a demo asset</button>} />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {media.items.map((m) => (
            <div key={m.id} className="group">
              <button onClick={() => setSelected(m.id)} className="focus-ring block w-full text-left">
                <div className="aspect-square overflow-hidden border border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
                  <ArticleImage src={m.url} alt={m.name} ratio="square" zoom />
                </div>
              </button>
              <div className="mt-2 flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-ink dark:text-paper">{m.name}</p>
                  <p className="text-[11px] text-ink-muted">{m.size}</p>
                </div>
                <button onClick={() => copyPath(m.url)} aria-label={`Copy path for ${m.name}`} title="Copy path" className="focus-ring flex h-7 w-7 flex-none items-center justify-center text-ink-muted hover:text-accent">
                  <Link2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeAsset && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-lg border border-line bg-paper p-6 dark:border-line-dark dark:bg-surface-darkAlt">
            <ArticleImage src={activeAsset.url} alt={activeAsset.name} ratio="landscape" loading="eager" />
            <div className="mt-4 space-y-1 text-sm">
              <p className="font-semibold text-ink dark:text-paper">{activeAsset.name}</p>
              <p className="text-ink-muted">{activeAsset.width} × {activeAsset.height} · {activeAsset.type} · {activeAsset.size}</p>
              <p className="text-ink-muted">Uploaded {formatDateShort(activeAsset.uploadedAt)}</p>
              <p className="truncate text-xs text-ink-muted">{activeAsset.url}</p>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button onClick={() => copyPath(activeAsset.url)} className="focus-ring flex min-h-[40px] items-center gap-1.5 border border-line px-4 text-sm text-ink dark:border-line-dark dark:text-paper"><Link2 size={14} /> Copy path</button>
              <button onClick={() => setSelected(null)} className="focus-ring min-h-[40px] border border-line px-4 text-sm text-ink dark:border-line-dark dark:text-paper">Close</button>
              <button onClick={() => setDeleteId(activeAsset.id)} className="focus-ring flex min-h-[40px] items-center gap-1.5 bg-accent px-4 text-sm font-semibold text-paper"><Trash size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete this asset?" description="This action cannot be undone." onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />
    </div>
  )
}
