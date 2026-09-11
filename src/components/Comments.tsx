import { FormEvent, useState } from 'react'
import { useContent } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/lib/toast'
import EmptyState from './EmptyState'

export default function Comments({ postId }: { postId: string }) {
  const { comments } = useContent()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const postComments = comments.items
    .filter((c) => c.postId === postId && c.status === 'approved')
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  function validate() {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.'
    if (!text.trim()) next.text = 'Write something first.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    comments.add({
      id: `cm-${Date.now()}`,
      postId,
      authorName: name.trim(),
      authorEmail: email.trim(),
      text: text.trim(),
      date: new Date().toISOString(),
      status: 'pending',
    })
    setName('')
    setEmail('')
    setText('')
    showToast('Thanks, your response is with the moderators.', 'success')
  }

  return (
    <div>
      <h2 className="display-sm text-ink dark:text-paper">
        Responses {postComments.length > 0 && <span className="text-faint">({postComments.length})</span>}
      </h2>
      <p className="mt-2 text-xs text-ink-muted">
        A demonstration thread. Anything posted here lives in this browser tab for as long as it stays open, and
        is never sent anywhere.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 border border-line p-5 dark:border-line-dark">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className="mb-1 block text-xs font-medium text-ink-muted">Name</label>
            <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name}
              className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />
            {errors.name && <p className="mt-1 text-xs text-accent">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="c-email" className="mb-1 block text-xs font-medium text-ink-muted">Email</label>
            <input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email}
              className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />
            {errors.email && <p className="mt-1 text-xs text-accent">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="c-text" className="mb-1 block text-xs font-medium text-ink-muted">Comment</label>
          <textarea id="c-text" value={text} onChange={(e) => setText(e.target.value)} rows={3} aria-invalid={!!errors.text}
            className="focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper" />
          {errors.text && <p className="mt-1 text-xs text-accent">{errors.text}</p>}
        </div>
        <button type="submit" className="focus-ring min-h-[44px] bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper">
          Post response
        </button>
      </form>

      {postComments.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No responses yet." description="Be the first to say something worth reading." />
        </div>
      ) : (
        <ul className="mt-8 space-y-6">
          {postComments.map((c) => (
            <li key={c.id} className="border-b border-line pb-6 last:border-0 dark:border-line-dark">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-dim text-sm font-semibold text-ink dark:bg-surface-darkAlt dark:text-paper">
                  {c.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-paper">{c.authorName}</p>
                  <p className="text-xs text-ink-muted">{formatDate(c.date)}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-paper/80">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
