import { Bookmark } from "lucide-react";
import { useState } from "react";
import { useBookmarkToggle } from "@/hooks/useBookmark";
import { cx } from "@/lib/utils";

export function BookmarkButton({
  articleId,
  bookmarked,
  size = 16,
  className,
}: {
  articleId: string;
  bookmarked?: boolean;
  size?: number;
  className?: string;
}) {
  const { toggle } = useBookmarkToggle();
  const [optimistic, setOptimistic] = useState<boolean | null>(null);
  const isBookmarked = optimistic ?? !!bookmarked;

  return (
    <button
      type="button"
      aria-label={isBookmarked ? "Remove bookmark" : "Save story"}
      aria-pressed={isBookmarked}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOptimistic(!isBookmarked);
        toggle(articleId, isBookmarked);
      }}
      className={cx(
        "inline-flex items-center justify-center transition-transform active:scale-90 hover:opacity-70",
        className
      )}
    >
      <Bookmark
        size={size}
        className={cx("transition-colors", isBookmarked ? "fill-accent text-accent" : "text-current")}
      />
    </button>
  );
}
