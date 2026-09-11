import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import FeaturedStory from '@/components/FeaturedStory'
import EditorialCard from '@/components/EditorialCard'
import ArticleImage from '@/components/ArticleImage'
import EmptyState from '@/components/EmptyState'
import Newsletter from '@/components/Newsletter'
import { useSeo } from '@/hooks/useSeo'

const PAGE_SIZE = 9

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const { categories, authors } = useContent()
  const published = usePublishedPosts()
  const [visible, setVisible] = useState(PAGE_SIZE)

  const category = categories.items.find((c) => c.slug === slug)

  useSeo({
    title: category ? category.name : 'Section',
    description: category?.description,
    image: category?.image,
  })

  if (!category) return <Navigate to="/blog" replace />

  const posts = published.filter((p) => p.categoryId === category.id)
  const [lead, ...rest] = posts
  const secondary = rest.slice(0, 3)
  const remainder = rest.slice(3)

  const contributors = Array.from(new Set(posts.map((p) => p.authorId)))
    .map((id) => authors.items.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => !!a)
    .slice(0, 5)

  return (
    <>
      <Container as="header" className="border-b border-line pb-10 pt-10 dark:border-line-dark lg:pt-14">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <Link to="/categories" className="focus-ring eyebrow text-faint transition-colors hover:text-accent">
                Topics
              </Link>
              <span className="h-px w-6 bg-line dark:bg-line-dark" aria-hidden="true" />
              <span className="eyebrow text-accent dark:text-accent-soft">Section</span>
            </div>
            <h1 className="display-xl mt-4 text-ink dark:text-paper">{category.name}</h1>
            <p className="lede mt-4 max-w-measure">{category.description}</p>
            <p className="meta mt-6">
              {posts.length} {posts.length === 1 ? 'story' : 'stories'}
              {contributors.length > 0 && <> · written by {contributors.map((c) => c.name).join(', ')}</>}
            </p>
          </div>
          <div className="lg:col-span-5">
            <ArticleImage
              src={category.image}
              alt={category.imageAlt}
              ratio="landscape"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 520px, 94vw"
              label={category.name}
            />
          </div>
        </div>
      </Container>

      <Container as="section" className="section-tight">
        {posts.length === 0 ? (
          <EmptyState
            title="This section is just getting started."
            description="Nothing has been published here yet. The rest of the archive is open in the meantime."
            action={
              <Link
                to="/blog"
                className="focus-ring inline-flex min-h-[44px] items-center border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
              >
                Read the archive
              </Link>
            }
          />
        ) : (
          <>
            <FeaturedStory post={lead} />

            {secondary.length > 0 && (
              <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-9 border-t border-line pt-12 dark:border-line-dark md:grid-cols-3">
                {secondary.map((post) => (
                  <EditorialCard key={post.id} post={post} variant="standard" showSave />
                ))}
              </div>
            )}

            {remainder.length > 0 && (
              <div className="mt-16">
                <SectionHeader eyebrow="From the archive" title={`More in ${category.name}`} />
                <div className="mt-8 space-y-8">
                  {remainder.slice(0, visible).map((post) => (
                    <div key={post.id} className="border-b border-line pb-8 last:border-b-0 dark:border-line-dark">
                      <EditorialCard post={post} variant="row" />
                    </div>
                  ))}
                </div>

                {visible < remainder.length && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="focus-ring min-h-[48px] border border-ink px-10 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
                    >
                      Load more from {category.name}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Container>

      <Container as="section" className="pb-16">
        <Newsletter variant="panel" />
      </Container>
    </>
  )
}
