import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useContent } from '@/lib/content'
import { useToast } from '@/lib/toast'
import { useSeo } from '@/hooks/useSeo'
import { estimateReadingTime, slugify } from '@/lib/utils'
import { Post, ContentBlock, PostStatus } from '@/types'
import BlockEditor from '../components/BlockEditor'
import ArticleBody from '@/components/ArticleBody'
import { topicImage } from '@/lib/imageLibrary'

interface FormState {
  title: string
  slug: string
  subtitle: string
  excerpt: string
  content: ContentBlock[]
  image: string
  imageAlt: string
  categoryId: string
  tagIds: string[]
  authorId: string
  status: PostStatus
  publishedAt: string
  seoTitle: string
  seoDescription: string
  canonicalUrl: string
}

function blankForm(defaultCategory: string, defaultAuthor: string): FormState {
  return {
    title: '', slug: '', subtitle: '', excerpt: '',
    content: [{ type: 'paragraph', text: '' }],
    image: '', imageAlt: '',
    categoryId: defaultCategory, tagIds: [], authorId: defaultAuthor,
    status: 'draft', publishedAt: new Date().toISOString().slice(0, 16),
    seoTitle: '', seoDescription: '', canonicalUrl: '',
  }
}

function postToForm(post: Post): FormState {
  return {
    title: post.title, slug: post.slug, subtitle: post.subtitle, excerpt: post.excerpt,
    content: post.content, image: post.image, imageAlt: post.imageAlt,
    categoryId: post.categoryId, tagIds: post.tagIds, authorId: post.authorId,
    status: post.status, publishedAt: post.publishedAt.slice(0, 16),
    seoTitle: post.seoTitle ?? '', seoDescription: post.seoDescription ?? '', canonicalUrl: post.canonicalUrl ?? '',
  }
}

const inputClass = 'focus-ring w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink dark:border-line-dark dark:bg-surface-dark dark:text-paper'
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-muted'

