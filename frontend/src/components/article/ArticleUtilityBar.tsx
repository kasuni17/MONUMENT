import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Share2, Type, Sun, Moon, Coffee } from "lucide-react";
import { BookmarkButton } from "@/components/stories/BookmarkButton";
import { useToast } from "@/contexts/ToastContext";
import { useReadingPreferences } from "@/contexts/ReadingPreferencesContext";
import { cx } from "@/lib/utils";

export function ArticleUtilityBar({ articleId, bookmarked, title }: { articleId: string; bookmarked?: boolean; title: string }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize } = useReadingPreferences();

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // fall through to copy
      }
    }
    await navigator.clipboard.writeText(url);
    toast("Link copied to clipboard");
  }

  return (
    <div className="sticky top-16 z-30 bg-ivory/95 dark:bg-dark-bg/95 backdrop-blur border-b hairline">
      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors">
          <ArrowLeft size={15} /> <span className="hidden sm:inline">Back</span>
        </button>
        <div className="flex items-center gap-4 relative">
          <BookmarkButton articleId={articleId} bookmarked={bookmarked} size={17} />
          <button onClick={handleShare} className="hover:text-accent transition-colors" aria-label="Share">
            <Share2 size={17} />
          </button>
          <button
            onClick={() => setSettingsOpen((v) => !v)}
            className="hover:text-accent transition-colors"
            aria-label="Reading settings"
          >
            <Type size={17} />
          </button>
          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSettingsOpen(false)} />
              <div className="absolute right-0 top-9 w-64 bg-ivory dark:bg-dark-surface border hairline shadow-lg z-20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink/60 mb-3">Text Size</p>
                <div className="flex items-center gap-2 mb-5">
                  <button onClick={decreaseFontSize} className="w-9 h-9 border hairline flex items-center justify-center text-sm hover:border-accent">
                    A-
                  </button>
                  <span className="text-xs text-ink-soft dark:text-dark-ink/60 flex-1 text-center capitalize">{fontSize}</span>
                  <button onClick={increaseFontSize} className="w-9 h-9 border hairline flex items-center justify-center text-base hover:border-accent">
                    A+
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink/60 mb-3">Reading Mode</p>
                <div className="flex items-center gap-2">
                  {(
                    [
                      { key: "light", icon: Sun, label: "Light" },
                      { key: "sepia", icon: Coffee, label: "Sepia" },
                      { key: "dark", icon: Moon, label: "Dark" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setTheme(opt.key)}
                      className={cx(
                        "flex-1 flex flex-col items-center gap-1 py-2.5 border hairline text-xs transition-colors",
                        theme === opt.key ? "border-accent text-accent" : "hover:border-accent"
                      )}
                    >
                      <opt.icon size={15} /> {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
