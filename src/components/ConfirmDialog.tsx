import { useEffect, useRef } from 'react'
import { AlertTriangle } from './icons'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel }: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) confirmRef.current?.focus()
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="absolute inset-0 bg-ink/50" onClick={onCancel} aria-hidden="true" />
      <div className="animate-slideUp relative w-full max-w-sm border border-line bg-paper p-6 shadow-xl dark:border-line-dark dark:bg-surface-darkAlt">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <AlertTriangle size={20} />
        </div>
        <h2 id="confirm-title" className="mt-4 font-serif text-lg font-semibold text-ink dark:text-paper">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-ink-muted">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="focus-ring min-h-[44px] border border-line px-4 text-sm font-medium text-ink dark:border-line-dark dark:text-paper"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="focus-ring min-h-[44px] bg-accent px-4 text-sm font-semibold text-paper hover:bg-accent-strong"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
