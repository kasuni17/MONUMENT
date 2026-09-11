import { Link } from 'react-router-dom'
import { Post } from '@/types'
import { useContent } from '@/lib/content'
import { classNames } from '@/lib/utils'
import ArticleImage, { ImageRatio } from './ArticleImage'
import AuthorMeta from './AuthorMeta'
import SaveButton from './SaveButton'

export type CardVariant =
  | 'feature' // big image, large headline, standfirst
  | 'standard' // the workhorse grid card
  | 'row' // image left, text right, for lists
  | 'compact' // text only, separated by a rule
  | 'portrait' // tall image, for editor's picks

interface EditorialCardProps {
  post: Post
  variant?: CardVariant
  priority?: boolean
  showExcerpt?: boolean
  showSave?: boolean
  ratio?: ImageRatio
  className?: string
  /** Rendered above the headline instead of the category, when set. */
  kicker?: string
}

const headlineSize: Record<CardVariant, string> = {
  feature: 'display-md',
  standard: 'display-sm',
  row: 'display-sm',
  compact: 'font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]',
  portrait: 'display-sm',
}

/**
 * One card, five shapes. Pages compose these rather than inventing their own
 * layouts, which is what keeps type sizes, image ratios and metadata
 * consistent from the homepage through to a tag archive.
 */
export default function EditorialCard({
  post,
  variant = 'standard',
  priority = false,
  showExcerpt = true,
  showSave = false,
  ratio,
  className,
  kicker,
}: EditorialCardProps) {
  const { categories, authors } = useContent()
  const category = categories.items.find((c) => c.id === post.categoryId)
  const author = authors.items.find((a) => a.id === post.authorId)
  const href = `/blog/${post.slug}`
  const loading = priority ? 'eager' : 'lazy'
  const label = kicker ?? category?.name

  const eyebrow = label ? (
    <p className="eyebrow text-accent dark:text-accent-soft">{label}</p>
  ) : null

  const headline = (
    <h3 className={classNames(headlineSize[variant], 'text-ink dark:text-paper')}>
      <Link to={href} className="focus-ring">
        <span className="link-underline">{post.title}</span>
      </Link>
    </h3>
  )

  const meta = (
    <AuthorMeta author={author} date={post.publishedAt} readingTime={post.readingTime} className="mt-3" />
  )

  const picture = (defaultRatio: ImageRatio, sizes: string) => (
    <div className="relative">
      <Link to={href} tabIndex={-1} aria-hidden="true" className="block focus-ring">
        <ArticleImage
          src={post.image}
          alt={post.imageAlt}
          ratio={ratio ?? defaultRatio}
          loading={loading}
          fetchPriority={priority ? 'high' : undefined}
          sizes={sizes}
          label={category?.name}
          zoom
        />
      </Link>
      {showSave && <SaveButton postId={post.id} title={post.title} className="absolute right-3 top-3" />}
    </div>
  )

  if (variant === 'compact') {
    return (
      <article className={classNames('group', className)}>
        {eyebrow}
        <div className="mt-1.5">{headline}</div>
        <AuthorMeta date={post.publishedAt} readingTime={post.readingTime} className="mt-2" />
      </article>
    )
  }

  if (variant === 'row') {
    return (
      <article className={classNames('group flex gap-4 sm:gap-6', className)}>
        <div className="w-28 flex-none sm:w-44 lg:w-52">
          {picture('classic', '(min-width: 1024px) 208px, (min-width: 640px) 176px, 112px')}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          {eyebrow}
          <div className="mt-1.5">{headline}</div>
          {showExcerpt && (
            <p className="clamp-2 mt-2 hidden text-sm leading-relaxed text-ink-muted dark:text-paper/60 sm:block">
              {post.excerpt}
            </p>
          )}
          <AuthorMeta author={author} date={post.publishedAt} readingTime={post.readingTime} className="mt-2.5" />
        </div>
      </article>
    )
  }

  if (variant === 'portrait') {
    return (
      <article className={classNames('group flex flex-col', className)}>
        {picture('portrait', '(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw')}
        <div className="pt-4">
          {eyebrow}
          <div className="mt-1.5">{headline}</div>
          <AuthorMeta author={author} date={post.publishedAt} className="mt-2.5" />
        </div>
      </article>
    )
  }

  if (variant === 'feature') {
    return (
      <article className={classNames('group flex flex-col', className)}>
        {picture('wide', '(min-width: 1024px) 720px, 94vw')}
        <div className="pt-5">
          {eyebrow}
          <div className="mt-2">{headline}</div>
          {showExcerpt && (
            <p className="mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-ink-muted dark:text-paper/65">
              {post.excerpt}
            </p>
          )}
          {meta}
        </div>
      </article>
    )
  }

  return (
    <article className={classNames('group flex flex-col', className)}>
      {picture('classic', '(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw')}
      <div className="pt-4">
        {eyebrow}
        <div className="mt-1.5">{headline}</div>
        {showExcerpt && (
          <p className="clamp-2 mt-2 text-sm leading-relaxed text-ink-muted dark:text-paper/60">{post.excerpt}</p>
        )}
        {meta}
      </div>
    </article>
  )
}
