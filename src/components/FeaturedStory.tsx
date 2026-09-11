import { Link } from 'react-router-dom'
import { Post } from '@/types'
import { useContent } from '@/lib/content'
import ArticleImage from './ArticleImage'
import AuthorMeta from './AuthorMeta'
import SaveButton from './SaveButton'
import { ArrowRight } from './icons'

interface FeaturedStoryProps {
  post: Post
  /** `split` runs the picture beside the headline, `stacked` puts it above. */
  layout?: 'split' | 'stacked'
  /** The lead story is the page heading on the front page, a section heading elsewhere. */
  as?: 'h1' | 'h2'
}

/**
 * The lead story. Deliberately the only place on the site that uses the
 * largest display size, so the front page has one obvious entry point.
 */
export default function FeaturedStory({ post, layout = 'split', as: Heading = 'h2' }: FeaturedStoryProps) {
  const { categories, authors } = useContent()
  const category = categories.items.find((c) => c.id === post.categoryId)
  const author = authors.items.find((a) => a.id === post.authorId)
  const href = `/blog/${post.slug}`

  const stacked = layout === 'stacked'

  return (
    <article
      className={
        stacked
          ? 'group flex flex-col'
          : 'group grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-12'
      }
    >
      <div className={stacked ? 'relative' : 'relative lg:col-span-7'}>
        <Link to={href} tabIndex={-1} aria-hidden="true" className="focus-ring block">
          <ArticleImage
            src={post.image}
            alt={post.imageAlt}
            ratio={stacked ? 'wide' : 'landscape'}
            loading="eager"
            fetchPriority="high"
            sizes={stacked ? '(min-width: 1024px) 840px, 94vw' : '(min-width: 1024px) 720px, 94vw'}
            label={category?.name}
            zoom
          />
        </Link>
        <SaveButton postId={post.id} title={post.title} className="absolute right-3 top-3" />
      </div>

      <div className={stacked ? 'pt-6' : 'lg:col-span-5'}>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-accent dark:text-accent-soft">{category?.name ?? 'Featured'}</span>
          <span className="h-px w-8 bg-line dark:bg-line-dark" aria-hidden="true" />
          <span className="eyebrow text-faint">The lead story</span>
        </div>

        <Heading className={`${stacked ? 'display-lg' : 'display-xl'} mt-4 text-ink dark:text-paper`}>
          <Link to={href} className="focus-ring">
            <span className="link-underline">{post.title}</span>
          </Link>
        </Heading>

        <p className="lede mt-5 max-w-measure">{post.excerpt}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
          <AuthorMeta author={author} date={post.publishedAt} readingTime={post.readingTime} variant="stacked" linked />
          <Link
            to={href}
            className="focus-ring group/cta inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent dark:border-paper dark:text-paper dark:hover:border-accent-soft dark:hover:text-accent-soft"
          >
            Read the story
            <ArrowRight size={15} className="transition-transform duration-300 ease-editorial group-hover/cta:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}
