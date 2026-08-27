import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-14 h-14 flex items-center justify-center border hairline mb-5">
        <Icon size={22} className="text-ink-soft dark:text-dark-ink/60" />
      </div>
      <h3 className="font-serif text-xl font-medium mb-2">{title}</h3>
      {description && <p className="text-sm text-ink-soft dark:text-dark-ink/60 max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}
