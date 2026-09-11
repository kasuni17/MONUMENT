export function ArticleCardSkeleton() {
  return (
    <div>
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="pt-4">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton mt-3 h-6 w-full" />
        <div className="skeleton mt-2 h-6 w-3/4" />
        <div className="skeleton mt-3 h-3 w-32" />
      </div>
    </div>
  )
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ArticlePageSkeleton() {
  return (
    <div className="mx-auto max-w-prose px-4 py-16">
      <div className="skeleton h-3 w-24" />
      <div className="skeleton mt-4 h-10 w-full" />
      <div className="skeleton mt-2 h-10 w-2/3" />
      <div className="skeleton mt-6 h-4 w-40" />
      <div className="skeleton mt-8 aspect-[16/10] w-full" />
      <div className="mt-10 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-4 w-full" />
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-line p-5 dark:border-line-dark">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton mt-3 h-8 w-16" />
        </div>
      ))}
    </div>
  )
}
