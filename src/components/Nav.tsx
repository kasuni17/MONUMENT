import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Bookmark, Menu, Sun, Moon } from './icons'
import { useTheme } from '@/lib/theme'
import { useBookmarks } from '@/lib/bookmarks'
import MobileDrawer from './MobileDrawer'
import SearchOverlay from './SearchOverlay'
import { classNames } from '@/lib/utils'
import { primaryLinks } from '@/lib/navigation'

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { bookmarks } = useBookmarks()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const typing = ['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const iconButton =
    'focus-ring flex h-11 w-10 items-center justify-center text-ink transition-colors hover:text-accent dark:text-paper dark:hover:text-accent-soft sm:w-11'

  return (
    <>
      <div className="bg-ink text-paper dark:bg-black">
        <div className="container-editorial flex items-center justify-between gap-4 py-2">
          <p className="truncate text-[0.75rem] tracking-wide text-paper/75">
            An independent publication<span className="hidden sm:inline">, twice weekly</span>.
          </p>
          <Link
            to="/newsletter"
            className="focus-ring shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-paper underline decoration-paper/40 underline-offset-4 transition-colors hover:decoration-paper"
          >
            Subscribe
          </Link>
        </div>
      </div>

      <header
        className={classNames(
          'sticky top-0 z-50 border-b transition-shadow duration-300',
          scrolled
            ? 'border-line bg-paper/92 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-line-dark dark:bg-surface-dark/92'
            : 'border-line bg-paper dark:border-line-dark dark:bg-surface-dark'
        )}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between gap-4 py-3.5 lg:py-4">
            <div className="-ml-2.5 flex shrink-0 items-center lg:hidden">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className={iconButton}
              >
                <Menu />
              </button>
            </div>

            <Link
              to="/"
              className="focus-ring shrink-0 font-display text-[1.0625rem] font-semibold uppercase tracking-[0.18em] text-ink dark:text-paper sm:text-[1.375rem] sm:tracking-[0.22em] lg:text-[1.5rem]"
            >
              Monument
            </Link>

            <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9">
              {primaryLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    classNames(
                      'focus-ring relative py-1 text-[0.8125rem] font-medium uppercase tracking-[0.1em] transition-colors',
                      isActive
                        ? 'text-accent dark:text-accent-soft'
                        : 'text-ink-soft hover:text-ink dark:text-paper/70 dark:hover:text-paper'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={classNames(
                          'absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ease-editorial',
                          isActive ? 'w-full' : 'w-0'
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="-mr-2.5 flex shrink-0 items-center gap-0 sm:mr-0 sm:gap-0.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search stories"
                className={iconButton}
              >
                <Search />
              </button>
              <Link
                to="/bookmarks"
                aria-label={`Reading list, ${bookmarks.length} saved`}
                className={classNames(iconButton, 'relative')}
              >
                <Bookmark filled={bookmarks.length > 0} />
                {bookmarks.length > 0 && (
                  <span className="absolute right-1 top-1.5 flex h-4 min-w-4 items-center justify-center bg-accent px-1 text-[10px] font-semibold text-paper">
                    {bookmarks.length > 9 ? '9+' : bookmarks.length}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className={iconButton}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <Link
                to="/admin"
                aria-label="Editorial desk"
                title="Editorial desk"
                className="focus-ring ml-1.5 hidden h-9 w-9 items-center justify-center bg-ink text-[0.6875rem] font-semibold tracking-[0.1em] text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper sm:flex"
              >
                ED
              </Link>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={primaryLinks} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
