import Container from '@/components/Container'
import Newsletter from '@/components/Newsletter'
import ArticleImage from '@/components/ArticleImage'
import { editorialImages } from '@/data/images'
import { useSeo } from '@/hooks/useSeo'
import { usePublishedPosts } from '@/lib/content'
import EditorialCard from '@/components/EditorialCard'

const editions = [
  {
    name: 'The Weekend Edit',
    when: 'Friday morning',
    description:
      'Six stories from the week, each with a line on why it is here, and one thing to look at that has nothing to do with work.',
  },
  {
    name: 'The Long Read',
    when: 'First of the month',
    description:
      'One feature, sent whole, for a morning when you have twenty minutes and no intention of scrolling.',
  },
  {
    name: 'Notes from the desk',
    when: 'Occasionally',
    description:
      'A short letter from the editor about what we are working on, what we abandoned, and what we got wrong.',
  },
]

export default function NewsletterPage() {
  useSeo({
    title: 'The Weekend Edit',
    description: 'A considered selection of stories, ideas and things worth your attention, every Friday.',
  })

  const published = usePublishedPosts()
  const recent = published.slice(0, 3)

  return (
    <>
      <Container as="header" className="border-b border-line py-12 dark:border-line-dark lg:py-16">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent dark:text-accent-soft">The Weekend Edit</p>
            <h1 className="display-xl mt-4 text-ink dark:text-paper">
              A considered selection of stories, ideas and things worth your attention.
            </h1>
            <p className="lede mt-5 max-w-measure">
              One email on Friday morning. Written by an editor, not assembled by a machine, and short enough to
              read before the coffee goes cold.
            </p>
            <div className="mt-8">
              <Newsletter variant="inline" />
            </div>
            <p className="mt-4 text-xs text-faint">
              A demonstration form. No email is sent, no address is stored, and the entry disappears when this tab
              closes.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ArticleImage
              src={editorialImages['about-print'].src}
              alt="A printing press running a magazine section"
              ratio="landscape"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 520px, 94vw"
            />
          </div>
        </div>
      </Container>

      <Container as="section" className="section-tight">
        <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">What arrives</h2>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {editions.map((edition) => (
            <article key={edition.name} className="border-t-2 border-ink pt-5 dark:border-paper">
              <p className="eyebrow text-accent dark:text-accent-soft">{edition.when}</p>
              <h3 className="display-sm mt-2 text-ink dark:text-paper">{edition.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-paper/60">{edition.description}</p>
            </article>
          ))}
        </div>
      </Container>

      <section className="section-tight border-t border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
        <Container>
          <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">
            In the last edition
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
            {recent.map((post) => (
              <EditorialCard key={post.id} post={post} variant="standard" showExcerpt={false} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
