import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { api } from "@/lib/api";
import { Story } from "@/types";
import { addRecentSearch, getRecentSearches } from "@/lib/recentSearches";

const TRENDING_SEARCHES = ["Artificial Intelligence", "Remote Work", "Startups", "Climate", "Design Systems"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["search-preview", debounced],
    queryFn: () => api.get<{ items: Story[] }>(`/search?q=${encodeURIComponent(debounced)}`),
    enabled: debounced.trim().length >= 2,
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function runSearch(q: string) {
    if (!q.trim()) return;
    addRecentSearch(q);
    onClose();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 left-0 right-0 bg-ivory dark:bg-dark-bg border-b hairline max-h-[85vh] overflow-y-auto">
        <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runSearch(query);
            }}
            className="flex items-center gap-4 border-b-2 border-ink dark:border-dark-ink pb-4"
          >
            <Search size={22} className="text-ink-soft dark:text-dark-ink/60 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories, topics, authors…"
              className="flex-1 bg-transparent font-serif text-2xl md:text-3xl outline-none placeholder:text-ink-soft/50 dark:placeholder:text-dark-ink/30"
            />
            <button type="button" onClick={onClose} aria-label="Close search" className="shrink-0">
              <X size={22} />
            </button>
          </form>

          <div className="mt-8">
            {debounced.trim().length >= 2 ? (
              <div>
                <p className="kicker mb-4">{isFetching ? "Searching…" : `${data?.items.length ?? 0} results`}</p>
                <div className="space-y-1">
                  {data?.items.slice(0, 6).map((story) => (
                    <button
                      key={story.id}
                      onClick={() => {
                        addRecentSearch(query);
                        onClose();
                        navigate(`/stories/${story.slug}`);
                      }}
                      className="w-full text-left flex items-center gap-4 py-3 border-b hairline hover:bg-hairline/20 dark:hover:bg-dark-hairline/20 transition-colors px-2 -mx-2"
                    >
                      <img src={story.coverImage} alt="" className="w-14 h-14 object-cover shrink-0" />
                      <div className="min-w-0">
                        <span className="kicker">{story.category.name}</span>
                        <p className="font-serif text-base font-medium truncate">{story.title}</p>
                      </div>
                    </button>
                  ))}
                  {data && data.items.length === 0 && !isFetching && (
                    <p className="text-sm text-ink-soft dark:text-dark-ink/60 py-6">
                      No stories found for "{debounced}". Try a different term.
                    </p>
                  )}
                </div>
                {data && data.items.length > 0 && (
                  <button
                    onClick={() => runSearch(query)}
                    className="mt-4 text-sm font-medium text-accent hover:underline"
                  >
                    See all results →
                  </button>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="kicker mb-4 flex items-center gap-1.5">
                    <Clock size={12} /> Recent Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getRecentSearches().length === 0 && (
                      <span className="text-sm text-ink-soft dark:text-dark-ink/50">No recent searches yet</span>
                    )}
                    {getRecentSearches().map((s) => (
                      <button
                        key={s}
                        onClick={() => runSearch(s)}
                        className="px-3 py-1.5 border hairline text-sm hover:border-accent hover:text-accent transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="kicker mb-4 flex items-center gap-1.5">
                    <TrendingUp size={12} /> Trending Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((s) => (
                      <button
                        key={s}
                        onClick={() => runSearch(s)}
                        className="px-3 py-1.5 border hairline text-sm hover:border-accent hover:text-accent transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
