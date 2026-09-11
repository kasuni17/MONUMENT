import { ContentBlock } from '@/types'
import { Trash } from '@/components/icons'

interface BlockEditorProps {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
}

const blockTypes: { type: ContentBlock['type']; label: string }[] = [
  { type: 'paragraph', label: 'Paragraph' },
  { type: 'heading', label: 'Heading' },
  { type: 'quote', label: 'Quote' },
  { type: 'image', label: 'Image' },
  { type: 'list', label: 'List' },
  { type: 'code', label: 'Code' },
  { type: 'callout', label: 'Callout' },
  { type: 'divider', label: 'Divider' },
]

function emptyBlock(type: ContentBlock['type']): ContentBlock {
  switch (type) {
    case 'paragraph': return { type, text: '' }
    case 'heading': return { type, text: '', level: 2 }
    case 'quote': return { type, text: '', attribution: '' }
    case 'image': return { type, src: '', alt: '', caption: '' }
    case 'list': return { type, style: 'bullet', items: [''] }
    case 'code': return { type, code: '', language: '' }
    case 'callout': return { type, text: '', tone: 'note' }
    case 'divider': return { type }
  }
}

const inputClass = 'focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper'

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  function update(index: number, block: ContentBlock) {
    const next = [...blocks]
    next[index] = block
    onChange(next)
  }

  function remove(index: number) {
    onChange(blocks.filter((_, i) => i !== index))
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= blocks.length) return
    const next = [...blocks]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  function add(type: ContentBlock['type']) {
    onChange([...blocks, emptyBlock(type)])
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div key={i} className="border border-line bg-paper p-4 dark:border-line-dark dark:bg-surface-darkAlt">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{block.type}</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="focus-ring h-8 w-8 text-ink-muted hover:text-accent disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} className="focus-ring h-8 w-8 text-ink-muted hover:text-accent disabled:opacity-30">↓</button>
              <button type="button" onClick={() => remove(i)} aria-label="Remove block" className="focus-ring h-8 w-8 text-ink-muted hover:text-accent"><Trash size={14} /></button>
            </div>
          </div>

          {block.type === 'paragraph' && (
            <textarea className={inputClass} rows={3} value={block.text} onChange={(e) => update(i, { ...block, text: e.target.value })} placeholder="Paragraph text…" />
          )}

          {block.type === 'heading' && (
            <div className="flex gap-2">
              <select className={inputClass + ' w-24 flex-none'} value={block.level} onChange={(e) => update(i, { ...block, level: Number(e.target.value) as 2 | 3 })}>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
              <input className={inputClass} value={block.text} onChange={(e) => update(i, { ...block, text: e.target.value })} placeholder="Heading text…" />
            </div>
          )}

          {block.type === 'quote' && (
            <div className="space-y-2">
              <textarea className={inputClass} rows={2} value={block.text} onChange={(e) => update(i, { ...block, text: e.target.value })} placeholder="Quote text…" />
              <input className={inputClass} value={block.attribution ?? ''} onChange={(e) => update(i, { ...block, attribution: e.target.value })} placeholder="Attribution (optional)" />
            </div>
          )}

          {block.type === 'image' && (
            <div className="space-y-2">
              <input className={inputClass} value={block.src} onChange={(e) => update(i, { ...block, src: e.target.value })} placeholder="Image URL" />
              <input className={inputClass} value={block.alt} onChange={(e) => update(i, { ...block, alt: e.target.value })} placeholder="Alt text (required for accessibility)" />
              <input className={inputClass} value={block.caption ?? ''} onChange={(e) => update(i, { ...block, caption: e.target.value })} placeholder="Caption (optional)" />
            </div>
          )}

          {block.type === 'list' && (
            <div className="space-y-2">
              <select className={inputClass} value={block.style} onChange={(e) => update(i, { ...block, style: e.target.value as 'bullet' | 'number' })}>
                <option value="bullet">Bullet list</option>
                <option value="number">Numbered list</option>
              </select>
              {block.items.map((item, j) => (
                <div key={j} className="flex gap-2">
                  <input
                    className={inputClass}
                    value={item}
                    onChange={(e) => {
                      const items = [...block.items]
                      items[j] = e.target.value
                      update(i, { ...block, items })
                    }}
                    placeholder={`Item ${j + 1}`}
                  />
                  <button type="button" onClick={() => update(i, { ...block, items: block.items.filter((_, k) => k !== j) })} className="focus-ring h-10 w-10 flex-none text-ink-muted hover:text-accent">
                    <Trash size={14} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => update(i, { ...block, items: [...block.items, ''] })} className="focus-ring text-xs font-semibold text-accent">+ Add item</button>
            </div>
          )}

          {block.type === 'code' && (
            <div className="space-y-2">
              <input className={inputClass} value={block.language ?? ''} onChange={(e) => update(i, { ...block, language: e.target.value })} placeholder="Language (optional)" />
              <textarea className={inputClass + ' font-mono'} rows={4} value={block.code} onChange={(e) => update(i, { ...block, code: e.target.value })} placeholder="Code…" />
            </div>
          )}

          {block.type === 'callout' && (
            <div className="space-y-2">
              <select className={inputClass} value={block.tone ?? 'note'} onChange={(e) => update(i, { ...block, tone: e.target.value as 'note' | 'warning' })}>
                <option value="note">Note</option>
                <option value="warning">Warning</option>
              </select>
              <textarea className={inputClass} rows={2} value={block.text} onChange={(e) => update(i, { ...block, text: e.target.value })} placeholder="Callout text…" />
            </div>
          )}

          {block.type === 'divider' && <p className="text-xs text-ink-muted">A horizontal divider will render here.</p>}
        </div>
      ))}

      <div className="flex flex-wrap gap-2 border border-dashed border-line p-3 dark:border-line-dark">
        {blockTypes.map((bt) => (
          <button
            key={bt.type}
            type="button"
            onClick={() => add(bt.type)}
            className="focus-ring border border-line px-3 py-1.5 text-xs font-medium text-ink hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper"
          >
            + {bt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
