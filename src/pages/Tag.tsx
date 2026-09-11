import { Link, Navigate, useParams } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import Container from '@/components/Container'
import PageIntro from '@/components/PageIntro'
import EditorialCard from '@/components/EditorialCard'
import EmptyState from '@/components/EmptyState'
import { useSeo } from '@/hooks/useSeo'

export default function TagPage() {
  const { slug } = useParams<{ slug: string }>()
  const { tags } = useContent()
  const published = usePublishedPosts()

  const tag = tags.items.find((t) => t.slug === slug)
  useSeo({
    title: tag ? tag.name : 'Tag',
    description: tag ? `Every MONUMENT story filed under ${tag.name}.` : undefined,
  })

  if (!tag) return <Navigate to="/blog" replace />

  const posts = published.filter((p) => p.tagIds.includes(tag.id))
  const related = tags.items
    .filter((t) => t.id !== tag.id)
    .filter((t) => posts.some((p) => p.tagIds.includes(t.id)))
    .slice(0, 8)

  return (
    <>
      <PageIntro
        eyebrow="Filed under"
        title={tag.name}
        description={`Everything we have published on ${tag.name.toLowerCase()}, newest first.`}
        meta={`${posts.length} ${posts.length === 1 ? 'story' : 'stories'}`}
      />

      <Container as="section" className="section-tight">
        {posts.length === 0 ? (
          <EmptyState
            title="Nothing filed here yet."
            description="This tag is waiting for its first story. Try another subject in the meantime."
            action={
              <Link
                to="/categories"
                className="focus-ring inline-flex min-h-[44px] items-center border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
              >
                Browse topics
              </Link>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <EditorialCard key={post.id} post={post} variant="standard" priority={i < 3} showSave />
              ))}
            </div>

            {related.length > 0 && (
              <div className="mt-16 border-t border-line pt-8 dark:border-line-dark">
                <p className="eyebrow text-faint">Often filed alongside</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {related.map((t) => (
                    <Link
                      key={t.id}
                      to={`/tag/${t.slug}`}
                      className="focus-ring border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper/70"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  )
}
