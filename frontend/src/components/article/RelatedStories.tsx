import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PaginatedResult, Story } from "@/types";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { HorizontalStoryCard } from "@/components/stories/HorizontalStoryCard";

export function RelatedStories({ categorySlug, excludeId }: { categorySlug: string; excludeId: string }) {
  const { data } = useQuery({
    queryKey: ["related", categorySlug],
    queryFn: () => api.get<PaginatedResult<Story>>(`/articles?category=${categorySlug}&pageSize=4`),
  });

  const items = (data?.items || []).filter((s) => s.id !== excludeId).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="border-t hairline pt-12 mt-16">
      <p className="kicker mb-8">More Stories Like This</p>
      <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
        {items.map((s) => (
          <StandardStoryCard key={s.id} story={s} />
        ))}
      </div>
    </section>
  );
}

export function MoreFromAuthor({ authorSlug, excludeId }: { authorSlug: string; excludeId: string }) {
  const { data } = useQuery({
    queryKey: ["author-more", authorSlug],
    queryFn: () => api.get<PaginatedResult<Story>>(`/articles?author=${authorSlug}&pageSize=4`),
  });

  const items = (data?.items || []).filter((s) => s.id !== excludeId).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="border-t hairline pt-12 mt-12">
      <p className="kicker mb-8">More From This Author</p>
      <div className="space-y-8">
        {items.map((s) => (
          <HorizontalStoryCard key={s.id} story={s} />
        ))}
      </div>
    </section>
  );
}
