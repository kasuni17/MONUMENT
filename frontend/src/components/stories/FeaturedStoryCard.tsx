import { Link } from "react-router-dom";
import { Story } from "@/types";
import { formatDateShort } from "@/lib/utils";
import { BookmarkButton } from "./BookmarkButton";
import { ArrowRight } from "lucide-react";

export function FeaturedStoryCard({ story }: { story: Story }) {
  return (
    <Link to={`/stories/${story.slug}`} className="group block relative">
      <div className="relative overflow-hidden aspect-[16/10] bg-hairline">
        <img
          src={story.coverImage}
          alt={story.coverImageAlt || story.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 right-4">
          <BookmarkButton articleId={story.id} bookmarked={story.bookmarked} className="text-white" size={18} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9 text-white">
          <span className="kicker text-white/90">{story.category.name}</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.05] font-medium max-w-3xl">
            {story.title}
          </h2>
          <p className="mt-4 text-white/85 max-w-xl text-[15px] md:text-base hidden sm:block">{story.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-sm text-white/75">
            <span>{story.author.name}</span>
            <span aria-hidden>·</span>
            <span>{story.readingTimeMin} min read</span>
            <span aria-hidden>·</span>
            <span>{formatDateShort(story.publishedAt)}</span>
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium border-b border-white/40 pb-0.5 group-hover:gap-2.5 transition-all">
            Read Story <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
