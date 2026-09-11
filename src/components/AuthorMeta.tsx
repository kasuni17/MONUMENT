import { Link } from 'react-router-dom'
import { Author } from '@/types'
import { formatDateShort } from '@/lib/utils'
import { classNames } from '@/lib/utils'

interface AuthorMetaProps {
  author?: Author
  date?: string
  readingTime?: number
  /** `line` is the compact byline used on cards, `stacked` sits under a headline. */
  variant?: 'line' | 'stacked'
  linked?: boolean
  className?: string
}

/**
 * One byline format, used everywhere a story is credited, so metadata lines
 * up the same way on a card, a hero and an article header.
 */
export default function AuthorMeta({
  author,
  date,
  readingTime,
  variant = 'line',
  linked = false,
  className,
}: AuthorMetaProps) {
  const name =
    author && linked ? (
      <Link
        to={`/author/${author.slug}`}
        className="focus-ring font-medium text-ink-soft transition-colors hover:text-accent dark:text-paper/75"
      >
        {author.name}
      </Link>
    ) : (
      author && <span className="font-medium text-ink-soft dark:text-paper/75">{author.name}</span>
    )

  if (variant === 'stacked') {
    return (
      <div className={classNames('flex items-center gap-3', className)}>
        {author && (
          <img
            src={author.avatar}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 flex-none object-cover"
          />
        )}
        <div className="min-w-0">
          <p className="text-sm">{name}</p>
          <p className="meta mt-0.5">
            {date && <span>{formatDateShort(date)}</span>}
            {date && readingTime ? <span aria-hidden="true"> · </span> : null}
            {readingTime ? <span>{readingTime} min read</span> : null}
          </p>
        </div>
      </div>
    )
  }

  return (
    <p className={classNames('meta flex flex-wrap items-center gap-x-2 gap-y-1', className)}>
      {name}
      {name && date ? <span aria-hidden="true">·</span> : null}
      {date && <span>{formatDateShort(date)}</span>}
      {readingTime ? <span aria-hidden="true">·</span> : null}
      {readingTime ? <span>{readingTime} min</span> : null}
    </p>
  )
}
