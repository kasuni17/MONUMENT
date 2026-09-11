import { Link } from 'react-router-dom'
import { authors } from '@/data/authors'
import { editorialImages } from '@/data/images'
import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'
import ArticleImage from '@/components/ArticleImage'
import Newsletter from '@/components/Newsletter'
import { ArrowRight } from '@/components/icons'

const principles = [
  {
    title: 'Write for the reader who stays',
    body: 'We would rather have ten thousand people finish a story than a million leave after the headline. That single preference decides most of what we publish.',
  },
  {
    title: 'Slow down when it matters',
    body: 'Very little has to run today. A second draft, a third source and a week of distance improve almost everything, and the internet will still be there.',
  },
  {
    title: 'Show the working',
    body: 'Where a number came from, what a study did not test, which claim we could not confirm. Context belongs in the piece, not in a correction later.',
  },
  {
    title: 'Design is part of the writing',
    body: 'A layout decides how a paragraph lands. We treat typography, pacing and pictures as editorial choices rather than decoration applied at the end.',
  },
]

export default function About() {
  useSeo({
    title: 'About',
    description:
      'MONUMENT is an independent publication about the ideas, objects and people shaping how we live and work.',
  })

  const masthead = authors.filter((a) => a.status === 'active')

  return (
    <>
      <Container as="header" className="border-b border-line py-12 dark:border-line-dark lg:py-16">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent dark:text-accent-soft">About MONUMENT</p>
            <h1 className="display-xl mt-4 text-ink dark:text-paper">
              A publication for people who still like to read.
            </h1>
            <p className="lede mt-5 max-w-measure">
              Fifteen writers, nine sections, two editions a week. We are interested in the parts of a story that
              take a while to explain.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ArticleImage
              src={editorialImages['about-newsroom'].src}
              alt="A stack of newspapers on a desk"
              ratio="landscape"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 520px, 94vw"
            />
          </div>
        </div>
      </Container>

      <Container as="section" className="section-tight">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 className="eyebrow text-faint">Who we are</h2>
          </div>
          <div className="prose-article lg:col-span-8">
            <p>
              MONUMENT began as a shared document between four people who were tired of reading the same five
              opinions about every subject. We wanted somewhere that treated a reader time as worth something:
              fewer stories, argued more carefully, laid out to be read rather than skimmed.
            </p>
            <p>
              We cover technology, business, design, culture, lifestyle, travel, opinion, architecture and, when
              the reporting justifies it, science. We are not trying to cover everything. We are trying to cover
              the things worth an hour of your week and to be honest about the rest.
            </p>
            <h2>How we work</h2>
            <p>
              Every story passes two editors. We correct in public, we say when a piece has been updated, and we
              do not run sponsored work dressed as reporting. None of that makes us unusual. It is the floor, and
              we would rather state it plainly than imply it.
            </p>
          </div>
        </div>
      </Container>

      <section className="section-tight border-y border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
        <Container>
          <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">
            What we hold ourselves to
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {principles.map((principle, i) => (
              <article key={principle.title} className="flex gap-4">
                <span aria-hidden="true" className="font-display text-lg font-semibold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="display-sm text-ink dark:text-paper">{principle.title}</h3>
                  <p className="mt-2 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/65">
                    {principle.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container as="section" className="section-tight">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4 dark:border-line-dark">
          <div>
            <p className="eyebrow text-accent dark:text-accent-soft">The masthead</p>
            <h2 className="display-md mt-2 text-ink dark:text-paper">Who writes MONUMENT</h2>
          </div>
          <p className="meta">{masthead.length} contributors</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {masthead.map((author) => (
            <Link key={author.id} to={`/author/${author.slug}`} className="focus-ring group">
              <img
                src={author.avatar}
                alt=""
                width={160}
                height={160}
                className="aspect-square w-full object-cover"
              />
              <p className="mt-3 font-display text-[0.9375rem] font-semibold leading-snug text-ink dark:text-paper">
                <span className="link-underline">{author.name}</span>
              </p>
              <p className="meta mt-1">{author.role}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 max-w-measure border-t border-line pt-6 text-xs leading-relaxed text-faint dark:border-line-dark">
          MONUMENT is a frontend demonstration. Every contributor above is a fictional editorial persona written
          for this project, not a real journalist, and the stories are original work produced for the demo rather
          than reporting on real events.
        </p>
      </Container>

      <Container as="section" className="pb-16">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 border-t border-line pt-12 dark:border-line-dark lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="display-md text-ink dark:text-paper">Have a story, or a correction?</h2>
            <p className="mt-3 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/65">
              The desk reads everything, including the messages telling us we got something wrong. Especially
              those.
            </p>
            <Link
              to="/contact"
              className="focus-ring group mt-6 inline-flex min-h-[48px] items-center gap-2 bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
            >
              Get in touch
              <ArrowRight size={15} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="lg:col-span-6">
            <Newsletter variant="panel" />
          </div>
        </div>
      </Container>
    </>
  )
}
