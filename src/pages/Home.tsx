import { Link } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import { collections } from '@/data/collections'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import FeaturedStory from '@/components/FeaturedStory'
import EditorialCard from '@/components/EditorialCard'
import TrendingSection from '@/components/TrendingSection'
import TopicCard from '@/components/TopicCard'
import CollectionCard from '@/components/CollectionCard'
import Newsletter from '@/components/Newsletter'
import ArticleImage from '@/components/ArticleImage'
import { useSeo } from '@/hooks/useSeo'
import { ArrowRight } from '@/components/icons'
import { formatDateLong } from '@/lib/utils'

export default function Home() {
  useSeo({
    title: 'MONUMENT, an independent publication',
    description:
      'Stories about the ideas, objects and people shaping how we live and work. Published twice a week, read slowly.',
    type: 'website',
  })

  const published = usePublishedPosts()
  const { categories, authors } = useContent()

  const lead = published.find((p) => p.featured) ?? published[0]

  // Each rail draws from what the ones above it have not already used, so no
  // story appears twice on the front page. Trending is the exception: it is a
  // chart of what people are reading, and excluding the lead would misreport it.
  const used = new Set<string>([lead.id])
  const take = (pool: typeof published, count: number) => {
    const picked = pool.filter((p) => !used.has(p.id)).slice(0, count)
    picked.forEach((p) => used.add(p.id))
    return picked
  }

  const supporting = take(published.filter((p) => p.featured), 2)
  const picks = take(published.filter((p) => p.editorsPick), 4)
  const latest = take(published, 7)
  const longRead = take([...published].sort((a, b) => b.readingTime - a.readingTime), 1)[0]

  const trending = [...published].sort((a, b) => b.views - a.views).slice(0, 6)
  const featuredCollections = collections.slice(0, 3)

  const columnist = authors.items.find((a) => a.id === 'a8')
  const columnistPosts = columnist ? published.filter((p) => p.authorId === columnist.id).slice(0, 3) : []

  const storiesFor = (categoryId: string) => published.filter((p) => p.categoryId === categoryId)

  return (
    <>
      {/* Masthead line, so the front page reads as an edition */}
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3 dark:border-line-dark">
          <p className="eyebrow text-faint">Today, {formatDateLong(new Date().toISOString())}</p>
          <p className="eyebrow text-faint">{published.length} stories in the archive</p>
        </div>
      </Container>

      {/* Lead story with two supporting pieces */}
      <Container as="section" className="py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FeaturedStory post={lead} layout="stacked" as="h1" />
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-10 lg:dark:border-line-dark">
            <h2 className="eyebrow border-b border-line pb-3 text-faint dark:border-line-dark">
              Also in this edition
            </h2>
            <div className="mt-6 space-y-7">
              {supporting.map((post, i) => (
                <div key={post.id} className={i > 0 ? 'border-t border-line pt-7 dark:border-line-dark' : ''}>
                  <EditorialCard post={post} variant="standard" ratio="wide" priority={i === 0} />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>

      {/* Latest, deliberately mixed rather than a uniform grid */}
      <Container as="section" className="section-tight border-t border-line dark:border-line-dark">
        <SectionHeader
          eyebrow="Just published"
          title="Latest stories"
          action={{ to: '/blog', label: 'All stories' }}
        />

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {latest[0] && <EditorialCard post={latest[0]} variant="feature" priority />}
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {latest.slice(1, 3).map((post, i) => (
              <div key={post.id} className={i > 0 ? 'sm:border-l sm:border-line sm:pl-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8 dark:sm:border-line-dark' : ''}>
                <EditorialCard post={post} variant="row" showExcerpt={false} />
              </div>
            ))}
          </div>
        </div>

        {latest.length > 3 && (
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-line pt-10 dark:border-line-dark md:grid-cols-2 xl:grid-cols-4">
            {latest.slice(3, 7).map((post) => (
              <EditorialCard key={post.id} post={post} variant="standard" showSave />
            ))}
          </div>
        )}
      </Container>

      <TrendingSection posts={trending} />

      {/* Editor's picks, portrait crops for contrast with the grids above */}
      {picks.length > 0 && (
        <Container as="section" className="section-tight">
          <SectionHeader
            eyebrow="Chosen by the desk"
            title="Editors' picks"
            description="Four stories our editors keep sending to each other."
            action={{ to: '/collections', label: 'Browse collections' }}
          />
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4 lg:gap-x-10">
            {picks.map((post) => (
              <EditorialCard key={post.id} post={post} variant="portrait" />
            ))}
          </div>
        </Container>
      )}

      {/* Columnist spotlight */}
      {columnist && columnistPosts.length > 0 && (
        <section className="section-tight border-y border-line bg-paper-dim dark:border-line-dark dark:bg-surface-darkAlt">
          <Container>
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="eyebrow text-accent dark:text-accent-soft">From our columnist</p>
                <div className="mt-5 flex items-center gap-4">
                  <img src={columnist.avatar} alt="" width={72} height={72} className="h-16 w-16 object-cover sm:h-[72px] sm:w-[72px]" />
                  <div>
                    <h2 className="display-sm text-ink dark:text-paper">{columnist.name}</h2>
                    <p className="meta mt-1">{columnist.role}, {columnist.location}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-measure text-sm leading-relaxed text-ink-muted dark:text-paper/65">
                  {columnist.bio}
                </p>
                <Link
                  to={`/author/${columnist.slug}`}
                  className="focus-ring group mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink dark:text-paper"
                >
                  <span className="link-underline">Read everything by {columnist.name.split(' ')[0]}</span>
                  <ArrowRight size={14} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
                  {columnistPosts.map((post) => (
                    <EditorialCard key={post.id} post={post} variant="standard" ratio="square" showExcerpt={false} />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Collections */}
      <Container as="section" className="section-tight">
        <SectionHeader
          eyebrow="Curated"
          title="Collections"
          description="Stories grouped by an argument rather than a date."
          action={{ to: '/collections', label: 'All collections' }}
        />
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {featuredCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              count={collection.storySlugs.length}
            />
          ))}
        </div>
      </Container>

      {/* Topics */}
      <Container as="section" className="section-tight border-t border-line dark:border-line-dark">
        <SectionHeader
          eyebrow="Where to start"
          title="Topics"
          description="Nine standing sections, each with an editor and a point of view."
          action={{ to: '/categories', label: 'All topics' }}
        />
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.items.slice(0, 4).map((category) => (
            <TopicCard key={category.id} category={category} count={storiesFor(category.id).length} />
          ))}
        </div>
        <ul className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8 dark:border-line-dark">
          {categories.items.slice(4).map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category.slug}`}
                className="focus-ring inline-flex items-baseline gap-2 border border-line px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink dark:border-line-dark dark:text-paper/70 dark:hover:border-paper dark:hover:text-paper"
              >
                {category.name}
                <span className="text-xs text-faint">{storiesFor(category.id).length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* The long read */}
      {longRead && (
        <Container as="section" className="section-tight border-t border-line dark:border-line-dark">
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Link to={`/blog/${longRead.slug}`} className="focus-ring group block">
                <ArticleImage
                  src={longRead.image}
                  alt={longRead.imageAlt}
                  ratio="tall"
                  sizes="(min-width: 1024px) 460px, 94vw"
                  zoom
                />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent dark:text-accent-soft">The long read</p>
              <h2 className="display-lg mt-4 text-ink dark:text-paper">
                <Link to={`/blog/${longRead.slug}`} className="focus-ring group">
                  <span className="link-underline">{longRead.title}</span>
                </Link>
              </h2>
              <p className="lede mt-5 max-w-measure">{longRead.excerpt}</p>
              <p className="mt-6 text-sm text-ink-muted dark:text-paper/60">
                {longRead.readingTime} minutes, by{' '}
                {authors.items.find((a) => a.id === longRead.authorId)?.name}. Worth a proper sit down rather than
                the gap between two meetings.
              </p>
              <Link
                to={`/blog/${longRead.slug}`}
                className="focus-ring group mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent dark:border-paper dark:text-paper"
              >
                Start reading
                <ArrowRight size={15} className="transition-transform duration-300 ease-editorial group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      )}

      <Container as="section" className="section-tight">
        <Newsletter />
      </Container>
    </>
  )
}
