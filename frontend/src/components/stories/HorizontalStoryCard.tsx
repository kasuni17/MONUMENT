import { Link } from "react-router-dom";
import { Story } from "@/types";
import { formatDateShort } from "@/lib/utils";
import { BookmarkButton } from "./BookmarkButton";

export function HorizontalStoryCard({ story }: { story: Story }) {
  return (
    <Link to={`/stories/${story.slug}`} className="group flex gap-5 md:gap-8 items-start">
      <div className="relative overflow-hidden shrink-0 w-32 h-24 md:w-56 md:h-40 bg-hairline">
        <img
          src={story.coverImage}
          alt={story.coverImageAlt || story.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0 py-1">
        <span className="kicker">{story.category.name}</span>
        <h3 className="mt-1.5 font-serif text-lg md:text-2xl leading-snug font-medium group-hover:text-accent transition-colors">
          {story.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft dark:text-dark-ink/70 line-clamp-2 hidden md:block">
          {story.excerpt}
        </p>
        <div className="mt-2.5 flex items-center gap-2 text-xs text-ink-soft dark:text-dark-ink/60">
          <span>{story.author.name}</span>
          <span aria-hidden>·</span>
          <span>{story.readingTimeMin} min</span>
          <span aria-hidden className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{formatDateShort(story.publishedAt)}</span>
        </div>
      </div>
      <div className="hidden md:block pt-1">
        <BookmarkButton articleId={story.id} bookmarked={story.bookmarked} />
      </div>
    </Link>
  );
}
