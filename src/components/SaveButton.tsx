import { useBookmarks } from '@/lib/bookmarks'
import { Bookmark } from './icons'
import { classNames } from '@/lib/utils'

interface SaveButtonProps {
  postId: string
  title: string
  className?: string
  variant?: 'icon' | 'labelled'
}

/**
 * Session-only save control. Reading lists live in React state for as long as
 * the tab is open, which is deliberate: MONUMENT stores nothing in the
 * browser and nothing on a server.
 */
export default function SaveButton({ postId, title, className, variant = 'icon' }: SaveButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked(postId)

  if (variant === 'labelled') {
    return (
      <button
        type="button"
        onClick={() => toggleBookmark(postId)}
        aria-pressed={saved}
        className={classNames(
          'focus-ring inline-flex min-h-[44px] items-center gap-2 border px-4 text-sm font-medium transition-colors',
          saved
            ? 'border-accent bg-accent text-paper'
            : 'border-line text-ink-soft hover:border-ink hover:text-ink dark:border-line-dark dark:text-paper/75 dark:hover:border-paper dark:hover:text-paper',
          className
        )}
      >
        <Bookmark size={16} filled={saved} />
        {saved ? 'Saved for later' : 'Save for later'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(postId)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from your reading list` : `Save ${title} to your reading list`}
      title={saved ? 'Remove from reading list' : 'Save for later'}
      className={classNames(
        'focus-ring flex h-9 w-9 items-center justify-center border transition-all duration-300 ease-editorial',
        saved
          ? 'border-accent bg-accent text-paper'
          : 'border-line/70 bg-paper/85 text-ink-soft backdrop-blur hover:border-ink hover:text-ink dark:border-line-dark dark:bg-surface-dark/80 dark:text-paper/80',
        className
      )}
    >
      <Bookmark size={15} filled={saved} />
    </button>
  )
}
