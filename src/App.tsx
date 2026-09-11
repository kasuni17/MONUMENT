import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import { ArticlePageSkeleton } from './components/Skeletons'

const Home = lazy(() => import('./pages/Home'))
const Blog = lazy(() => import('./pages/Blog'))
const Categories = lazy(() => import('./pages/Categories'))
const Category = lazy(() => import('./pages/Category'))
const TagPage = lazy(() => import('./pages/Tag'))
const Article = lazy(() => import('./pages/Article'))
const AuthorPage = lazy(() => import('./pages/Author'))
const Trending = lazy(() => import('./pages/Trending'))
const Collections = lazy(() => import('./pages/Collections'))
const CollectionDetail = lazy(() => import('./pages/CollectionDetail'))
const SearchPage = lazy(() => import('./pages/Search'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard'))
const AdminPosts = lazy(() => import('./admin/pages/Posts'))
const PostEditor = lazy(() => import('./admin/pages/PostEditor'))
const AdminCategories = lazy(() => import('./admin/pages/Categories'))
const AdminTags = lazy(() => import('./admin/pages/Tags'))
const AdminAuthors = lazy(() => import('./admin/pages/Authors'))
const AdminComments = lazy(() => import('./admin/pages/Comments'))
const AdminMedia = lazy(() => import('./admin/pages/Media'))
const AdminUsers = lazy(() => import('./admin/pages/Users'))
const AdminNewsletter = lazy(() => import('./admin/pages/Newsletter'))
const AdminAnalytics = lazy(() => import('./admin/pages/Analytics'))
const AdminSettings = lazy(() => import('./admin/pages/Settings'))

function PageFallback() {
  return <ArticlePageSkeleton />
}

function LegacyArticleRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/blog/${slug}`} replace />
}

function StorySlugRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/blog/${slug}`} replace />
}

function PostEditorRedirect() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={`/admin/posts/${id}/edit`} replace />
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/article/:slug" element={<LegacyArticleRedirect />} />
          <Route path="/stories" element={<Navigate to="/blog" replace />} />
          <Route path="/stories/:slug" element={<StorySlugRedirect />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/topics" element={<Navigate to="/categories" replace />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/tag/:slug" element={<TagPage />} />
          <Route path="/author/:slug" element={<AuthorPage />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/reading-list" element={<Bookmarks />} />
          <Route path="/saved" element={<Bookmarks />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<PostEditor />} />
          <Route path="posts/:id/edit" element={<PostEditor />} />
          <Route path="articles" element={<Navigate to="/admin/posts" replace />} />
          <Route path="articles/new" element={<Navigate to="/admin/posts/new" replace />} />
          <Route path="articles/:id/edit" element={<PostEditorRedirect />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="tags" element={<AdminTags />} />
          <Route path="authors" element={<AdminAuthors />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="newsletter" element={<AdminNewsletter />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<PublicLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
