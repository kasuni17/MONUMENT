import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { PaginatedResult, Story } from "@/types";
import { NumberedStoryCard } from "@/components/stories/NumberedStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";

export default function Trending() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => api.get<PaginatedResult<Story>>("/articles?sort=popular&pageSize=20"),
  });

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Helmet>
        <title>Trending — MONUMENT</title>
      </Helmet>
      <span className="kicker">Right Now</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-4">Trending</h1>
      <p className="text-ink-soft dark:text-dark-ink/60 max-w-lg mb-10">
        The stories readers can't stop sharing, ranked by attention this week.
      </p>

      {isLoading ? (
        <StoryGridSkeleton count={8} />
      ) : (
        <div>
          {data?.items.map((s, i) => (
            <NumberedStoryCard key={s.id} story={s} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
