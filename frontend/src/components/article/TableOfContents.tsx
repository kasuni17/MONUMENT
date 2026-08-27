import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function useToc(containerRef: React.RefObject<HTMLElement>, content: string): TocItem[] {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const headings = Array.from(el.querySelectorAll("h2, h3"));
    const toc: TocItem[] = headings.map((h, i) => {
      const id = h.id || `section-${i}`;
      h.id = id;
      return { id, text: h.textContent || "", level: h.tagName === "H2" ? 2 : 3 };
    });
    setItems(toc);
  }, [containerRef, content]);

  return items;
}

export function DesktopToc({ items, activeId }: { items: TocItem[]; activeId: string | null }) {
  if (items.length < 2) return null;
  return (
    <nav className="sticky top-24 hidden xl:block">
      <p className="kicker mb-4">On This Page</p>
      <ul className="space-y-2.5 border-l hairline">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1.75rem" : "1rem" }}>
            <a
              href={`#${item.id}`}
              className={cx(
                "block text-sm leading-snug transition-colors -ml-px border-l-2 pl-3.5",
                activeId === item.id
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-ink-soft dark:text-dark-ink/60 hover:text-ink dark:hover:text-dark-ink"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileToc({ items, activeId }: { items: TocItem[]; activeId: string | null }) {
  const [open, setOpen] = useState(false);
  if (items.length < 2) return null;

  return (
    <div className="xl:hidden border hairline mb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium"
      >
        On This Page
        <ChevronDown size={16} className={cx("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul className="px-4 pb-4 space-y-2.5 border-t hairline pt-3">
          {items.map((item) => (
            <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1rem" : 0 }}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cx("block text-sm", activeId === item.id ? "text-accent font-medium" : "text-ink-soft dark:text-dark-ink/60")}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    function onScroll() {
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 120) current = item.id;
      }
      setActiveId(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return activeId;
}
