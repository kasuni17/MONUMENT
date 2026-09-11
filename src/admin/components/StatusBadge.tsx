import { classNames } from '@/lib/utils'

const styles: Record<string, string> = {
  draft: 'bg-paper-dim text-ink-muted dark:bg-surface-dark dark:text-paper/60',
  scheduled: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  published: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  archived: 'bg-paper-dim text-ink-muted dark:bg-surface-dark dark:text-paper/70',
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  approved: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  hidden: 'bg-paper-dim text-ink-muted dark:bg-surface-dark dark:text-paper/70',
  active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  inactive: 'bg-paper-dim text-ink-muted dark:bg-surface-dark dark:text-paper/70',
  invited: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  subscribed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  unsubscribed: 'bg-paper-dim text-ink-muted dark:bg-surface-dark dark:text-paper/70',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={classNames('inline-flex items-center rounded-sm px-2 py-1 text-xs font-semibold capitalize', styles[status] ?? 'bg-paper-dim text-ink-muted')}>
      {status}
    </span>
  )
}