export default function PostEditor() {
  const { id } = useParams<{ id: string }>()
  const isNew = !id
  const navigate = useNavigate()
  const { posts, categories, tags, authors } = useContent()
  const { showToast } = useToast()

  const existingPost = id ? posts.items.find((p) => p.id === id) : undefined

  const [form, setForm] = useState<FormState>(() => {
    if (existingPost) return postToForm(existingPost)
    return blankForm(categories.items[0]?.id ?? '', authors.items[0]?.id ?? '')
  })
  const [showPreview, setShowPreview] = useState(false)
  const [slugTouched, setSlugTouched] = useState(!!existingPost)

  useSeo({ title: isNew ? 'New Post' : `Edit: ${form.title || 'Untitled'}` })

  useEffect(() => {
    if (!slugTouched) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }))
    }
  }, [form.title, slugTouched])

  const wordCount = useMemo(() => {
    return form.content
      .map((b) => ('text' in b ? b.text : 'items' in b ? b.items.join(' ') : ''))
      .join(' ')
      .split(/\s+/).filter(Boolean).length
  }, [form.content])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleTag(tagId: string) {
    setForm((f) => ({
      ...f,
      tagIds: f.tagIds.includes(tagId) ? f.tagIds.filter((t) => t !== tagId) : [...f.tagIds, tagId],
    }))
  }

  function validate(): string | null {
    if (!form.title.trim()) return 'Title is required.'
    if (!form.slug.trim()) return 'Slug is required.'
    if (!form.categoryId) return 'Choose a category.'
    if (!form.authorId) return 'Choose an author.'
    return null
  }

  function persist(status: PostStatus) {
    const error = validate()
    if (error) {
      showToast(error, 'error')
      return
    }
    const now = new Date().toISOString()
    const categorySlug = categories.items.find((c) => c.id === form.categoryId)?.slug ?? 'culture'
    const image = form.image.trim() || topicImage(categorySlug, form.slug || 'untitled')
    const payload: Post = {
      id: existingPost?.id ?? `p-${Date.now()}`,
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle,
      excerpt: form.excerpt,
      content: form.content,
      image,
      imageAlt: form.imageAlt || form.title,
      categoryId: form.categoryId,
      tagIds: form.tagIds,
      authorId: form.authorId,
      status,
      featured: existingPost?.featured ?? false,
      editorsPick: existingPost?.editorsPick ?? false,
      publishedAt: status === 'scheduled' ? new Date(form.publishedAt).toISOString() : (existingPost?.publishedAt && status !== 'published' ? existingPost.publishedAt : (status === 'published' ? now : now)),
      updatedAt: now,
      readingTime: estimateReadingTime(wordCount),
      views: existingPost?.views ?? 0,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt,
      canonicalUrl: form.canonicalUrl || undefined,
    }

    if (existingPost) posts.update(existingPost.id, payload)
    else posts.add(payload)

    const messages: Record<PostStatus, string> = {
      draft: 'Article saved.',
      published: 'Article published.',
      scheduled: 'Article scheduled.',
      archived: 'Article moved to drafts.',
    }
    showToast(messages[status], 'success')
    navigate(`/admin/posts/${payload.id}/edit`)
  }

  const previewPost: Post = {
    id: 'preview', slug: form.slug || 'preview', title: form.title || 'Untitled story',
    subtitle: form.subtitle, excerpt: form.excerpt, content: form.content,
    image: form.image || topicImage(categories.items.find((c) => c.id === form.categoryId)?.slug ?? 'culture', form.slug || 'preview'), imageAlt: form.imageAlt || form.title,
    categoryId: form.categoryId, tagIds: form.tagIds, authorId: form.authorId,
    status: form.status, featured: false, editorsPick: false, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    readingTime: estimateReadingTime(wordCount), views: 0,
  }
  const previewAuthor = authors.items.find((a) => a.id === form.authorId)
  const previewCategory = categories.items.find((c) => c.id === form.categoryId)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/admin/posts" className="focus-ring text-xs font-semibold text-ink-muted hover:text-accent">← Back to posts</Link>
          <h1 className="mt-1 font-serif text-2xl font-bold text-ink dark:text-paper">{isNew ? 'New Post' : 'Edit Post'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-muted">Unsaved, this session only</span>
          <button onClick={() => setShowPreview((v) => !v)} className="focus-ring min-h-[40px] border border-line px-4 text-sm font-medium text-ink dark:border-line-dark dark:text-paper lg:hidden">
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={showPreview ? 'hidden lg:block' : ''}>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Title</label>
              <input className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Article title" />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input className={inputClass} value={form.slug} onChange={(e) => { setSlugTouched(true); update('slug', slugify(e.target.value)) }} placeholder="article-slug" />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input className={inputClass} value={form.subtitle} onChange={(e) => update('subtitle', e.target.value)} placeholder="A short standfirst" />
            </div>
            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea className={inputClass} rows={2} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} placeholder="One or two sentences shown on cards and search" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Featured image URL</label>
                <input className={inputClass} value={form.image} onChange={(e) => update('image', e.target.value)} placeholder="Leave blank for a demo image" />
              </div>
              <div>
                <label className={labelClass}>Image alt text</label>
                <input className={inputClass} value={form.imageAlt} onChange={(e) => update('imageAlt', e.target.value)} placeholder="Describe the image" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Category</label>
                <select className={inputClass} value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)}>
                  {categories.items.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Author</label>
                <select className={inputClass} value={form.authorId} onChange={(e) => update('authorId', e.target.value)}>
                  {authors.items.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.items.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTag(t.id)}
                    className={`focus-ring border px-3 py-1.5 text-xs font-medium ${
                      form.tagIds.includes(t.id) ? 'border-accent bg-accent text-paper' : 'border-line text-ink-soft dark:border-line-dark dark:text-paper/70'
                    }`}
                  >
                    #{t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Content</label>
              <BlockEditor blocks={form.content} onChange={(content) => update('content', content)} />
              <p className="mt-2 text-xs text-ink-muted">{wordCount} words · ~{estimateReadingTime(wordCount)} min read</p>
            </div>

            <details className="border border-line p-4 dark:border-line-dark">
              <summary className="cursor-pointer text-sm font-semibold text-ink dark:text-paper">SEO settings</summary>
              <div className="mt-4 space-y-4">
                <div>
                  <label className={labelClass}>SEO title</label>
                  <input className={inputClass} value={form.seoTitle} onChange={(e) => update('seoTitle', e.target.value)} placeholder={form.title || 'Defaults to article title'} />
                </div>
                <div>
                  <label className={labelClass}>SEO description</label>
                  <textarea className={inputClass} rows={2} value={form.seoDescription} onChange={(e) => update('seoDescription', e.target.value)} placeholder={form.excerpt || 'Defaults to excerpt'} />
                </div>
                <div>
                  <label className={labelClass}>Canonical URL</label>
                  <input className={inputClass} value={form.canonicalUrl} onChange={(e) => update('canonicalUrl', e.target.value)} placeholder="https://monument.pub/blog/…" />
                </div>
              </div>
            </details>

            <div className="border border-line p-4 dark:border-line-dark">
              <label className={labelClass}>Schedule for</label>
              <input type="datetime-local" className={inputClass} value={form.publishedAt} onChange={(e) => update('publishedAt', e.target.value)} />
            </div>

            <div className="sticky bottom-0 -mx-4 flex flex-wrap gap-3 border-t border-line bg-paper-dim px-4 py-4 dark:border-line-dark dark:bg-surface-dark sm:mx-0 sm:border sm:px-4">
              <button onClick={() => persist('draft')} className="focus-ring min-h-[44px] border border-line px-5 text-sm font-semibold text-ink dark:border-line-dark dark:text-paper">
                Save Draft
              </button>
              <button onClick={() => persist('scheduled')} className="focus-ring min-h-[44px] border border-line px-5 text-sm font-semibold text-ink dark:border-line-dark dark:text-paper">
                Schedule
              </button>
              <button onClick={() => persist('published')} className="focus-ring ml-auto min-h-[44px] bg-accent px-6 text-sm font-semibold text-paper hover:bg-accent-strong">
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className={showPreview ? '' : 'hidden lg:block'}>
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">Live preview</p>
            <div className="max-h-[80vh] overflow-y-auto border border-line bg-paper p-6 dark:border-line-dark dark:bg-surface-dark">
              {previewCategory && <span className="eyebrow">{previewCategory.name}</span>}
              <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-ink dark:text-paper">{previewPost.title}</h1>
              {form.subtitle && <p className="mt-3 text-lg text-ink-muted">{form.subtitle}</p>}
              {previewAuthor && (
                <div className="mt-4 flex items-center gap-3">
                  <img src={previewAuthor.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <span className="text-sm font-medium text-ink dark:text-paper">{previewAuthor.name}</span>
                </div>
              )}
              {(form.image || form.slug) && <img src={previewPost.image} alt={form.imageAlt} className="mt-6 w-full" />}
              <div className="mt-6">
                <ArticleBody content={form.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
