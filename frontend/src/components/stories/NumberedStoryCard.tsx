import { Link } from "react-router-dom";
import { Story } from "@/types";
import { formatViews } from "@/lib/utils";

export function NumberedStoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <Link
      to={`/stories/${story.slug}`}
      className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-center py-6 border-b hairline"
    >
      <span className="font-serif text-4xl md:text-6xl font-light text-hairline dark:text-dark-hairline group-hover:text-accent/40 transition-colors leading-none tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <span className="kicker">{story.category.name}</span>
        <h3 className="mt-1.5 font-serif text-lg md:text-2xl leading-snug font-medium group-hover:text-accent transition-colors">
          {story.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-soft dark:text-dark-ink/60">
          <span>{story.author.name}</span>
          <span aria-hidden>·</span>
          <span>{story.readingTimeMin} min read</span>
        </div>
      </div>
      <div className="hidden md:block text-right text-sm text-ink-soft dark:text-dark-ink/60 tabular-nums">
        {formatViews(story.views)} views
      </div>
    </Link>
  );
}
