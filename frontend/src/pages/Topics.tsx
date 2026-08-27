import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { Category } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { ArrowUpRight } from "lucide-react";

export default function Topics() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get<Category[]>("/categories"),
  });

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Helmet>
        <title>Topics — MONUMENT</title>
      </Helmet>
      <span className="kicker">Browse by Subject</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-12">Topics</h1>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-52" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 border-t hairline">
          {data?.map((c) => (
            <Link
              key={c.id}
              to={`/topics/${c.slug}`}
              className="group flex items-center justify-between gap-6 py-7 border-b hairline"
            >
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium group-hover:text-accent transition-colors">{c.name}</h2>
                <p className="mt-2 text-sm text-ink-soft dark:text-dark-ink/60 max-w-md">{c.description}</p>
                <p className="mt-3 text-xs uppercase tracking-widest2 text-ink-soft dark:text-dark-ink/50">
                  {c._count?.articles ?? 0} Stories
                </p>
              </div>
              <ArrowUpRight size={22} className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
