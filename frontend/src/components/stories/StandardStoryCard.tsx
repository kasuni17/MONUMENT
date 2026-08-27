import { Link } from "react-router-dom";
import { Story } from "@/types";
import { formatDateShort } from "@/lib/utils";
import { BookmarkButton } from "./BookmarkButton";

export function StandardStoryCard({ story }: { story: Story }) {
  return (
    <Link to={`/stories/${story.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[4/3] bg-hairline mb-4">
        <img
          src={story.coverImage}
          alt={story.coverImageAlt || story.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-ivory/90 dark:bg-dark-bg/90 p-1.5">
          <BookmarkButton articleId={story.id} bookmarked={story.bookmarked} size={15} />
        </div>
      </div>
      <span className="kicker">{story.category.name}</span>
      <h3 className="mt-2 font-serif text-xl leading-snug font-medium group-hover:text-accent transition-colors">
        {story.title}
      </h3>
      <p className="mt-2 text-sm text-ink-soft dark:text-dark-ink/70 line-clamp-2">{story.excerpt}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft dark:text-dark-ink/60">
        <span>{story.author.name}</span>
        <span aria-hidden>·</span>
        <span>{story.readingTimeMin} min</span>
        <span aria-hidden>·</span>
        <span>{formatDateShort(story.publishedAt)}</span>
      </div>
    </Link>
  );
}
