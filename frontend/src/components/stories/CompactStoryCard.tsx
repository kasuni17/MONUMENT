import { Link } from "react-router-dom";
import { Story } from "@/types";

export function CompactStoryCard({ story }: { story: Story }) {
  return (
    <Link to={`/stories/${story.slug}`} className="group flex gap-4 items-center py-3">
      <div className="relative overflow-hidden shrink-0 w-16 h-16 bg-hairline">
        <img
          src={story.coverImage}
          alt={story.coverImageAlt || story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest2 text-ink-soft dark:text-dark-ink/50">
          {story.category.name}
        </span>
        <h4 className="mt-1 font-serif text-[15px] leading-snug font-medium group-hover:text-accent transition-colors line-clamp-2">
          {story.title}
        </h4>
      </div>
    </Link>
  );
}
