import { useEffect, useState } from 'react'

export default function ReadingProgress({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = targetRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [targetRef])

  return (
    <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent" aria-hidden="true">
      <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}
