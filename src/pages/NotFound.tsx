import { Link } from 'react-router-dom'
import { useSeo } from '@/hooks/useSeo'
import { usePublishedPosts } from '@/lib/content'
import Container from '@/components/Container'
import EditorialCard from '@/components/EditorialCard'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'That page is not here. Some suggestions instead.' })
  const published = usePublishedPosts()
  const suggestions = published.slice(0, 3)

  return (
    <Container as="section" className="py-20 lg:py-28">
      <p className="eyebrow text-accent dark:text-accent-soft">Error 404</p>
      <h1 className="display-lg mt-4 max-w-2xl text-ink dark:text-paper">
        This page is not here, and probably never was.
      </h1>
      <p className="lede mt-4 max-w-measure">
        The address may be mistyped, or a story may have moved. Either way, here is something worth reading
        instead.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="focus-ring inline-flex min-h-[48px] items-center bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
        >
          Back to the front page
        </Link>
        <Link
          to="/blog"
          className="focus-ring inline-flex min-h-[48px] items-center border border-ink px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
        >
          Search the archive
        </Link>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-16 border-t border-line pt-10 dark:border-line-dark">
          <p className="eyebrow text-faint">Recently published</p>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
            {suggestions.map((post) => (
              <EditorialCard key={post.id} post={post} variant="standard" showExcerpt={false} />
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}
