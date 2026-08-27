import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { ArticleDetail } from "@/types";
import { formatDate } from "@/lib/utils";
import { useReadingPreferences, FONT_SIZE_CLASS } from "@/contexts/ReadingPreferencesContext";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { ArticleUtilityBar } from "@/components/article/ArticleUtilityBar";
import { DesktopToc, MobileToc, useToc, useActiveHeading } from "@/components/article/TableOfContents";
import { RelatedStories, MoreFromAuthor } from "@/components/article/RelatedStories";
import { CommentsSection } from "@/components/article/CommentsSection";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const articleBodyRef = useRef<HTMLElement>(null);
  const { fontSize } = useReadingPreferences();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => api.get<ArticleDetail>(`/articles/${slug}`),
    enabled: !!slug,
  });

  const viewMutation = useMutation({
    mutationFn: (id: string) => api.post(`/articles/${id}/view`),
  });

  useEffect(() => {
    if (article?.id) viewMutation.mutate(article.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.id]);

  const toc = useToc(contentRef, article?.content || "");
  const activeId = useActiveHeading(toc);

  if (isLoading) {
    return (
      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StoryGridSkeleton count={1} />
      </div>
    );
  }

  if (isError || !article) return <Navigate to="/404" replace />;

  return (
    <article ref={articleBodyRef} className="reading-surface">
      <Helmet>
        <title>{article.seoTitle || article.title} — MONUMENT</title>
        <meta name="description" content={article.seoDescription || article.excerpt} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.coverImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.coverImage,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: { "@type": "Person", name: article.author.name },
          })}
        </script>
      </Helmet>

      <ReadingProgressBar targetRef={articleBodyRef} />
      <ArticleUtilityBar articleId={article.id} bookmarked={article.bookmarked} title={article.title} />

      <header className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <Link to={`/topics/${article.category.slug}`} className="kicker hover:underline">
          {article.category.name}
        </Link>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl font-medium leading-[1.05] max-w-4xl">{article.title}</h1>
        {article.subtitle && (
          <p className="mt-5 text-lg md:text-xl text-ink-soft dark:text-dark-ink/70 max-w-2xl leading-relaxed">
            {article.subtitle}
          </p>
        )}

        <div className="mt-8 flex items-center gap-4">
          <Link to={`/authors/${article.author.slug}`} className="w-11 h-11 rounded-full overflow-hidden bg-hairline shrink-0">
            {article.author.avatar && <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />}
          </Link>
          <div className="text-sm">
            <Link to={`/authors/${article.author.slug}`} className="font-medium hover:text-accent transition-colors">
              {article.author.name}
            </Link>
            <div className="text-ink-soft dark:text-dark-ink/60 flex items-center gap-2 mt-0.5">
              <span>{formatDate(article.publishedAt)}</span>
              <span aria-hidden>·</span>
              <span>{article.readingTimeMin} min read</span>
              {article.updatedAt &&
                article.publishedAt &&
                new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() > 24 * 60 * 60 * 1000 && (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {formatDate(article.updatedAt)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-[16/9] bg-hairline overflow-hidden">
          <img src={article.coverImage} alt={article.coverImageAlt || article.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid xl:grid-cols-[220px_1fr] gap-12">
          <div className="order-2 xl:order-1">
            <DesktopToc items={toc} activeId={activeId} />
          </div>
          <div className="order-1 xl:order-2 max-w-prose mx-auto w-full">
            <MobileToc items={toc} activeId={activeId} />
            <div
              ref={contentRef}
              className={`article-prose ${FONT_SIZE_CLASS[fontSize]}`}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t hairline">
              {article.tags?.map((t) => (
                <Link key={t.id} to={`/topics/${article.category.slug}`} className="px-3 py-1.5 text-xs border hairline hover:border-accent hover:text-accent transition-colors">
                  {t.name}
                </Link>
              ))}
            </div>

            <RelatedStories categorySlug={article.category.slug} excludeId={article.id} />
            <MoreFromAuthor authorSlug={article.author.slug} excludeId={article.id} />
            <CommentsSection articleId={article.id} comments={article.comments || []} />
          </div>
        </div>
      </div>
    </article>
  );
}
