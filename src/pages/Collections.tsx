import { collections } from '@/data/collections'
import { usePublishedPosts } from '@/lib/content'
import { useSeo } from '@/hooks/useSeo'
import Container from '@/components/Container'
import PageIntro from '@/components/PageIntro'
import CollectionCard from '@/components/CollectionCard'
import Newsletter from '@/components/Newsletter'

export default function Collections() {
  useSeo({
    title: 'Collections',
    description: 'Curated MONUMENT collections: stories grouped around a single argument rather than a publication date.',
  })

  const published = usePublishedPosts()
  const countFor = (slugs: string[]) => published.filter((p) => slugs.includes(p.slug)).length

  const [lead, ...rest] = collections

  return (
    <>
      <PageIntro
        eyebrow="Curated"
        title="Collections"
        description="Six running arguments, each assembled by the desk. Read one end to end and it should add up to something."
        meta={`${collections.length} collections`}
      />

      <Container as="section" className="section-tight">
        <CollectionCard collection={lead} count={countFor(lead.storySlugs)} variant="lead" />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-line pt-12 dark:border-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              count={countFor(collection.storySlugs)}
            />
          ))}
        </div>
      </Container>

      <Container as="section" className="pb-16">
        <Newsletter variant="panel" />
      </Container>
    </>
  )
}
