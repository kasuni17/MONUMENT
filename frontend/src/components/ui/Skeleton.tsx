import { cx } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("animate-pulse bg-hairline/70 dark:bg-dark-hairline/50", className)} />;
}

export function StoryCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] w-full mb-4" />
      <Skeleton className="h-3 w-20 mb-3" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-2/3 mb-3" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function StoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {Array.from({ length: count }).map((_, i) => (
        <StoryCardSkeleton key={i} />
      ))}
    </div>
  );
}
