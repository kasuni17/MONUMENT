import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  kicker,
  title,
  viewAllHref,
  viewAllLabel = "View all",
}: {
  kicker?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8 md:mb-10">
      <div>
        {kicker && <span className="kicker">{kicker}</span>}
        <h2 className="mt-2 font-serif text-2xl md:text-4xl font-medium leading-tight">{title}</h2>
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium border-b border-ink/30 dark:border-dark-ink/30 pb-0.5 hover:border-accent hover:text-accent transition-colors shrink-0"
        >
          {viewAllLabel} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
