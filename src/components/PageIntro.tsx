import { ReactNode } from 'react'
import Container from './Container'

interface PageIntroProps {
  eyebrow: string
  title: string
  description?: string
  meta?: string
  children?: ReactNode
}

/**
 * The masthead block every route opens with, so a topic page, an archive and
 * a search result all begin at the same place on the grid.
 */
export default function PageIntro({ eyebrow, title, description, meta, children }: PageIntroProps) {
  return (
    <Container as="header" className="border-b border-line pb-8 pt-10 dark:border-line-dark lg:pb-10 lg:pt-14">
      <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow text-accent dark:text-accent-soft">{eyebrow}</p>
          <h1 className="display-lg mt-3 text-ink dark:text-paper">{title}</h1>
          {description && <p className="lede mt-4 max-w-measure">{description}</p>}
        </div>
        <div className="lg:col-span-4 lg:text-right">
          {meta && <p className="meta">{meta}</p>}
          {children}
        </div>
      </div>
    </Container>
  )
}
