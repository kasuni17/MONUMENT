import { Link } from 'react-router-dom'
import { useBookmarks } from '@/lib/bookmarks'
import { useContent } from '@/lib/content'
import Container from '@/components/Container'
import PageIntro from '@/components/PageIntro'
import EditorialCard from '@/components/EditorialCard'
import EmptyState from '@/components/EmptyState'
import { useSeo } from '@/hooks/useSeo'
import { useToast } from '@/lib/toast'

export default function Bookmarks() {
  useSeo({
    title: 'Your reading list',
    description: 'Stories you have set aside to read later in this session.',
  })

  const { bookmarks, clearBookmarks } = useBookmarks()
  const { posts } = useContent()
  const { showToast } = useToast()

  const saved = posts.items.filter((p) => bookmarks.includes(p.id) && p.status === 'published')
  const minutes = saved.reduce((sum, p) => sum + p.readingTime, 0)

  return (
    <>
      <PageIntro
        eyebrow="Set aside"
        title="Your reading list"
        description="Saved stories live in this tab only. Close it and the list clears, because MONUMENT keeps nothing about you anywhere."
        meta={saved.length > 0 ? `${saved.length} saved · about ${minutes} minutes of reading` : undefined}
      >
        {saved.length > 0 && (
          <button
            type="button"
            onClick={() => {
              clearBookmarks()
              showToast('Reading list cleared.', 'success')
            }}
            className="focus-ring mt-4 min-h-[44px] border border-line px-5 text-sm font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink dark:border-line-dark dark:text-paper/75 dark:hover:border-paper dark:hover:text-paper"
          >
            Clear the list
          </button>
        )}
      </PageIntro>

      <Container as="section" className="section-tight">
        {saved.length === 0 ? (
          <EmptyState
            title="Nothing set aside yet."
            description="Use the save mark on any story and it will wait here until you close the tab."
            action={
              <Link
                to="/blog"
                className="focus-ring inline-flex min-h-[44px] items-center bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
              >
                Find something to read
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((post) => (
              <EditorialCard key={post.id} post={post} variant="standard" showSave />
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
