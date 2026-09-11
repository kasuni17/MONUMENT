import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'

const desks = [
  { name: 'Story tips', email: 'tips@monument.pub', note: 'Something we should be looking at. A line is enough.' },
  { name: 'Corrections', email: 'corrections@monument.pub', note: 'If we got it wrong, tell us plainly and we will say so.' },
  { name: 'Pitches', email: 'pitches@monument.pub', note: 'Two paragraphs, the argument, and why you are the person to write it.' },
]

export default function Contact() {
  useSeo({ title: 'Contact', description: 'Reach the MONUMENT desk: tips, corrections and pitches.' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'We need a name to reply to.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'That address does not look right.'
    if (!form.subject.trim()) next.subject = 'A subject line helps it reach the right desk.'
    if (form.message.trim().length < 10) next.message = 'A little more detail, please.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const field =
    'focus-ring w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-faint dark:border-line-dark dark:bg-surface-darkAlt dark:text-paper'

  return (
    <Container as="section" className="py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-accent dark:text-accent-soft">Get in touch</p>
          <h1 className="display-lg mt-3 text-ink dark:text-paper">Contact the desk</h1>
          <p className="lede mt-4 max-w-measure">
            Tips, corrections, pitches and complaints all arrive in the same place, and all of them are read.
          </p>

          <dl className="mt-10 space-y-6 border-t border-line pt-8 dark:border-line-dark">
            {desks.map((desk) => (
              <div key={desk.name}>
                <dt className="eyebrow text-faint">{desk.name}</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${desk.email}`}
                    className="focus-ring font-display text-[1.0625rem] font-semibold text-ink transition-colors hover:text-accent dark:text-paper"
                  >
                    {desk.email}
                  </a>
                  <p className="mt-1 text-sm text-ink-muted dark:text-paper/60">{desk.note}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="border border-line p-8 dark:border-line-dark sm:p-10">
              <p className="eyebrow text-accent dark:text-accent-soft">Received</p>
              <h2 className="display-md mt-3 text-ink dark:text-paper">Thank you, that has reached the desk.</h2>
              <p className="mt-4 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/65">
                In a working newsroom you would hear back within two days. This is a frontend demonstration, so
                nothing was sent and nothing was stored: the message existed only in this page while you typed it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: '', email: '', subject: '', message: '' })
                    setSubmitted(false)
                  }}
                  className="focus-ring min-h-[44px] border border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
                >
                  Write another
                </button>
                <Link
                  to="/blog"
                  className="focus-ring inline-flex min-h-[44px] items-center px-2 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
                >
                  Back to the archive
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="border border-line p-6 dark:border-line-dark sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
                    Name
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    className={field}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-accent">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    className={field}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-accent">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
                  Subject
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => update('subject', e.target.value)}
                  aria-invalid={!!errors.subject}
                  className={field}
                />
                {errors.subject && <p className="mt-1.5 text-xs text-accent">{errors.subject}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  aria-invalid={!!errors.message}
                  className={field}
                />
                {errors.message && <p className="mt-1.5 text-xs text-accent">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="focus-ring mt-6 min-h-[48px] w-full bg-ink px-8 text-sm font-semibold text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper sm:w-auto"
              >
                Send to the desk
              </button>
              <p className="mt-4 text-xs text-faint">
                A demonstration form. Nothing is transmitted and nothing is saved.
              </p>
            </form>
          )}
        </div>
      </div>
    </Container>
  )
}
