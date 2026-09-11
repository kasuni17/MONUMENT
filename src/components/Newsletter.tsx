import { FormEvent, useState } from 'react'
import { useToast } from '@/lib/toast'
import { useContent } from '@/lib/content'
import { editorialImages } from '@/data/images'
import ArticleImage from './ArticleImage'
import { classNames } from '@/lib/utils'

interface NewsletterProps {
  /** `block` is the full editorial panel, `inline` is just the form. */
  variant?: 'block' | 'inline' | 'panel'
  className?: string
}

export default function Newsletter({ variant = 'block', className }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { showToast } = useToast()
  const { subscribers } = useContent()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('That address does not look right. Check it and try again.')
      return
    }
    setError('')
    subscribers.add({ id: email, email, subscribedAt: new Date().toISOString(), status: 'subscribed' })
    setSubscribed(true)
    showToast('You are on the list for Friday.', 'success')
    setEmail('')
  }

  const form = (
    <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:gap-0">
      <div className="flex-1">
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={!!error}
          aria-describedby={error ? `newsletter-error-${variant}` : undefined}
          className="focus-ring h-12 w-full min-w-0 border border-line bg-paper px-4 text-sm text-ink placeholder:text-faint dark:border-line-dark dark:bg-surface-dark dark:text-paper sm:border-r-0"
        />
      </div>
      <button
        type="submit"
        className="focus-ring h-12 shrink-0 bg-ink px-7 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
      >
        Subscribe
      </button>
      {error && (
        <p id={`newsletter-error-${variant}`} className="mt-1 text-xs text-accent sm:hidden">
          {error}
        </p>
      )}
    </form>
  )

  const confirmation = (
    <div>
      <p className="display-sm text-ink dark:text-paper">Thank you, you are on the list.</p>
      <p className="mt-2 text-sm text-ink-muted dark:text-paper/60">
        The next edit goes out on Friday morning. Nothing was stored anywhere: this is a frontend demo.
      </p>
    </div>
  )

  if (variant === 'inline') {
    return (
      <div className={className}>
        {subscribed ? confirmation : form}
        {error && !subscribed && <p className="mt-2 hidden text-xs text-accent sm:block">{error}</p>}
      </div>
    )
  }

  if (variant === 'panel') {
    return (
      <div className={classNames('border border-line p-6 dark:border-line-dark sm:p-8', className)}>
        <p className="eyebrow text-accent dark:text-accent-soft">The Weekend Edit</p>
        <h2 className="display-sm mt-2 text-ink dark:text-paper">
          A considered selection, every Friday.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-paper/60">
          Six stories, one thing worth looking at, and nothing we would not read ourselves.
        </p>
        <div className="mt-5">{subscribed ? confirmation : form}</div>
        {error && !subscribed && <p className="mt-2 hidden text-xs text-accent sm:block">{error}</p>}
      </div>
    )
  }

  return (
    <section className={classNames('grid grid-cols-1 border border-line dark:border-line-dark lg:grid-cols-12', className)}>
      <div className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1 lg:col-span-7 lg:p-12">
        <p className="eyebrow text-accent dark:text-accent-soft">The Weekend Edit</p>
        <h2 className="display-md mt-3 text-ink dark:text-paper">
          A considered selection of stories, ideas and things worth your attention.
        </h2>
        <p className="lede mt-4 max-w-measure">
          One email on Friday morning. Six stories we are proud of, a paragraph on why, and one thing that has
          nothing to do with work.
        </p>
        <div className="mt-7">{subscribed ? confirmation : form}</div>
        {error && !subscribed && <p className="mt-2 hidden text-xs text-accent sm:block">{error}</p>}
        <p className="mt-5 text-xs text-faint">
          No tracking, no third parties, and an unsubscribe link at the bottom of every edition.
        </p>
      </div>
      <div className="order-1 lg:order-2 lg:col-span-5">
        <ArticleImage
          src={editorialImages['newsletter-desk'].src}
          alt="A laptop, a magazine and a coffee on a table in the morning"
          ratio="free"
          className="h-56 sm:h-72 lg:h-full"
          sizes="(min-width: 1024px) 520px, 100vw"
        />
      </div>
    </section>
  )
}
