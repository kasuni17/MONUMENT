import { useEffect, useState } from "react";

export function ReadingProgressBar({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-hairline/30 dark:bg-dark-hairline/30">
      <div className="h-full bg-accent dark:bg-dark-accent transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}
