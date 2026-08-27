import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Bookmark, Sun, Moon, User, Menu, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useReadingPreferences } from "@/contexts/ReadingPreferencesContext";
import { SearchOverlay } from "./SearchOverlay";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Topics", href: "/topics" },
  { label: "Trending", href: "/trending" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useReadingPreferences();
  const navigate = useNavigate();
  const isStaff = user && (user.role === "ADMIN" || user.role === "EDITOR");

  return (
    <>
      <header className="sticky top-0 z-40 bg-ivory/90 dark:bg-dark-bg/90 backdrop-blur border-b hairline">
        <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-10">
            <Link to="/" className="font-serif text-2xl font-semibold tracking-tight shrink-0">
              MONUMENT
            </Link>
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `text-[13px] font-medium uppercase tracking-wide transition-colors ${
                      isActive ? "text-accent" : "text-ink-soft dark:text-dark-ink/70 hover:text-ink dark:hover:text-dark-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-accent transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link to="/bookmarks" className="p-2 hover:text-accent transition-colors hidden sm:inline-flex" aria-label="Bookmarks">
              <Bookmark size={18} />
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:text-accent transition-colors hidden sm:inline-flex"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="p-2 hover:text-accent transition-colors"
                aria-label="Account"
              >
                <User size={18} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-ivory dark:bg-dark-surface border hairline shadow-lg z-20 py-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b hairline mb-1">
                          <p className="text-sm font-medium truncate">{user.name}</p>
                          <p className="text-xs text-ink-soft dark:text-dark-ink/60 truncate">{user.email}</p>
                        </div>
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-hairline/40 dark:hover:bg-dark-hairline/30">
                          Profile
                        </Link>
                        <Link to="/bookmarks" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-hairline/40 dark:hover:bg-dark-hairline/30">
                          Saved Stories
                        </Link>
                        {isStaff && (
                          <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-hairline/40 dark:hover:bg-dark-hairline/30">
                            <LayoutDashboard size={14} /> Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={async () => {
                            setUserMenuOpen(false);
                            await logout();
                            navigate("/");
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-hairline/40 dark:hover:bg-dark-hairline/30 text-red-600 dark:text-red-400"
                        >
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-hairline/40 dark:hover:bg-dark-hairline/30">
                          Sign in
                        </Link>
                        <Link to="/register" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-hairline/40 dark:hover:bg-dark-hairline/30">
                          Create account
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            <button onClick={() => setMobileOpen(true)} className="p-2 lg:hidden" aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
    </>
  );
}
