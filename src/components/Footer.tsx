import { Link } from 'react-router-dom'
import Container from './Container'
import { categories } from '@/data/categories'
import { collections } from '@/data/collections'

const readLinks = [
  { to: '/blog', label: 'All stories' },
  { to: '/trending', label: 'Trending' },
  { to: '/categories', label: 'Topics' },
  { to: '/collections', label: 'Collections' },
  { to: '/bookmarks', label: 'Your reading list' },
]

const aboutLinks = [
  { to: '/about', label: 'About MONUMENT' },
  { to: '/contact', label: 'Contact the desk' },
  { to: '/newsletter', label: 'The Weekend Edit' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow text-faint">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <Link
              to={link.to}
              className="focus-ring text-sm text-ink-soft transition-colors hover:text-accent dark:text-paper/70 dark:hover:text-accent-soft"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-12 lg:py-16">
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <Link
              to="/"
              className="focus-ring font-display text-xl font-semibold uppercase tracking-[0.22em] text-ink dark:text-paper"
            >
              Monument
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted dark:text-paper/60">
              An independent publication about the ideas, objects and people shaping how we live and work.
              Published twice a week, read slowly.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-faint">
              A frontend demonstration. Every writer, comment and subscriber here is fictional, and nothing
              typed into this site is stored anywhere.
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Read" links={readLinks} />
          </div>

          <div className="lg:col-span-2">
            <FooterColumn
              title="Sections"
              links={categories.slice(0, 6).map((c) => ({ to: `/category/${c.slug}`, label: c.name }))}
            />
          </div>

          <div className="lg:col-span-2">
            <FooterColumn
              title="Collections"
              links={collections.slice(0, 5).map((c) => ({ to: `/collections/${c.slug}`, label: c.name }))}
            />
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="About" links={aboutLinks} />
          </div>
        </div>

        <div className="border-t border-line py-7 dark:border-line-dark">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-muted dark:text-paper/55">
              &copy; {year} MONUMENT. All rights reserved.
            </p>
            <p className="flex items-center gap-3 text-sm">
              <span className="h-px w-8 bg-line-strong dark:bg-line-darkStrong" aria-hidden="true" />
              <span className="text-ink-muted dark:text-paper/55">Developed by</span>
              <span className="font-display text-base font-semibold tracking-[-0.01em] text-ink dark:text-paper">
                Kasuni Peiris
              </span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
