import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X, ArrowRight } from './icons'
import { categories } from '@/data/categories'
import { classNames } from '@/lib/utils'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

/**
 * A full navigation panel written for a phone rather than a compressed copy of
 * the desktop bar: large targets, the sections listed out, and the secondary
 * links kept where a thumb can reach them.
 */
export default function MobileDrawer({ open, onClose, links }: MobileDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    classNames(
      'focus-ring flex min-h-[52px] items-center justify-between border-b border-line px-5 font-display text-xl font-semibold tracking-[-0.01em] transition-colors dark:border-line-dark',
      isActive ? 'text-accent dark:text-accent-soft' : 'text-ink dark:text-paper'
    )

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-sm"
      />
      <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm animate-slideIn flex-col overflow-y-auto bg-paper dark:bg-surface-dark">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-line-dark">
          <span className="font-display text-lg font-semibold uppercase tracking-[0.22em] text-ink dark:text-paper">
            Monument
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="focus-ring -mr-2 flex h-11 w-11 items-center justify-center text-ink dark:text-paper"
          >
            <X />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={onClose} className={itemClass}>
              {link.label}
              <ArrowRight size={16} className="text-faint" />
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-6">
          <p className="eyebrow text-faint">Sections</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                onClick={onClose}
                className="focus-ring border border-line px-3 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink dark:border-line-dark dark:text-paper/75 dark:hover:border-paper dark:hover:text-paper"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-line px-5 py-5 dark:border-line-dark">
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft dark:text-paper/70">
            <Link to="/newsletter" onClick={onClose} className="focus-ring">Newsletter</Link>
            <Link to="/bookmarks" onClick={onClose} className="focus-ring">Reading list</Link>
            <Link to="/contact" onClick={onClose} className="focus-ring">Contact</Link>
            <Link to="/admin" onClick={onClose} className="focus-ring">Editorial desk</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
