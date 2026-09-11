import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import SimpleLineChart from '../components/SimpleLineChart'
import SimpleBarChart from '../components/SimpleBarChart'
import { formatNumber } from '@/lib/utils'

type Range = '7d' | '30d' | '90d' | '12m'

const rangeDays: Record<Range, number> = { '7d': 7, '30d': 30, '90d': 90, '12m': 365 }

function seededSeries(days: number, base: number, variance: number) {
  const data: number[] = []
  for (let i = 0; i < days; i++) {
    data.push(Math.max(0, Math.round(base + Math.sin(i / 3) * variance + (i / days) * variance)))
  }
  return data
}

export default function Analytics() {
  useSeo({ title: 'Analytics' })
  const { posts, categories, subscribers } = useContent()
  const [range, setRange] = useState<Range>('30d')

  const days = rangeDays[range]
  const viewsSeries = useMemo(() => seededSeries(Math.min(days, 60), 3200, 900), [days])
  const subsSeries = useMemo(() => seededSeries(Math.min(days, 60), 120, 40), [days])
  const labels = useMemo(() => Array.from({ length: viewsSeries.length }, (_, i) => `D${i + 1}`), [viewsSeries])

  const published = posts.items.filter((p) => p.status === 'published')
  const topArticles = [...published].sort((a, b) => b.views - a.views).slice(0, 6)

  const categoryPerformance = categories.items
    .map((c) => ({ label: c.name, value: published.filter((p) => p.categoryId === c.id).reduce((s, p) => s + p.views, 0) }))
    .sort((a, b) => b.value - a.value)

  const totalViews = published.reduce((s, p) => s + p.views, 0)
  const avgReadingTime = published.length ? Math.round(published.reduce((s, p) => s + p.readingTime, 0) / published.length) : 0

  const rangeLabels: { key: Range; label: string }[] = [
    { key: '7d', label: '7 days' },
    { key: '30d', label: '30 days' },
    { key: '90d', label: '90 days' },
    { key: '12m', label: '12 months' },
  ]

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Editorial performance across the publication."
        action={
          <div className="flex gap-1 border border-line dark:border-line-dark">
            {rangeLabels.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`focus-ring min-h-[36px] px-3 text-xs font-semibold ${range === r.key ? 'bg-ink text-paper dark:bg-paper dark:text-ink' : 'text-ink-muted'}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Views" value={formatNumber(totalViews)} change="18.7%" />
        <StatCard label="Articles Published" value={String(published.length)} change="12.4%" />
        <StatCard label="Subscribers" value={formatNumber(subscribers.items.filter((s) => s.status === 'subscribed').length)} change="8.2%" />
        <StatCard label="Avg. Reading Time" value={`${avgReadingTime} min`} change="3.1%" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Views over time</h2>
          <div className="mt-4">
            <SimpleLineChart data={viewsSeries} labels={labels} />
          </div>
        </div>
        <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Subscriber growth</h2>
          <div className="mt-4">
            <SimpleLineChart data={subsSeries} labels={labels} color="#3A352E" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Category performance</h2>
          <div className="mt-4">
            <SimpleBarChart data={categoryPerformance} />
          </div>
        </div>
        <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
          <h2 className="font-serif text-lg font-bold text-ink dark:text-paper">Top articles</h2>
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
    </div>
  )
}
