import { ContentBlock } from '@/types'
import { slugify } from '@/lib/utils'
import ArticleImage from './ArticleImage'

export default function ArticleBody({ content }: { content: ContentBlock[] }) {
  return (
    <div className="prose-article">
      {content.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i}>{block.text}</p>

          case 'heading': {
            const id = slugify(block.text)
            const Tag = block.level === 2 ? 'h2' : 'h3'
            return (
              <Tag key={i} id={id} className="scroll-mt-28">
                {block.text}
              </Tag>
            )
          }

          case 'quote':
            return (
              <blockquote key={i} className="border-t border-line pt-6 dark:border-line-dark">
                <p>{block.text}</p>
                {block.attribution && (
                  <footer className="mt-4 font-sans text-sm not-italic text-ink-muted dark:text-paper/55">
                    {block.attribution}
                  </footer>
                )}
              </blockquote>
            )

          case 'image':
            return (
              <figure key={i} className="my-10 -mx-5 sm:mx-0">
                <ArticleImage src={block.src} alt={block.alt} ratio="landscape" sizes="(min-width: 1024px) 720px, 100vw" />
                {block.caption && (
                  <figcaption className="mt-3 px-5 font-sans text-xs leading-relaxed text-faint sm:px-0">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          case 'list':
            return block.style === 'bullet' ? (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            ) : (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )

          case 'code':
            return (
              <pre key={i}>
                <code>{block.code}</code>
              </pre>
            )

          case 'divider':
            return <hr key={i} className="my-10 border-line dark:border-line-dark" />

          case 'callout':
            return (
              <aside
                key={i}
                className="my-9 border-l-2 border-accent bg-paper-dim px-5 py-4 font-sans text-[0.9375rem] leading-relaxed text-ink-soft dark:bg-surface-darkAlt dark:text-paper/75"
              >
                {block.text}
              </aside>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
