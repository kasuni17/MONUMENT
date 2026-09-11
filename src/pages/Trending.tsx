import { Link } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'
import PageIntro from '@/components/PageIntro'
import FeaturedStory from '@/components/FeaturedStory'
import EditorialCard from '@/components/EditorialCard'
import Newsletter from '@/components/Newsletter'
import { formatNumber } from '@/lib/utils'

export default function Trending() {
  useSeo({
    title: 'Trending',
    description: 'The most-read stories on MONUMENT, ranked by readership across the archive.',
  })

  const published = usePublishedPosts()
  const { categories } = useContent()
  const ranked = [...published].sort((a, b) => b.views - a.views)

  const [lead, ...rest] = ranked
  const podium = rest.slice(0, 3)
  const chart = rest.slice(3, 20)

  return (
    <>
      <PageIntro
        eyebrow="Most read"
        title="Trending now"
        description="What readers actually finished this month, ranked by readership rather than by how recently we published it."
        meta={`Top ${Math.min(ranked.length, 20)} of ${ranked.length} stories`}
      />

      <Container as="section" className="section-tight">
        <div className="flex items-start gap-5">
          <span aria-hidden="true" className="font-display text-4xl font-semibold leading-none text-accent">
            01
          </span>
          <div className="min-w-0 flex-1">
            <FeaturedStory post={lead} />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-line pt-12 dark:border-line-dark md:grid-cols-3">
          {podium.map((post, i) => (
            <div key={post.id} className="flex gap-4">
              <span
                aria-hidden="true"
                className="font-display text-2xl font-semibold leading-none text-faint"
              >
                {String(i + 2).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <EditorialCard post={post} variant="standard" showExcerpt={false} />
              </div>
            </div>
          ))}
        </div>

        {chart.length > 0 && (
          <ol className="mt-14 border-t border-line dark:border-line-dark">
            {chart.map((post, i) => {
              const category = categories.items.find((c) => c.id === post.categoryId)
              return (
                <li key={post.id} className="border-b border-line dark:border-line-dark">
                  <Link to={`/blog/${post.slug}`} className="focus-ring group grid grid-cols-12 items-baseline gap-4 py-5">
                    <span
                      aria-hidden="true"
                      className="col-span-2 font-display text-lg font-semibold text-faint sm:col-span-1"
                    >
                      {String(i + 5).padStart(2, '0')}
                    </span>
                    <span className="col-span-10 sm:col-span-7">
                      <span className="block font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink dark:text-paper">
                        <span className="link-underline">{post.title}</span>
                      </span>
                      <span className="meta mt-1.5 block sm:hidden">
                        {category?.name} · {formatNumber(post.views)} reads
                      </span>
                    </span>
                    <span className="meta col-span-2 hidden sm:block">{category?.name}</span>
                    <span className="meta col-span-2 hidden text-right sm:block">
                      {formatNumber(post.views)} reads
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        )}
      </Container>

      <Container as="section" className="pb-16">
        <Newsletter variant="panel" />
      </Container>
    </>
  )
}
