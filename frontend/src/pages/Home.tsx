import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { PaginatedResult, Story, Collection } from "@/types";
import { FeaturedStoryCard } from "@/components/stories/FeaturedStoryCard";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { HorizontalStoryCard } from "@/components/stories/HorizontalStoryCard";
import { MinimalStoryCard } from "@/components/stories/MinimalStoryCard";
import { NumberedStoryCard } from "@/components/stories/NumberedStoryCard";
import { EditorialGridStoryCard } from "@/components/stories/EditorialGridStoryCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryGridSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { ArrowRight } from "lucide-react";

function useArticles(params: string) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => api.get<PaginatedResult<Story>>(`/articles?${params}`),
  });
}

const TOPICS = ["Technology", "Artificial Intelligence", "Design", "Business", "Culture", "Science", "Travel", "Productivity"];

export default function Home() {
  const featured = useArticles("featured=true&pageSize=4&sort=newest");
  const latest = useArticles("pageSize=6&sort=newest");
  const trending = useArticles("pageSize=5&sort=popular");
  const editorsPicks = useArticles("pageSize=4&sort=newest&category=design");
  const deepDives = useArticles("pageSize=3&sort=newest&category=artificial-intelligence");
  const quickReads = useArticles("pageSize=5&sort=newest");
  const collections = useQuery({
    queryKey: ["collections-home"],
    queryFn: () => api.get<Collection[]>("/collections"),
  });

  const featuredItems = featured.data?.items || [];
  const [heroStory, ...restFeatured] = featuredItems;

  return (
    <div>
      <Helmet>
        <title>MONUMENT — Ideas, People, and Systems Shaping What Comes Next</title>
        <meta name="description" content="A premium editorial publication covering technology, AI, design, business, culture, and science." />
      </Helmet>

      {/* Featured / Hero */}
      <section className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {featured.isLoading ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <Skeleton className="lg:col-span-2 aspect-[16/10]" />
            <div className="space-y-6">
              <Skeleton className="aspect-[16/9]" />
              <Skeleton className="aspect-[16/9]" />
            </div>
          </div>
        ) : heroStory ? (
          <div className="grid lg:grid-cols-3 gap-x-8 gap-y-8">
            <div className="lg:col-span-2 animate-fadeUp">
              <FeaturedStoryCard story={heroStory} />
            </div>
            <div className="space-y-8">
              {restFeatured.slice(0, 2).map((s) => (
                <StandardStoryCard key={s.id} story={s} />
              ))}
            </div>
            {restFeatured[2] && (
              <div className="lg:col-span-3 pt-4 border-t hairline">
                <HorizontalStoryCard story={restFeatured[2]} />
              </div>
            )}
          </div>
        ) : null}
      </section>

      {/* Latest Stories */}
      <section className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader kicker="Fresh" title="Latest Stories" viewAllHref="/stories" />
        {latest.isLoading ? (
          <StoryGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {latest.data?.items.map((s) => (
              <StandardStoryCard key={s.id} story={s} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Now — numbered */}
      <section className="bg-paper dark:bg-dark-surface py-20">
        <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader kicker="Right Now" title="Trending Now" viewAllHref="/trending" />
          <div>
            {trending.data?.items.map((s, i) => (
              <NumberedStoryCard key={s.id} story={s} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks — asymmetric grid */}
      <section className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader kicker="Curated" title="Editor's Picks" viewAllHref="/topics/design" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {editorsPicks.data?.items[0] && (
            <div className="sm:col-span-2 lg:row-span-2">
              <EditorialGridStoryCard story={editorsPicks.data.items[0]} tall />
            </div>
          )}
          {editorsPicks.data?.items.slice(1).map((s) => (
            <EditorialGridStoryCard key={s.id} story={s} />
          ))}
        </div>
      </section>

      {/* Deep Dives */}
      <section className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t hairline">
        <SectionHeader kicker="Long Reads" title="Deep Dives" viewAllHref="/topics/artificial-intelligence" />
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {deepDives.data?.items.map((s) => (
            <StandardStoryCard key={s.id} story={s} />
          ))}
        </div>
      </section>

      {/* Quick Reads — minimal list */}
      <section className="bg-paper dark:bg-dark-surface py-20">
        <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[1fr_2fr] gap-10">
          <div>
            <span className="kicker">Under 5 Minutes</span>
            <h2 className="mt-2 font-serif text-2xl md:text-4xl font-medium leading-tight">Quick Reads</h2>
            <p className="mt-4 text-sm text-ink-soft dark:text-dark-ink/60 max-w-xs">
              Short, sharp stories for when time is tight but curiosity isn't.
            </p>
          </div>
          <div>
            {quickReads.data?.items.map((s) => (
              <MinimalStoryCard key={s.id} story={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Curated Collections strip */}
      <section className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader kicker="Series" title="Curated Collections" viewAllHref="/collections" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.data?.map((c) => (
            <Link key={c.id} to={`/collections/${c.slug}`} className="group block relative overflow-hidden aspect-[3/4] bg-hairline">
              <img src={c.coverImage || ""} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-widest2 text-white/70">
                  {c._count?.articles ?? 0} Stories
                </span>
                <h3 className="mt-2 font-serif text-lg leading-snug font-medium">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topics to explore */}
      <section className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeader kicker="Browse" title="Topics to Explore" />
        <div className="flex flex-wrap gap-3">
          {TOPICS.map((t) => (
            <Link
              key={t}
              to={`/topics/${t.toLowerCase().replace(/\s+/g, "-")}`}
              className="group flex items-center gap-2 px-5 py-3 border hairline hover:border-accent hover:text-accent transition-colors"
            >
              {t} <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter band */}
      <section className="bg-ink dark:bg-dark-surface text-ivory py-20">
        <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="kicker text-white/70">Stay Informed</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-medium leading-tight max-w-lg">
              Stories worth your attention.
            </h2>
            <p className="mt-4 text-white/70 max-w-md">One email, every Sunday. No noise, just the reporting that matters.</p>
          </div>
          <NewsletterForm variant="band" />
        </div>
      </section>
    </div>
  );
}
