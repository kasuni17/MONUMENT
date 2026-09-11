import { Link } from 'react-router-dom'
import { ArrowRight } from './icons'
import { classNames } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: { to: string; label: string }
  className?: string
  /** Sets the heading level so pages keep a sensible outline. */
  as?: 'h1' | 'h2'
}

/**
 * Every section on the site opens the same way: a small label, a serif title
 * on the container's left edge, and an optional link sitting on the baseline
 * at the right. Keeping it in one component is what stops sections drifting
 * out of alignment with each other.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <div className={classNames('border-b border-line pb-4 dark:border-line-dark', className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow text-accent">{eyebrow}</p>}
          <Heading className={classNames('display-md text-ink dark:text-paper', eyebrow && 'mt-2')}>
            {title}
          </Heading>
        </div>
        {action && (
          <Link
            to={action.to}
            className="focus-ring group inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-medium text-ink-soft transition-colors hover:text-accent dark:text-paper/70 dark:hover:text-accent-soft"
          >
            <span className="link-underline">{action.label}</span>
            <ArrowRight size={14} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      {description && <p className="mt-3 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/60">{description}</p>}
    </div>
  )
}
