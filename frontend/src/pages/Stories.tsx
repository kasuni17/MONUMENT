import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { PaginatedResult, Story, Category } from "@/types";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { FileQuestion } from "lucide-react";

export default function Stories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const [page, setPage] = useState(1);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get<Category[]>("/categories"),
  });

  const params = useMemo(() => {
    const p = new URLSearchParams({ page: String(page), pageSize: "12", sort });
    if (category) p.set("category", category);
    return p.toString();
  }, [page, category, sort]);

  const { data, isLoading } = useQuery({
    queryKey: ["stories-list", params],
    queryFn: () => api.get<PaginatedResult<Story>>(`/articles?${params}`),
  });

  function updateFilter(key: string, value: string) {
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Helmet>
        <title>All Stories — MONUMENT</title>
      </Helmet>
      <div className="mb-10">
        <span className="kicker">Archive</span>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium">All Stories</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-10 border-b hairline pb-6">
        <button
          onClick={() => updateFilter("category", "")}
          className={`px-3.5 py-1.5 text-sm border hairline transition-colors ${!category ? "bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg border-ink dark:border-dark-ink" : "hover:border-accent hover:text-accent"}`}
        >
          All
        </button>
        {categories?.map((c) => (
          <button
            key={c.id}
            onClick={() => updateFilter("category", c.slug)}
            className={`px-3.5 py-1.5 text-sm border hairline transition-colors ${category === c.slug ? "bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg border-ink dark:border-dark-ink" : "hover:border-accent hover:text-accent"}`}
          >
            {c.name}
          </button>
        ))}
        <select
          value={sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="ml-auto bg-transparent border hairline px-3 py-1.5 text-sm outline-none"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {isLoading ? (
        <StoryGridSkeleton count={9} />
      ) : data && data.items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {data.items.map((s) => (
              <StandardStoryCard key={s.id} story={s} />
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
        </>
      ) : (
        <EmptyState icon={FileQuestion} title="No stories found" description="Try a different category or check back soon for new stories." />
      )}
    </div>
  );
}
