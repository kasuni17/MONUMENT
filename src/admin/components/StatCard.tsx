interface StatCardProps {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down'
}

export default function StatCard({ label, value, change, trend = 'up' }: StatCardProps) {
  return (
    <div className="border border-line bg-paper p-5 dark:border-line-dark dark:bg-surface-darkAlt">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-2 font-serif text-3xl font-bold text-ink dark:text-paper">{value}</p>
      {change && (
        <p className={`mt-1.5 text-xs font-semibold ${trend === 'up' ? 'text-emerald-700 dark:text-emerald-400' : 'text-accent'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  )
}
