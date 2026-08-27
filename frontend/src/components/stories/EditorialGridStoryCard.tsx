import { Link } from "react-router-dom";
import { Story } from "@/types";
import { formatDateShort } from "@/lib/utils";
import { BookmarkButton } from "./BookmarkButton";

export function EditorialGridStoryCard({ story, tall = false }: { story: Story; tall?: boolean }) {
  return (
    <Link to={`/stories/${story.slug}`} className="group relative block overflow-hidden bg-hairline">
      <div className={tall ? "aspect-[3/4]" : "aspect-square"}>
        <img
          src={story.coverImage}
          alt={story.coverImageAlt || story.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute top-3 right-3">
        <BookmarkButton articleId={story.id} bookmarked={story.bookmarked} className="text-white" size={16} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <span className="kicker text-white/90">{story.category.name}</span>
        <h3 className="mt-2 font-serif text-lg md:text-xl leading-snug font-medium">{story.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
          <span>{story.readingTimeMin} min</span>
          <span aria-hidden>·</span>
          <span>{formatDateShort(story.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
