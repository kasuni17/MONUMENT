import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => api.get<Record<string, string>>("/settings"),
    staleTime: 5 * 60_000,
  });

  const text = data?.announcementText;
  if (!text || dismissed) return null;

  return (
    <div className="bg-ink text-ivory dark:bg-dark-surface dark:text-dark-ink text-xs">
      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center relative">
        <p className="text-center pr-6">{text}</p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 sm:right-6 lg:right-8 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss announcement"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
