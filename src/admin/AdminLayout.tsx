import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { classNames } from '@/lib/utils'
import { useTheme } from '@/lib/theme'
import { Menu, X, Sun, Moon, LogOut } from '@/components/icons'

interface NavItem { to: string; label: string }
interface NavGroup { heading?: string; items: NavItem[] }

const groups: NavGroup[] = [
  { items: [{ to: '/admin', label: 'Dashboard' }] },
  { heading: 'Content', items: [
    { to: '/admin/posts', label: 'Posts' },
    { to: '/admin/posts?status=draft', label: 'Drafts' },
    { to: '/admin/posts?status=scheduled', label: 'Scheduled' },
    { to: '/admin/categories', label: 'Categories' },
    { to: '/admin/tags', label: 'Tags' },
    { to: '/admin/media', label: 'Media' },
  ] },
  { heading: 'People', items: [
    { to: '/admin/authors', label: 'Authors' },
    { to: '/admin/users', label: 'Team' },
  ] },
  { heading: 'Engagement', items: [
    { to: '/admin/comments', label: 'Comments' },
    { to: '/admin/newsletter', label: 'Newsletter' },
  ] },
  { heading: 'Analytics', items: [{ to: '/admin/analytics', label: 'Analytics' }] },
  { heading: 'Settings', items: [{ to: '/admin/settings', label: 'Settings' }] },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <Link to="/" className="focus-ring font-serif text-xl font-bold text-paper">MONUMENT</Link>
        <span className="rounded-sm bg-paper/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-paper/70">Admin</span>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {groups.map((group, i) => (
          <div key={i}>
            {group.heading && <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-paper/60">{group.heading}</p>}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    classNames(
                      'focus-ring flex min-h-[40px] items-center rounded-sm px-3 text-sm font-medium transition-colors',
                      isActive ? 'bg-paper/10 text-paper' : 'text-paper/75 hover:bg-paper/5 hover:text-paper'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-paper/10 px-3 py-4">
        <Link to="/" className="focus-ring flex min-h-[40px] items-center gap-2 rounded-sm px-3 text-sm font-medium text-paper/75 hover:bg-paper/5 hover:text-paper">
          <LogOut size={16} /> View site
        </Link>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => setDrawerOpen(false), [location.pathname])

  return (
    <div className="min-h-screen bg-paper-dim dark:bg-surface-dark">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-ink dark:bg-black lg:block">
        <SidebarContent />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="animate-slideIn absolute inset-y-0 left-0 w-72 bg-ink dark:bg-black">
            <div className="flex justify-end px-3 pt-3">
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="focus-ring flex h-11 w-11 items-center justify-center text-paper">
                <X />
              </button>
            </div>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper px-4 py-3 dark:border-line-dark dark:bg-surface-darkAlt sm:px-6">
          <button onClick={() => setDrawerOpen(true)} aria-label="Open menu" className="focus-ring flex h-11 w-11 items-center justify-center text-ink dark:text-paper lg:hidden">
            <Menu />
          </button>
          <p className="hidden text-sm text-ink-muted lg:block">Editorial CMS</p>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="focus-ring flex h-10 w-10 items-center justify-center text-ink dark:text-paper">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">JH</div>
              <span className="hidden text-sm font-medium text-ink dark:text-paper sm:block">Julia Hartmann</span>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
