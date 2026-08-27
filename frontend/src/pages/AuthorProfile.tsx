import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Twitter, Linkedin, Globe } from "lucide-react";
import { api } from "@/lib/api";
import { Author } from "@/types";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileQuestion } from "lucide-react";

export default function AuthorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const { data: author, isLoading, isError } = useQuery({
    queryKey: ["author", slug],
    queryFn: () => api.get<Author>(`/authors/${slug}`),
    enabled: !!slug,
  });

  if (isError) return <Navigate to="/404" replace />;
  if (isLoading || !author) {
    return <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-16"><StoryGridSkeleton /></div>;
  }

  let social: Record<string, string> = {};
  try {
    social = author.socialLinks ? JSON.parse(author.socialLinks) : {};
  } catch {
    social = {};
  }

  const popular = [...(author.articles || [])].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Helmet>
        <title>{author.name} — MONUMENT</title>
        <meta name="description" content={author.bio || ""} />
      </Helmet>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-14 border-b hairline pb-14">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-hairline shrink-0">
          {author.avatar && <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />}
        </div>
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium">{author.name}</h1>
          <p className="mt-3 text-ink-soft dark:text-dark-ink/70 max-w-xl leading-relaxed">{author.bio}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest2 text-ink-soft dark:text-dark-ink/50">
              {author._count?.articles ?? 0} Published Stories
            </span>
            <div className="flex items-center gap-3">
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noreferrer noopener" className="hover:text-accent transition-colors">
                  <Twitter size={15} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-accent transition-colors">
                  <Linkedin size={15} />
                </a>
              )}
              {social.website && (
                <a href={social.website} target="_blank" rel="noreferrer noopener" className="hover:text-accent transition-colors">
                  <Globe size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {popular.length > 0 && (
        <div className="mb-14">
          <p className="kicker mb-6">Most Popular</p>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
            {popular.map((s) => (
              <StandardStoryCard key={s.id} story={s} />
            ))}
          </div>
        </div>
      )}

      <p className="kicker mb-6">All Stories</p>
      {author.articles && author.articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {author.articles.map((s) => (
            <StandardStoryCard key={s.id} story={s} />
          ))}
        </div>
      ) : (
        <EmptyState icon={FileQuestion} title="No stories published yet" />
      )}
    </div>
  );
}
