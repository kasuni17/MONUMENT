import { Link } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'
import PageIntro from '@/components/PageIntro'
import ArticleImage from '@/components/ArticleImage'
import Newsletter from '@/components/Newsletter'
import { ArrowRight } from '@/components/icons'
import { formatDateShort } from '@/lib/utils'

export default function Topics() {
  useSeo({
    title: 'Topics',
    description:
      'The nine sections MONUMENT publishes: technology, design, culture, business, lifestyle, travel, opinion, architecture and science.',
  })

  const { categories, authors } = useContent()
  const published = usePublishedPosts()

  const editorFor = (categoryId: string) => {
    const counts = new Map<string, number>()
    published
      .filter((p) => p.categoryId === categoryId)
      .forEach((p) => counts.set(p.authorId, (counts.get(p.authorId) ?? 0) + 1))
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
    return top ? authors.items.find((a) => a.id === top[0]) : undefined
  }

  return (
    <>
      <PageIntro
        eyebrow="Browse"
        title="Topics"
        description="Nine standing sections. Each has an editor, a point of view, and an argument it keeps returning to."
        meta={`${categories.items.length} sections · ${published.length} stories`}
      />

      <Container as="section" className="section-tight">
        <div className="space-y-14 lg:space-y-16">
          {categories.items.map((category, index) => {
            const posts = published.filter((p) => p.categoryId === category.id)
            const [lead, ...others] = posts
            const editor = editorFor(category.id)

            return (
              <article
                key={category.id}
                className={index > 0 ? 'border-t border-line pt-14 dark:border-line-dark lg:pt-16' : ''}
              >
                <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <Link to={`/category/${category.slug}`} className="focus-ring group block">
                      <ArticleImage
                        src={category.image}
                        alt={category.imageAlt}
                        ratio="landscape"
                        sizes="(min-width: 1024px) 520px, 94vw"
                        label={category.name}
                        zoom
                      />
                    </Link>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="display-md text-ink dark:text-paper">
                        <Link to={`/category/${category.slug}`} className="focus-ring group">
                          <span className="link-underline">{category.name}</span>
                        </Link>
                      </h2>
                      <p className="meta">
                        {posts.length} {posts.length === 1 ? 'story' : 'stories'}
                        {editor && <> · edited by {editor.name}</>}
                      </p>
                    </div>

                    <p className="lede mt-3 max-w-measure">{category.description}</p>

                    {lead && (
                      <div className="mt-6 border-t border-line pt-5 dark:border-line-dark">
                        <p className="eyebrow text-accent dark:text-accent-soft">Latest</p>
                        <h3 className="display-sm mt-2 text-ink dark:text-paper">
                          <Link to={`/blog/${lead.slug}`} className="focus-ring group">
                            <span className="link-underline">{lead.title}</span>
                          </Link>
                        </h3>
                        <p className="clamp-2 mt-2 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/60">
                          {lead.excerpt}
                        </p>
                      </div>
                    )}

                    {others.length > 0 && (
                      <ul className="mt-5 space-y-3">
                        {others.slice(0, 3).map((post) => (
                          <li key={post.id}>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="focus-ring group flex items-baseline justify-between gap-6"
                            >
                              <span className="min-w-0 text-sm text-ink-soft dark:text-paper/75">
                                <span className="link-underline">{post.title}</span>
                              </span>
                              <span className="meta hidden shrink-0 sm:block">
                                {formatDateShort(post.publishedAt)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      to={`/category/${category.slug}`}
                      className="focus-ring group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent dark:text-accent-soft"
                    >
                      Everything in {category.name}
                      <ArrowRight size={14} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>

      <Container as="section" className="pb-16">
        <Newsletter variant="panel" />
      </Container>
    </>
  )
}
