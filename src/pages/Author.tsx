import { Link, Navigate, useParams } from 'react-router-dom'
import { useContent, usePublishedPosts } from '@/lib/content'
import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import EditorialCard from '@/components/EditorialCard'
import FeaturedStory from '@/components/FeaturedStory'
import { useSeo } from '@/hooks/useSeo'
import { ArrowLeft, Globe, Mail, MapPin } from '@/components/icons'

export default function AuthorPage() {
  const { slug } = useParams<{ slug: string }>()
  const { authors, categories } = useContent()
  const published = usePublishedPosts()

  const author = authors.items.find((a) => a.slug === slug)
  useSeo({ title: author ? author.name : 'Contributor', description: author?.bio, image: author?.avatar })

  if (!author) return <Navigate to="/blog" replace />

  const posts = published.filter((p) => p.authorId === author.id)
  const [lead, ...rest] = posts
  const sections = categories.items.filter((c) => posts.some((p) => p.categoryId === c.id))
  const totalReads = posts.reduce((sum, p) => sum + p.views, 0)

  const links = [
    author.website && { label: author.website, href: `https://${author.website}`, icon: Globe },
    author.twitter && { label: `@${author.twitter}`, href: `https://twitter.com/${author.twitter}`, icon: null },
    author.linkedin && { label: 'LinkedIn', href: `https://linkedin.com/in/${author.linkedin}`, icon: null },
  ].filter(Boolean) as Array<{ label: string; href: string; icon: typeof Globe | null }>

  return (
    <>
      <Container as="header" className="border-b border-line py-10 dark:border-line-dark lg:py-14">
        <Link
          to="/about"
          className="focus-ring group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} className="transition-transform duration-300 ease-editorial group-hover:-translate-x-1" />
          The masthead
        </Link>

        <div className="mt-7 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-start gap-5">
              <img src={author.avatar} alt="" width={96} height={96} className="h-20 w-20 flex-none object-cover sm:h-24 sm:w-24" />
              <div>
                <p className="eyebrow text-accent dark:text-accent-soft">{author.role}</p>
                <h1 className="display-lg mt-2 text-ink dark:text-paper">{author.name}</h1>
                <p className="meta mt-2 flex items-center gap-1.5">
                  <MapPin size={13} /> {author.location}
                </p>
              </div>
            </div>
            <p className="lede mt-6 max-w-measure">{author.bio}</p>
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-10 lg:dark:border-line-dark">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="eyebrow text-faint">Writes about</dt>
                <dd className="mt-2 text-ink-soft dark:text-paper/75">{author.specialties.join(', ')}</dd>
              </div>
              <div>
                <dt className="eyebrow text-faint">Published</dt>
                <dd className="mt-2 text-ink-soft dark:text-paper/75">
                  {posts.length} {posts.length === 1 ? 'story' : 'stories'} in {sections.length}{' '}
                  {sections.length === 1 ? 'section' : 'sections'}, {totalReads.toLocaleString('en-GB')} reads
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-faint">Contact</dt>
                <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href={`mailto:${author.email}`}
                    className="focus-ring inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-accent dark:text-paper/75"
                  >
                    <Mail size={14} /> {author.email}
                  </a>
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-1.5 text-ink-soft transition-colors hover:text-accent dark:text-paper/75"
                    >
                      {link.icon && <link.icon size={14} />} {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>

      <Container as="section" className="section-tight">
        {posts.length === 0 ? (
          <p className="text-sm text-ink-muted">Nothing published yet. Their first piece is in edit.</p>
        ) : (
          <>
            <FeaturedStory post={lead} />

            {rest.length > 0 && (
              <div className="mt-14 border-t border-line pt-12 dark:border-line-dark">
                <SectionHeader
                  eyebrow="Back catalogue"
                  title={`Everything by ${author.name.split(' ')[0]}`}
                  action={{ to: '/blog', label: 'All stories' }}
                />
                <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <EditorialCard key={post.id} post={post} variant="standard" showSave />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  )
}
