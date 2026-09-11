import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="border border-line px-6 py-16 text-center dark:border-line-dark sm:py-20">
      <p className="eyebrow text-faint">Nothing here</p>
      <h3 className="display-sm mt-3 text-ink dark:text-paper">{title}</h3>
      {description && (
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted dark:text-paper/60">
          {description}
        </p>
      )}
      {action && <div className="mt-7 flex justify-center">{action}</div>}
    </div>
  )
}
