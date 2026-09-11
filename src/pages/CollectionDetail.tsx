import { Link, Navigate, useParams } from 'react-router-dom'
import { collections, getCollectionBySlug } from '@/data/collections'
import { usePublishedPosts } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import EditorialCard from '@/components/EditorialCard'
import CollectionCard from '@/components/CollectionCard'
import ArticleImage from '@/components/ArticleImage'
import EmptyState from '@/components/EmptyState'
import Newsletter from '@/components/Newsletter'

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const collection = slug ? getCollectionBySlug(slug) : undefined
  const published = usePublishedPosts()

  useSeo({
    title: collection?.name ?? 'Collection',
    description: collection?.description,
    image: collection?.image,
  })

  if (!collection) return <Navigate to="/collections" replace />

  // Ordered by the collection, not by date: the sequence is the argument.
  const posts = collection.storySlugs
    .map((storySlug) => published.find((p) => p.slug === storySlug))
    .filter((p): p is NonNullable<typeof p> => !!p)

  const [opener, ...rest] = posts
  const others = collections.filter((c) => c.id !== collection.id).slice(0, 3)
  const minutes = posts.reduce((sum, p) => sum + p.readingTime, 0)

  return (
    <>
      <Container as="header" className="border-b border-line pb-10 pt-10 dark:border-line-dark lg:pt-14">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <Link to="/collections" className="focus-ring eyebrow text-faint transition-colors hover:text-accent">
                Collections
              </Link>
              <span className="h-px w-6 bg-line dark:bg-line-dark" aria-hidden="true" />
              <span className="eyebrow text-accent dark:text-accent-soft">
                {posts.length} {posts.length === 1 ? 'story' : 'stories'} · {minutes} min
              </span>
            </div>
            <h1 className="display-xl mt-4 text-ink dark:text-paper">{collection.name}</h1>
            <p className="lede mt-4 max-w-measure">{collection.note}</p>
          </div>
          <div className="lg:col-span-5">
            <ArticleImage
              src={collection.image}
              alt={collection.imageAlt}
              ratio="landscape"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 520px, 94vw"
              label={collection.name}
            />
          </div>
        </div>
      </Container>

      <Container as="section" className="section-tight">
        {posts.length === 0 ? (
          <EmptyState
            title="This collection is still being assembled."
            description="The stories in it have not been published yet. Try another collection in the meantime."
            action={
              <Link
                to="/collections"
                className="focus-ring inline-flex min-h-[44px] items-center border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
              >
                Back to collections
              </Link>
            }
          />
        ) : (
          <ol className="space-y-10">
            {opener && (
              <li className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
                <div className="flex items-start gap-4 lg:col-span-12">
                  <span aria-hidden="true" className="font-display text-2xl font-semibold leading-none text-accent">
                    01
                  </span>
                  <div className="min-w-0 flex-1">
                    <EditorialCard post={opener} variant="feature" priority showSave />
                  </div>
                </div>
              </li>
            )}
            {rest.map((post, i) => (
              <li key={post.id} className="border-t border-line pt-10 dark:border-line-dark">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-semibold leading-none text-faint"
                  >
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <EditorialCard post={post} variant="row" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Container>

      {others.length > 0 && (
        <section className="section-tight border-t border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
          <Container>
            <SectionHeader
              eyebrow="Keep going"
              title="Other collections"
              action={{ to: '/collections', label: 'All collections' }}
            />
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
              {others.map((other) => (
                <CollectionCard key={other.id} collection={other} count={other.storySlugs.length} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Container as="section" className="section-tight">
        <Newsletter />
      </Container>
    </>
  )
}
