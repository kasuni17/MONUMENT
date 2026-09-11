interface SimpleBarChartProps {
  data: { label: string; value: number }[]
  color?: string
}

export default function SimpleBarChart({ data, color = '#8A3B2A' }: SimpleBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex justify-between text-xs text-ink-muted">
            <span>{d.label}</span>
            <span className="font-medium text-ink dark:text-paper">{d.value.toLocaleString()}</span>
          </div>
          <div className="h-2 w-full bg-paper-dim dark:bg-surface-dark">
            <div className="h-full" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }} />
          </div>
        </div>
      ))}
    </div>
  )
}
