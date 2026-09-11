import { Link } from 'react-router-dom'
import { Post } from '@/types'
import { useContent } from '@/lib/content'
import { formatNumber } from '@/lib/utils'
import Container from './Container'
import SectionHeader from './SectionHeader'
import ArticleImage from './ArticleImage'
import AuthorMeta from './AuthorMeta'
import { ArrowUpRight } from './icons'

interface TrendingSectionProps {
  posts: Post[]
}

function Rank({ value, tone = 'default' }: { value: number; tone?: 'default' | 'inverted' }) {
  return (
    <span
      aria-hidden="true"
      className={
        tone === 'inverted'
          ? 'font-display text-2xl font-semibold leading-none text-accent'
          : 'font-display text-2xl font-semibold leading-none text-faint'
      }
    >
      {String(value).padStart(2, '0')}
    </span>
  )
}

/**
 * Most-read, ranked, with deliberate hierarchy: the top story runs large with
 * a picture, the next two sit as a middle tier, and the remainder are typeset
 * as a ranked list. Five identical cards would read as a grid, not a chart.
 */
export default function TrendingSection({ posts }: TrendingSectionProps) {
  const { categories, authors } = useContent()
  if (posts.length === 0) return null

  const [lead, ...rest] = posts
  const middle = rest.slice(0, 2)
  const tail = rest.slice(2, 5)

  const categoryOf = (post: Post) => categories.items.find((c) => c.id === post.categoryId)
  const authorOf = (post: Post) => authors.items.find((a) => a.id === post.authorId)

  return (
    <section className="section-tight bg-paper-dim dark:bg-surface-darkAlt">
      <Container>
        <SectionHeader
          eyebrow="Most read"
          title="Trending now"
          action={{ to: '/trending', label: 'View all' }}
        />

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          {/* 01, the lead of the chart */}
          <article className="group lg:col-span-5">
            <div className="flex items-start gap-4">
              <Rank value={1} tone="inverted" />
              <div className="min-w-0 flex-1">
                <Link to={`/blog/${lead.slug}`} tabIndex={-1} aria-hidden="true" className="focus-ring block">
                  <ArticleImage
                    src={lead.image}
                    alt={lead.imageAlt}
                    ratio="landscape"
                    sizes="(min-width: 1024px) 460px, 88vw"
                    label={categoryOf(lead)?.name}
                    zoom
                  />
                </Link>
                <p className="eyebrow mt-4 text-accent dark:text-accent-soft">{categoryOf(lead)?.name}</p>
                <h3 className="display-md mt-2 text-ink dark:text-paper">
                  <Link to={`/blog/${lead.slug}`} className="focus-ring">
                    <span className="link-underline">{lead.title}</span>
                  </Link>
                </h3>
                <p className="clamp-2 mt-3 text-sm leading-relaxed text-ink-muted dark:text-paper/60">{lead.excerpt}</p>
                <AuthorMeta
                  author={authorOf(lead)}
                  date={lead.publishedAt}
                  readingTime={lead.readingTime}
                  className="mt-3"
                />
              </div>
            </div>
          </article>

          {/* 02 and 03, picture and headline at half weight */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {middle.map((post, i) => (
              <article key={post.id} className="group flex gap-4 border-t border-line pt-5 dark:border-line-dark lg:first:border-t-0 lg:first:pt-0">
                <Rank value={i + 2} />
                <div className="min-w-0 flex-1">
                  <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="focus-ring block">
                    <ArticleImage
                      src={post.image}
                      alt={post.imageAlt}
                      ratio="wide"
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 44vw, 80vw"
                      label={categoryOf(post)?.name}
                      zoom
                    />
                  </Link>
                  <p className="eyebrow mt-3 text-accent dark:text-accent-soft">{categoryOf(post)?.name}</p>
                  <h3 className="display-sm mt-1.5 text-ink dark:text-paper">
                    <Link to={`/blog/${post.slug}`} className="focus-ring">
                      <span className="link-underline">{post.title}</span>
                    </Link>
                  </h3>
                  <AuthorMeta date={post.publishedAt} readingTime={post.readingTime} className="mt-2" />
                </div>
              </article>
            ))}
          </div>

          {/* 04 and beyond, typeset as a chart */}
          <ol className="lg:col-span-3">
            {tail.map((post, i) => (
              <li key={post.id} className="border-t border-line first:border-t-0 dark:border-line-dark">
                <Link
                  to={`/blog/${post.slug}`}
                  className="focus-ring group flex items-start gap-4 py-4 first:pt-0"
                >
                  <Rank value={i + 4} />
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-faint">{categoryOf(post)?.name}</span>
                    <span className="mt-1.5 block font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink dark:text-paper">
                      <span className="link-underline">{post.title}</span>
                    </span>
                    <span className="meta mt-2 block">
                      {post.readingTime} min · {formatNumber(post.views)} reads
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 flex-none text-faint transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
