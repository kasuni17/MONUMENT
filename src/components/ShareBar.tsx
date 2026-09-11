import { useToast } from '@/lib/toast'
import { Link2 } from './icons'
import { classNames } from '@/lib/utils'

interface ShareBarProps {
  postId: string
  title: string
  vertical?: boolean
}

export default function ShareBar({ title, vertical = false }: ShareBarProps) {
  const { showToast } = useToast()
  const url = typeof window !== 'undefined' ? window.location.href : ''

  function copyLink() {
    navigator.clipboard
      ?.writeText(url)
      .then(() => showToast('Link copied to your clipboard.', 'success'))
      .catch(() => showToast('Your browser blocked the copy. Copy the address bar instead.', 'error'))
  }

  const shareLinks = [
    {
      label: 'X',
      short: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: 'Facebook',
      short: 'FB',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: 'LinkedIn',
      short: 'IN',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'WhatsApp',
      short: 'WA',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ]

  const item =
    'focus-ring flex h-10 w-10 items-center justify-center border border-line text-[0.6875rem] font-semibold tracking-wide text-ink-soft transition-colors hover:border-accent hover:text-accent dark:border-line-dark dark:text-paper/75'

  return (
    <div className={classNames('flex items-center gap-2', vertical && 'flex-col items-start')}>
      {vertical && <p className="eyebrow mb-1 text-faint">Share</p>}
      <div className={classNames('flex gap-2', vertical && 'flex-col')}>
        <button type="button" onClick={copyLink} aria-label="Copy link to this story" className={item}>
          <Link2 size={17} />
        </button>
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            className={item}
          >
            {link.short}
          </a>
        ))}
      </div>
    </div>
  )
}
