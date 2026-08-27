import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ProtectedRoute, AdminRoute } from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import Stories from "@/pages/Stories";
import Article from "@/pages/Article";
import Topics from "@/pages/Topics";
import TopicDetail from "@/pages/TopicDetail";
import Trending from "@/pages/Trending";
import Collections from "@/pages/Collections";
import CollectionDetail from "@/pages/CollectionDetail";
import AuthorProfile from "@/pages/AuthorProfile";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Bookmarks from "@/pages/Bookmarks";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

// Admin CMS pulls in Tiptap + Recharts — code-split so public readers never download it.
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminArticles = lazy(() => import("@/pages/admin/Articles"));
const AdminArticleEditor = lazy(() => import("@/pages/admin/ArticleEditor"));
const AdminCategories = lazy(() => import("@/pages/admin/Categories"));
const AdminTags = lazy(() => import("@/pages/admin/Tags"));
const AdminAuthors = lazy(() => import("@/pages/admin/Authors"));
const AdminCollections = lazy(() => import("@/pages/admin/Collections"));
const AdminComments = lazy(() => import("@/pages/admin/Comments"));
const AdminMedia = lazy(() => import("@/pages/admin/Media"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));

function AdminSuspenseFallback() {
  return <div className="p-8 text-sm text-[#6B6B70]">Loading…</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="stories" element={<Stories />} />
        <Route path="stories/:slug" element={<Article />} />
        <Route path="topics" element={<Topics />} />
        <Route path="topics/:slug" element={<TopicDetail />} />
        <Route path="trending" element={<Trending />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/:slug" element={<CollectionDetail />} />
        <Route path="authors/:slug" element={<AuthorProfile />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <Suspense fallback={<AdminSuspenseFallback />}>
            <AdminRoute />
          </Suspense>
        }
      >
        <Route element={<AdminLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="articles"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminArticles />
              </Suspense>
            }
          />
          <Route
            path="articles/new"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminArticleEditor />
              </Suspense>
            }
          />
          <Route
            path="articles/:id/edit"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminArticleEditor />
              </Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminCategories />
              </Suspense>
            }
          />
          <Route
            path="tags"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminTags />
              </Suspense>
            }
          />
          <Route
            path="authors"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminAuthors />
              </Suspense>
            }
          />
          <Route
            path="collections"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminCollections />
              </Suspense>
            }
          />
          <Route
            path="comments"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminComments />
              </Suspense>
            }
          />
          <Route
            path="media"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminMedia />
              </Suspense>
            }
          />
          <Route
            path="analytics"
            element={
              <Suspense fallback={<AdminSuspenseFallback />}>
                <AdminAnalytics />
              </Suspense>
            }
          />
          <Route element={<AdminRoute roles={["ADMIN"]} />}>
            <Route
              path="users"
              element={
                <Suspense fallback={<AdminSuspenseFallback />}>
                  <AdminUsers />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<AdminSuspenseFallback />}>
                  <AdminSettings />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
