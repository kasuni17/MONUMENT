import { ContentBlock } from '@/types'
import { slugify } from '@/lib/utils'

export function headingsOf(content: ContentBlock[]) {
  return content
    .filter((b): b is Extract<ContentBlock, { type: 'heading' }> => b.type === 'heading')
    .map((h) => ({ text: h.text, id: slugify(h.text) }))
}

export default function TableOfContents({ content }: { content: ContentBlock[] }) {
  const headings = headingsOf(content)
  if (headings.length < 2) return null

  return (
    <nav aria-label="In this story" className="border-t border-line pt-5 dark:border-line-dark">
      <p className="eyebrow text-faint">In this story</p>
      <ol className="mt-4 space-y-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="focus-ring block text-sm leading-snug text-ink-soft transition-colors hover:text-accent dark:text-paper/70">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
