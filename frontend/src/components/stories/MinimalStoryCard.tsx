import { Link } from "react-router-dom";
import { Story } from "@/types";
import { formatDateShort } from "@/lib/utils";

export function MinimalStoryCard({ story, showBorder = true }: { story: Story; showBorder?: boolean }) {
  return (
    <Link
      to={`/stories/${story.slug}`}
      className={`group block py-5 ${showBorder ? "border-b hairline" : ""}`}
    >
      <span className="kicker">{story.category.name}</span>
      <h3 className="mt-2 font-serif text-lg md:text-xl leading-snug font-medium group-hover:text-accent transition-colors">
        {story.title}
      </h3>
      <div className="mt-2 flex items-center gap-2 text-xs text-ink-soft dark:text-dark-ink/60">
        <span>{story.author.name}</span>
        <span aria-hidden>·</span>
        <span>{story.readingTimeMin} min</span>
        <span aria-hidden>·</span>
        <span>{formatDateShort(story.publishedAt)}</span>
      </div>
    </Link>
  );
}
