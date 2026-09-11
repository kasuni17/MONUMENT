import { Link } from 'react-router-dom'
import { Collection } from '@/data/collections'
import ArticleImage from './ArticleImage'
import { ArrowRight } from './icons'
import { classNames } from '@/lib/utils'

interface CollectionCardProps {
  collection: Collection
  count: number
  className?: string
  variant?: 'standard' | 'lead'
}

export default function CollectionCard({ collection, count, className, variant = 'standard' }: CollectionCardProps) {
  const href = `/collections/${collection.slug}`
  const lead = variant === 'lead'

  return (
    <article className={classNames('group', className)}>
      <Link to={href} className="focus-ring block">
        <ArticleImage
          src={collection.image}
          alt={collection.imageAlt}
          ratio={lead ? 'landscape' : 'wide'}
          sizes={lead ? '(min-width: 1024px) 640px, 94vw' : '(min-width: 1024px) 380px, 92vw'}
          label={collection.name}
          zoom
        />
        <div className="pt-5">
          <p className="eyebrow text-accent dark:text-accent-soft">
            Collection · {count} {count === 1 ? 'story' : 'stories'}
          </p>
          <h3 className={classNames(lead ? 'display-md' : 'display-sm', 'mt-2 text-ink dark:text-paper')}>
            <span className="link-underline">{collection.name}</span>
          </h3>
          <p className="mt-2 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/60">
            {collection.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft dark:text-paper/75">
            Open the collection
            <ArrowRight size={14} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  )
}
