import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { Category, PaginatedResult, Story } from "@/types";
import { FeaturedStoryCard } from "@/components/stories/FeaturedStoryCard";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileQuestion } from "lucide-react";

export default function TopicDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState(1);

  const { data: category, isLoading: categoryLoading, isError } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => api.get<Category>(`/categories/${slug}`),
    enabled: !!slug,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ["category-articles", slug, page],
    queryFn: () => api.get<PaginatedResult<Story>>(`/articles?category=${slug}&page=${page}&pageSize=9`),
    enabled: !!slug,
  });

  if (isError) return <Navigate to="/404" replace />;
  if (categoryLoading || !category) {
    return <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-16"><StoryGridSkeleton /></div>;
  }

  const [featured, ...rest] = articles?.items || [];

  return (
    <div>
      <Helmet>
        <title>{category.name} — MONUMENT</title>
        <meta name="description" content={category.description || ""} />
      </Helmet>

      <div className="relative h-72 md:h-96 bg-hairline overflow-hidden">
        {category.coverImage && <img src={category.coverImage} alt={category.name} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
          <span className="kicker text-white/80">Topic</span>
          <h1 className="mt-2 font-serif text-4xl md:text-6xl font-medium">{category.name}</h1>
          <p className="mt-3 text-white/85 max-w-xl">{category.description}</p>
          <p className="mt-3 text-xs uppercase tracking-widest2 text-white/60">{category._count?.articles ?? 0} Stories</p>
        </div>
      </div>

      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {articlesLoading ? (
          <StoryGridSkeleton />
        ) : articles && articles.items.length > 0 ? (
          <>
            {featured && page === 1 && (
              <div className="mb-14">
                <FeaturedStoryCard story={featured} />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {(page === 1 ? rest : articles.items).map((s) => (
                <StandardStoryCard key={s.id} story={s} />
              ))}
            </div>
            <Pagination page={articles.page} totalPages={articles.totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState icon={FileQuestion} title="No stories yet" description="Check back soon for stories in this topic." />
        )}
      </div>
    </div>
  );
}
