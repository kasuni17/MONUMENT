import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useReadingPreferences } from "@/contexts/ReadingPreferencesContext";
import { Bookmark, LayoutDashboard } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { theme, setTheme, fontSize } = useReadingPreferences();
  const isStaff = user && (user.role === "ADMIN" || user.role === "EDITOR");

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Helmet>
        <title>Profile — MONUMENT</title>
      </Helmet>
      <div className="flex items-center gap-5 mb-12 border-b hairline pb-10">
        <div className="w-20 h-20 rounded-full bg-hairline flex items-center justify-center font-serif text-3xl shrink-0">
          {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" /> : user.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-serif text-3xl font-medium">{user.name}</h1>
          <p className="text-sm text-ink-soft dark:text-dark-ink/60">{user.email}</p>
          <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wide bg-hairline dark:bg-dark-hairline px-2 py-1">
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Link to="/bookmarks" className="flex items-center gap-3 border hairline px-5 py-4 hover:border-accent transition-colors">
          <Bookmark size={18} className="text-accent" />
          <span className="font-medium text-sm">Saved Stories</span>
        </Link>
        {isStaff && (
          <Link to="/admin" className="flex items-center gap-3 border hairline px-5 py-4 hover:border-accent transition-colors">
            <LayoutDashboard size={18} className="text-accent" />
            <span className="font-medium text-sm">Admin Dashboard</span>
          </Link>
        )}
      </div>

      <div>
        <p className="kicker mb-5">Reading Preferences</p>
        <div className="border hairline p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm">Reading mode</span>
            <div className="flex gap-2">
              {(["light", "sepia", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 text-xs capitalize border hairline ${theme === t ? "border-accent text-accent" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Font size</span>
            <span className="text-xs text-ink-soft dark:text-dark-ink/60 capitalize">{fontSize} (adjust while reading an article)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
