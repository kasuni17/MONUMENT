import { Link } from 'react-router-dom'
import { Category } from '@/types'
import ArticleImage from './ArticleImage'
import { ArrowRight } from './icons'
import { classNames } from '@/lib/utils'

interface TopicCardProps {
  category: Category
  count: number
  className?: string
  variant?: 'standard' | 'wide'
}

export default function TopicCard({ category, count, className, variant = 'standard' }: TopicCardProps) {
  const href = `/category/${category.slug}`

  return (
    <article className={classNames('group', className)}>
      <Link to={href} className="focus-ring block">
        <ArticleImage
          src={category.image}
          alt={category.imageAlt}
          ratio={variant === 'wide' ? 'wide' : 'classic'}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          label={category.name}
          zoom
        />
        <div className="flex items-baseline justify-between gap-4 pt-4">
          <h3 className="display-sm text-ink dark:text-paper">
            <span className="link-underline">{category.name}</span>
          </h3>
          <span className="meta shrink-0">{count} {count === 1 ? 'story' : 'stories'}</span>
        </div>
        <p className="clamp-2 mt-2 text-sm leading-relaxed text-ink-muted dark:text-paper/60">{category.description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent dark:text-accent-soft">
          Read the section
          <ArrowRight size={14} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
        </span>
      </Link>
    </article>
  )
}
