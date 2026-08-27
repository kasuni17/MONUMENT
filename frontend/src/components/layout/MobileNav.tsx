import { Link, NavLink, useNavigate } from "react-router-dom";
import { X, Bookmark, Sun, Moon, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useReadingPreferences } from "@/contexts/ReadingPreferencesContext";

export function MobileNav({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useReadingPreferences();
  const navigate = useNavigate();
  const isStaff = user && (user.role === "ADMIN" || user.role === "EDITOR");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-ivory dark:bg-dark-bg flex flex-col">
        <div className="h-16 flex items-center justify-between px-5 border-b hairline shrink-0">
          <span className="font-serif text-xl font-semibold">MONUMENT</span>
          <button onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `py-3 text-lg font-serif border-b hairline ${isActive ? "text-accent" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/bookmarks" onClick={onClose} className="py-3 text-lg font-serif border-b hairline flex items-center gap-2">
            <Bookmark size={17} /> Saved Stories
          </Link>
          {isStaff && (
            <Link to="/admin" onClick={onClose} className="py-3 text-lg font-serif border-b hairline flex items-center gap-2">
              <LayoutDashboard size={17} /> Admin Dashboard
            </Link>
          )}
        </nav>
        <div className="px-5 py-5 border-t hairline shrink-0 space-y-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-2 text-sm py-2"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          {user ? (
            <button
              onClick={async () => {
                onClose();
                await logout();
                navigate("/");
              }}
              className="w-full flex items-center gap-2 text-sm py-2 text-red-600 dark:text-red-400"
            >
              <LogOut size={16} /> Log out
            </button>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" onClick={onClose} className="flex-1 text-center py-2.5 border hairline text-sm font-medium">
                Sign in
              </Link>
              <Link to="/register" onClick={onClose} className="flex-1 text-center py-2.5 bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg text-sm font-medium">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
