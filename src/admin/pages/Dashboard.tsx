import { Link } from 'react-router-dom'
import { useContent } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import SimpleLineChart from '../components/SimpleLineChart'
import { formatDate, formatDateShort, formatNumber } from '@/lib/utils'

function seededSeries(days: number, base: number, variance: number) {
  return Array.from({ length: days }, (_, i) => Math.max(0, Math.round(base + Math.sin(i / 3) * variance + (i / days) * variance)))
}

export default function Dashboard() {
  useSeo({ title: 'Admin Dashboard' })
  const { posts, authors, comments, subscribers } = useContent()

  const published = posts.items.filter((p) => p.status === 'published')
  const drafts = posts.items.filter((p) => p.status === 'draft')
  const scheduled = posts.items.filter((p) => p.status === 'scheduled').sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt))
  const totalViews = published.reduce((sum, p) => sum + p.views, 0)
  const activeSubscribers = subscribers.items.filter((s) => s.status === 'subscribed')
  const pendingComments = comments.items.filter((c) => c.status === 'pending')
  const recentComments = [...comments.items].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 5)
  const topArticles = [...published].sort((a, b) => b.views - a.views).slice(0, 5)
  const recentPosts = [...posts.items].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 6)
  const viewsSeries = seededSeries(30, Math.round(totalViews / 30) || 400, (Math.round(totalViews / 30) || 400) * 0.4)

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink dark:text-paper sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">An overview of MONUMENT&rsquo;s editorial performance.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Posts" value={String(posts.items.length)} change="12.4%" />
        <StatCard label="Published" value={String(published.length)} change="9.1%" />
        <StatCard label="Drafts" value={String(drafts.length)} />
        <StatCard label="Scheduled" value={String(scheduled.length)} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Authors" value={String(authors.items.length)} />
        <StatCard label="Categories" value={String(new Set(posts.items.map((p) => p.categoryId)).size)} />
        <StatCard label="Comments" value={String(comments.items.length)} change="11.3%" />
        <StatCard label="Subscribers" value={formatNumber(activeSubscribers.length)} change="8.2%" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Publishing Activity</h2>
            <span className="text-xs text-ink-muted">Views, last 30 days</span>
          </div>
          <div className="mt-4">
            <SimpleLineChart data={viewsSeries} labels={viewsSeries.map((_, i) => `D${i + 1}`)} />
          </div>
        </div>
        <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Top Articles</h2>
          <ol className="mt-4 space-y-3">
            {topArticles.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3">
                <span className="font-serif text-lg font-bold text-line dark:text-line-dark">{i + 1}</span>
                <Link to={`/admin/posts/${p.id}/edit`} className="focus-ring flex-1 truncate text-sm font-medium text-ink hover:text-accent dark:text-paper">{p.title}</Link>
                <span className="text-xs text-ink-muted">{formatNumber(p.views)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Recent Posts</h2>
            <Link to="/admin/posts" className="focus-ring text-sm font-semibold text-accent">View all</Link>
          </div>
          <div className="mt-4 overflow-x-auto border border-line dark:border-line-dark">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-line bg-paper-dim text-left text-xs font-semibold uppercase tracking-wide text-ink-muted dark:border-line-dark dark:bg-surface-dark">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-0 dark:border-line-dark">
                    <td className="px-4 py-3">
                      <Link to={`/admin/posts/${p.id}/edit`} className="focus-ring font-medium text-ink hover:text-accent dark:text-paper">
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3 text-ink-muted">{formatDateShort(p.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Recent Comments</h2>
            <div className="mt-4 space-y-3">
              {recentComments.length === 0 ? (
                <p className="text-sm text-ink-muted">No comments yet.</p>
              ) : recentComments.map((c) => {
                const post = posts.items.find((p) => p.id === c.postId)
                return (
                  <div key={c.id} className="border border-line bg-paper p-4 dark:border-line-dark dark:bg-surface-darkAlt">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm"><span className="font-semibold text-ink dark:text-paper">{c.authorName}</span> <span className="text-ink-muted">on {post?.title ?? 'a post'}</span></p>
                      <StatusBadge status={c.status} />
                    </div>
                    <p className="mt-1.5 text-sm text-ink-muted line-clamp-2">{c.text}</p>
                    <p className="mt-1 text-xs text-ink-muted">{formatDate(c.date)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Needs Attention</h2>
          <div className="mt-4 space-y-3">
            <Link to="/admin/comments" className="focus-ring block border border-line bg-paper p-4 hover:border-accent dark:border-line-dark dark:bg-surface-darkAlt">
              <p className="text-sm font-semibold text-ink dark:text-paper">{pendingComments.length} comments pending review</p>
              <p className="mt-1 text-xs text-ink-muted">Approve, hide or delete new submissions.</p>
            </Link>
            <Link to="/admin/posts?status=draft" className="focus-ring block border border-line bg-paper p-4 hover:border-accent dark:border-line-dark dark:bg-surface-darkAlt">
              <p className="text-sm font-semibold text-ink dark:text-paper">{drafts.length} drafts in progress</p>
              <p className="mt-1 text-xs text-ink-muted">Finish and publish when ready.</p>
            </Link>
            <Link to="/admin/posts/new" className="focus-ring block border border-dashed border-line p-4 text-center hover:border-accent dark:border-line-dark">
              <p className="text-sm font-semibold text-accent">+ Write a new story</p>
            </Link>
          </div>

          <h2 className="mt-8 font-serif text-lg font-bold text-ink dark:text-paper">Scheduled Posts</h2>
          <div className="mt-4 space-y-3">
            {scheduled.length === 0 ? (
              <p className="text-sm text-ink-muted">Nothing scheduled right now.</p>
            ) : scheduled.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/admin/posts/${p.id}/edit`} className="focus-ring block border border-line bg-paper p-4 hover:border-accent dark:border-line-dark dark:bg-surface-darkAlt">
                <p className="text-sm font-medium text-ink dark:text-paper line-clamp-1">{p.title}</p>
                <p className="mt-1 text-xs text-ink-muted">Publishes {formatDate(p.publishedAt)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
