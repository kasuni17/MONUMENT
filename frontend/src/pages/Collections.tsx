import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { Collection } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Collections() {
  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: () => api.get<Collection[]>("/collections"),
  });

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Helmet>
        <title>Collections — MONUMENT</title>
      </Helmet>
      <span className="kicker">Series</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-4">Collections</h1>
      <p className="text-ink-soft dark:text-dark-ink/60 max-w-lg mb-12">
        Curated runs of stories, grouped around a single idea worth following closely.
      </p>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[16/9]" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
          {data?.map((c) => (
            <Link key={c.id} to={`/collections/${c.slug}`} className="group block">
              <div className="relative overflow-hidden aspect-[16/9] bg-hairline mb-5">
                <img src={c.coverImage || ""} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <span className="kicker">{c._count?.articles ?? 0} Stories</span>
              <h2 className="mt-2 font-serif text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors">{c.title}</h2>
              <p className="mt-2 text-sm text-ink-soft dark:text-dark-ink/60 max-w-md">{c.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
