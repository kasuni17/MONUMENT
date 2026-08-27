import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { api } from "@/lib/api";
import { StandardStoryCard } from "@/components/stories/StandardStoryCard";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Story } from "@/types";

interface BookmarkItem {
  id: string;
  article: Story;
}

export default function Bookmarks() {
  const { data, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => api.get<BookmarkItem[]>("/bookmarks"),
  });

  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Helmet>
        <title>Saved Stories — MONUMENT</title>
      </Helmet>
      <span className="kicker">Your Library</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-12">Saved Stories</h1>

      {isLoading ? (
        <StoryGridSkeleton />
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {data.map((b) => (
            <StandardStoryCard key={b.id} story={{ ...b.article, bookmarked: true }} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved stories yet"
          description="Bookmark stories as you read to build your personal reading list."
          action={
            <Link to="/stories" className="px-5 py-2.5 bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg text-sm font-medium">
              Browse Stories
            </Link>
          }
        />
      )}
    </div>
  );
}
