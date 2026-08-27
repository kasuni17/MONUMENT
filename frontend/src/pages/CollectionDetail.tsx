import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { Collection } from "@/types";
import { HorizontalStoryCard } from "@/components/stories/HorizontalStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: collection, isLoading, isError } = useQuery({
    queryKey: ["collection", slug],
    queryFn: () => api.get<Collection>(`/collections/${slug}`),
    enabled: !!slug,
  });

  if (isError) return <Navigate to="/404" replace />;
  if (isLoading || !collection) {
    return <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-16"><StoryGridSkeleton /></div>;
  }

  return (
    <div>
      <Helmet>
        <title>{collection.title} — MONUMENT</title>
        <meta name="description" content={collection.description || ""} />
      </Helmet>
      <div className="relative h-80 md:h-[28rem] bg-hairline overflow-hidden">
        {collection.coverImage && <img src={collection.coverImage} alt={collection.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
          <span className="kicker text-white/80">Collection</span>
          <h1 className="mt-2 font-serif text-4xl md:text-6xl font-medium max-w-2xl">{collection.title}</h1>
          <p className="mt-4 text-white/85 max-w-xl">{collection.description}</p>
          <p className="mt-3 text-xs uppercase tracking-widest2 text-white/60">{collection.articles?.length ?? 0} Stories</p>
        </div>
      </div>

      <div className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {collection.articles?.map((s) => (
            <HorizontalStoryCard key={s.id} story={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
