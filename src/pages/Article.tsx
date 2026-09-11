import { useRef } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import { formatDate, formatNumber } from '@/lib/utils'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import ArticleBody from '@/components/ArticleBody'
import ArticleImage from '@/components/ArticleImage'
import TableOfContents from '@/components/TableOfContents'
import ReadingProgress from '@/components/ReadingProgress'
import ShareBar from '@/components/ShareBar'
import SaveButton from '@/components/SaveButton'
import EditorialCard from '@/components/EditorialCard'
import Newsletter from '@/components/Newsletter'
import Comments from '@/components/Comments'
import { Post } from '@/types'

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const { posts, categories, authors, tags } = useContent()
  const published = usePublishedPosts()
  const articleRef = useRef<HTMLDivElement>(null)

  const post = posts.items.find((p) => p.slug === slug && p.status === 'published')

  useSeo({
    title: post?.seoTitle ?? post?.title ?? 'Story',
    description: post?.seoDescription ?? post?.excerpt,
    image: post?.image,
    type: 'article',
  })

  if (!post) return <Navigate to="/blog" replace />

  const category = categories.items.find((c) => c.id === post.categoryId)
  const author = authors.items.find((a) => a.id === post.authorId)

  const moreFromAuthor: Post[] = author
    ? published.filter((p) => p.authorId === author.id && p.id !== post.id).slice(0, 3)
    : []

  // Related skips anything already shown in the byline rail above it, so the
  // foot of the page never recommends the same story twice.
  const shown = new Set([post.id, ...moreFromAuthor.map((p) => p.id)])
  const related = published
    .filter((p) => !shown.has(p.id) && p.categoryId === post.categoryId)
    .concat(
      published.filter(
        (p) => !shown.has(p.id) && p.categoryId !== post.categoryId && p.tagIds.some((t) => post.tagIds.includes(t))
      )
    )
    .slice(0, 3)

  const postTags = post.tagIds
    .map((id) => tags.items.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => !!t)

  return (
    <>
      <ReadingProgress targetRef={articleRef} />

      <article ref={articleRef}>
        {/* Header, set on the reading measure so it lines up with the body */}
        <Container className="pt-10 lg:pt-14">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              {category && (
                <Link to={`/category/${category.slug}`} className="focus-ring eyebrow text-accent dark:text-accent-soft">
                  {category.name}
                </Link>
              )}
              <span className="h-px w-8 bg-line dark:bg-line-dark" aria-hidden="true" />
              <span className="eyebrow text-faint">{post.readingTime} min read</span>
            </div>

            <h1 className="display-xl mt-5 text-ink dark:text-paper">{post.title}</h1>
            <p className="lede mt-5 max-w-measure">{post.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 dark:border-line-dark">
              {author && (
                <Link to={`/author/${author.slug}`} className="focus-ring group flex items-center gap-3">
                  <img src={author.avatar} alt="" width={44} height={44} className="h-11 w-11 object-cover" />
                  <span>
                    <span className="block text-sm font-semibold text-ink dark:text-paper">
                      <span className="link-underline">{author.name}</span>
                    </span>
                    <span className="meta mt-0.5 block">
                      {author.role} · {formatDate(post.publishedAt)}
                    </span>
                  </span>
                </Link>
              )}
              <div className="flex items-center gap-2">
                <SaveButton postId={post.id} title={post.title} variant="labelled" />
              </div>
            </div>
          </div>
        </Container>

        {/* Lead photograph, full container width */}
        <Container className="mt-8">
          <figure>
            <ArticleImage
              src={post.image}
              alt={post.imageAlt}
              ratio="wide"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 1200px, 96vw"
              label={category?.name}
            />
            <figcaption className="mt-3 text-xs text-faint">{post.imageAlt}</figcaption>
          </figure>
        </Container>

        {/* Body with a sticky rail on wide screens */}
        <Container className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 space-y-8">
                <TableOfContents content={post.content} />
                <ShareBar postId={post.id} title={post.title} vertical />
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-4 xl:col-span-7">
              <div className="mb-8 lg:hidden">
                <ShareBar postId={post.id} title={post.title} />
              </div>

              <ArticleBody content={post.content} />

              {postTags.length > 0 && (
                <div className="mt-12 border-t border-line pt-6 dark:border-line-dark">
                  <p className="eyebrow text-faint">Filed under</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/tag/${tag.slug}`}
                        className="focus-ring border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper/70"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6 dark:border-line-dark lg:hidden">
                <ShareBar postId={post.id} title={post.title} />
                <SaveButton postId={post.id} title={post.title} />
              </div>

              {author && (
                <div className="mt-12 flex flex-col gap-5 border border-line p-6 dark:border-line-dark sm:flex-row sm:p-8">
                  <img src={author.avatar} alt="" width={80} height={80} className="h-20 w-20 flex-none object-cover" />
                  <div>
                    <p className="eyebrow text-faint">Written by</p>
                    <h2 className="display-sm mt-2 text-ink dark:text-paper">
                      <Link to={`/author/${author.slug}`} className="focus-ring group">
                        <span className="link-underline">{author.name}</span>
                      </Link>
                    </h2>
                    <p className="meta mt-1">{author.role}, based in {author.location}</p>
                    <p className="mt-3 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/65">
                      {author.bio}
                    </p>
                  </div>
                </div>
              )}

              <p className="meta mt-6">{formatNumber(post.views)} reads since publication</p>

              <div className="mt-12">
                <Comments postId={post.id} />
              </div>
            </div>
          </div>
        </Container>
      </article>

      {moreFromAuthor.length > 0 && author && (
        <section className="section-tight border-y border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
          <Container>
            <SectionHeader
              eyebrow="Same byline"
              title={`More from ${author.name}`}
              action={{ to: `/author/${author.slug}`, label: 'All their work' }}
            />
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-3">
              {moreFromAuthor.map((p) => (
                <EditorialCard key={p.id} post={p} variant="standard" showExcerpt={false} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <Container as="section" className="section-tight">
          <SectionHeader
            eyebrow="Keep reading"
            title="Related stories"
            action={{ to: category ? `/category/${category.slug}` : '/blog', label: 'More like this' }}
          />
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-3">
            {related.map((p) => (
              <EditorialCard key={p.id} post={p} variant="standard" />
            ))}
          </div>
        </Container>
      )}

      <Container as="section" className="pb-16">
        <Newsletter />
      </Container>
    </>
  )
}
