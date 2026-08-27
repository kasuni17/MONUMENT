import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Search as SearchIcon } from "lucide-react";
import { api } from "@/lib/api";
import { Story, Category } from "@/types";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [input, setInput] = useState(q);
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get<Category[]>("/categories"),
  });

  const params = new URLSearchParams({ q });
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search-full", params.toString()],
    queryFn: () => api.get<{ items: Story[]; total: number }>(`/search?${params.toString()}`),
    enabled: q.trim().length >= 2,
  });

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Helmet>
        <title>{q ? `Search: ${q}` : "Search"} — MONUMENT</title>
      </Helmet>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParam("q", input);
        }}
        className="flex items-center gap-3 border-b-2 border-ink dark:border-dark-ink pb-4 mb-8"
      >
        <SearchIcon size={22} className="shrink-0" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search MONUMENT…"
          className="flex-1 bg-transparent font-serif text-2xl md:text-3xl outline-none"
        />
      </form>

      {q.trim().length >= 2 && (
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <select
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="bg-transparent border hairline px-3 py-1.5 text-sm outline-none"
          >
            <option value="">All Topics</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="bg-transparent border hairline px-3 py-1.5 text-sm outline-none"
          >
            <option value="">Newest</option>
            <option value="popular">Most Popular</option>
          </select>
          <span className="text-sm text-ink-soft dark:text-dark-ink/60 ml-auto">
            {isFetching ? "Searching…" : `${data?.total ?? 0} results for "${q}"`}
          </span>
        </div>
      )}

      {q.trim().length < 2 ? (
        <EmptyState icon={SearchIcon} title="Search MONUMENT" description="Enter at least 2 characters to search stories, authors, and topics." />
      ) : isLoading ? (
        <StoryGridSkeleton />
      ) : data && data.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {data.items.map((s) => (
            <StandardStoryCard key={s.id} story={s} />
          ))}
        </div>
      ) : (
        <EmptyState icon={SearchIcon} title="No results found" description={`Nothing matched "${q}". Try a broader search term.`} />
      )}
    </div>
  );
}
