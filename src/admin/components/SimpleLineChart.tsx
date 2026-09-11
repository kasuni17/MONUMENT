interface SimpleLineChartProps {
  data: number[]
  labels: string[]
  color?: string
  height?: number
}

export default function SimpleLineChart({ data, labels, color = '#8A3B2A', height = 200 }: SimpleLineChartProps) {
  const width = 100
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1 || 1)) * width
    const y = height - ((v - min) / range) * (height - 20) - 10
    return `${x},${y}`
  })
  const path = 'M' + points.join(' L')
  const areaPath = `${path} L${width},${height} L0,${height} Z`
  const step = Math.max(1, Math.floor(labels.length / 6))

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-48 w-full sm:h-56" role="img" aria-label="Line chart">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartFill)" stroke="none" />
        <path d={path} fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-ink-muted">
        {labels.filter((_, i) => i % step === 0).map((l, i) => <span key={i}>{l}</span>)}
      </div>
    </div>
  )
}
