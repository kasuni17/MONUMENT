# MONUMENT

An independent editorial publication, a premium public blog paired with a full editorial CMS, built as a frontend-only demo application.

## Overview

MONUMENT is a two-part product: a magazine-style public website for readers, and an admin dashboard (`/admin`) for editorial staff to manage posts, categories, tags, authors, comments, media and subscribers. It is built with React, TypeScript, Vite and Tailwind CSS, with **no backend and no persistence of any kind**, no server, no database, no API, no `localStorage`, `sessionStorage`, `IndexedDB` or cookies. All content starts from static data files under `src/data/`, and every "editorial" action (publishing, comment moderation, subscriber management, bookmarking, theme toggling) is a plain in-memory React state change that resets the moment you refresh the page. See Frontend-only Architecture below for the full picture.

## Features

- Editorial homepage built as an edition: a lead story with supporting pieces, a mixed latest-stories grid, a ranked trending chart, editors' picks, a columnist spotlight, collections, topics and a long read
- Ranked frontend search across headlines, standfirsts, sections, writers and subjects, from a header overlay, the archive filter bar or the search page
- Bookmarking / reading list, shared live across the nav badge, share buttons and the saved-articles page for the current session (React Context, no persistence)
- Newsletter signup (demo, no real email is sent)
- Simulated comments with moderation workflow
- Dark mode with a deliberately designed dark palette (not just inverted colors)
- A structured block-based article editor with a live, side-by-side preview
- A complete admin CMS: posts, categories, tags, authors, users, comments, media library, newsletter subscribers, analytics and settings
- A unique photograph for every article, topic and collection, served locally (see Image Strategy below)
- Site-wide `⌘K` / `Ctrl+K` (and `/`) keyboard shortcut to jump into search
- A top-level error boundary with a calm "something went wrong" state instead of a crashed white screen

## Public Website

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/blog` (alias `/stories`) | Full article archive with filters, sort and load-more |
| `/blog/:slug` (aliases `/article/:slug`, `/stories/:slug`) | Article page |
| `/categories` (alias `/topics`) | Index of every section |
| `/category/:slug` | Category landing page |
| `/tag/:slug` | Tag landing page |
| `/author/:slug` | Author profile |
| `/search` | Site-wide search |
| `/about` | About the publication |
| `/contact` | Contact form (demo) |
| `/bookmarks` (aliases `/reading-list`, `/saved`) | Saved articles |
| `/newsletter` | Newsletter signup |
| `/trending` | Full ranked "most read" list |
| `/collections`, `/collections/:slug` | Curated editorial collections |
| `/privacy`, `/terms` | Legal pages (demo copy) |

## Article Experience

Article pages open on the reading measure, then run the lead photograph full container width before the body drops into a two-column layout with a sticky rail (contents, share). They include a reading-progress indicator, estimated reading time, a save control, subjects, an author card, related stories that never repeat what the "more from this author" rail already showed, a simulated response thread and a newsletter block. Article bodies are built from structured content blocks (paragraph, heading, quote, image, list, code, divider, callout) rather than raw HTML.

## Admin CMS

Route: `/admin`

- **Dashboard**, key metrics (posts, published, drafts, scheduled, authors, categories, comments, subscribers), a publishing-activity chart, top articles, recent posts, recent comments, and a scheduled-posts panel
- **Posts**, searchable/filterable table, status workflow (draft, scheduled, published, archived)
- **Post editor** (`/admin/posts/new`, `/admin/posts/:id/edit`; aliases `/admin/articles/new`, `/admin/articles/:id/edit`): structured block editor, live side-by-side preview using the real public article layout, SEO fields, tag/category/author pickers, and Save Draft / Schedule / Publish actions (all in-memory for the session, see Frontend-only Architecture)
- **Categories, Tags, Authors**, full CRUD with confirmation dialogs on delete
- **Comments**, filter by pending/approved/hidden; approve, hide or delete
- **Media library**, simulated uploads, asset details, delete
- **Users**, invite/remove team members with roles
- **Newsletter**, subscriber list, search, remove, demo export
- **Analytics**, views over time, subscriber growth, category performance, top articles, with 7/30/90-day and 12-month ranges
- **Settings**, publication details, appearance (dark mode), notifications, SEO defaults, account

## Technology Stack

- React 18 + TypeScript
- Vite
- React Router 6
- Tailwind CSS 3 (custom editorial theme, no component library). Type is Fraunces for display, Newsreader for long-form body copy and Inter for navigation, metadata and controls, with the scale set in `src/index.css` as `display-xl` through `display-sm`
- No backend, no external state library, no persistence: React context + `useState` only

## Project Structure

```
src/
├── admin/            Admin CMS layout, shared components and pages
├── components/        Shared public-site UI (Container, SectionHeader, EditorialCard,
│                      FeaturedStory, TrendingSection, TopicCard, CollectionCard,
│                      ArticleImage, AuthorMeta, Newsletter, Nav, Footer, SearchOverlay)
├── data/               Static content: images.ts (picture library), authors, categories,
│                      tags, collections, comments, media, posts.ts (builds Post records)
│   └── stories/        The editorial copy, one file per section
├── hooks/              useCollection (in-memory CRUD), useSeo, useMediaQuery
├── lib/                content context, bookmarks context, theme, toast, search, navigation,
│                      imageLibrary (admin image suggestions), avatar, utils
├── pages/              Public route components
└── types/              Shared TypeScript types
```

## Demo Data

- 53 published stories (plus draft, scheduled and archived examples for the CMS) across nine sections, written as original editorial pieces rather than filler
- 15 contributors with roles, locations, specialisms, bios and links
- 9 sections, 46 subjects (tags), 6 curated collections with a hand-ordered reading sequence
- 60+ simulated responses with approved, pending and hidden states
- 18 media library assets, 8 team members, 24 newsletter subscribers

Story copy lives in `src/data/stories/<section>.ts` as structured editorial objects (sections, pull quote, list, callout, closing). `src/data/posts.ts` turns those into `Post` records, assembling the content blocks, reading time and dates, which keeps the writing separate from both the UI and the record shape.


## Image Strategy

Every photograph is **bundled locally** under `public/images/editorial/`, one file per key, and `src/data/images.ts` is the single index of them (source path, photographer credit and a description of what the picture actually shows). There is no runtime dependency on an external image host, so the site works offline and cannot show a broken image because of network conditions.

The rule the library exists to enforce: **no two stories share a photograph.** Each story names its own `imageKey` in `src/data/stories/`, longer pieces add a distinct `inlineImageKey`, and every topic and collection has its own image again. A check across the data confirms 80 image references resolving to 80 distinct files.

Alt text is written per use site, next to the story, because the same picture means something different in a hero than in a gallery grid, and only the writer knows which detail matters.

`src/components/ArticleImage.tsx` is the only path an image takes to the page. It owns the aspect ratio (`wide`, `landscape`, `classic`, `square`, `portrait`, `tall`), so nothing reflows while a photograph loads; covers that box with `object-fit: cover`; fades the image in once decoded, including the cached case where the browser finishes before React attaches its handler; and degrades a missing file into a typeset placeholder rather than a broken-image icon.

`src/lib/imageLibrary.ts` remains only for the admin CMS, which needs to suggest a picture when an editor creates a post without choosing one. The public site never calls it.

Author avatars are generated rather than photographed: `src/lib/avatar.ts` renders a deterministic inline-SVG monogram (initials set in a serif over a colour hashed from the name, with a hairline rule from the masthead) as a `data:` URI. MONUMENT's contributors are fictional, so attaching stock photographs of real people to them would misrepresent those people.

## State Model, No Persistence, Anywhere

MONUMENT keeps **zero** persistent state. There is no `localStorage`, `sessionStorage`, `IndexedDB`, cookies for application data, database, or API of any kind. Everything the app shows starts from static TypeScript data files under `src/data/` (`posts.ts`, `categories.ts`, `tags.ts`, `authors.ts`, `comments.ts`, `media.ts`, `collections.ts`) and lives from that point on in ordinary React state:

- **`ContentProvider`** (`src/lib/content.tsx`) holds the posts/categories/tags/authors/comments/media/users/subscribers collections in `useState`, seeded once from the static data on app load. `useCollection` (`src/hooks/useCollection.ts`) is a small in-memory CRUD wrapper around that state, `add`/`update`/`remove` all just call `setState`.
- **`BookmarksProvider`** (`src/lib/bookmarks.tsx`) holds the bookmarked post IDs in one shared `useState`, so the nav badge, the bookmark/share buttons and `/bookmarks` all read the same live value instead of drifting out of sync.
- **`ThemeProvider`** (`src/lib/theme.tsx`) reads the OS/browser's `prefers-color-scheme` once on load and holds the current theme in `useState`; toggling it changes state for the session only.
- Admin forms (the post editor, Settings) hold their working values in local `useState`, nothing is written anywhere outside the component.

**What this means in practice:** admin edits (creating/editing/deleting a post, category, tag, author, comment, media asset or subscriber), bookmarks, a manually toggled theme, and in-progress editor drafts all **reset the moment you refresh the page or close the tab.** That's the intended behavior for this frontend-only prototype, not a bug. The admin dashboard and post editor demonstrate the complete interaction (search, filter, sort, CRUD, live preview, confirmation dialogs) without pretending anything is actually saved. The UI never claims otherwise: buttons say "Save Draft" / "Publish" / "Apply changes" (real state updates, scoped to this session) rather than "Saved to database" or "Synced."

## Frontend-only Architecture

This is a demo application with **no backend of any kind**, no server, no database, no API routes, no authentication backend. The following are **simulated**, not real:

- Authentication (the admin area is not access-controlled, and nothing is persisted across a refresh)
- Persistence generally (see State Model above: everything is in-memory only)
- Email delivery (newsletter signups and the contact form do not send real email)
- Image/file storage (media "uploads" generate a reference to an existing local demo image)
- Server-side analytics (charts use deterministic generated data)
- Comment delivery/notification

## Installation

```
npm install
```

## Development

```
npm run dev
```

Starts the Vite dev server (defaults to `http://localhost:5173`, or the next free port).

## Production Build

```
npm run build
```

Type-checks with `tsc -b` and builds an optimized bundle to `dist/` via Vite. Preview it locally with `npm run preview`.

## Linting

```
npm run lint
```

ESLint (flat config, `eslint.config.js`) with `typescript-eslint` and the React Hooks/Fast Refresh plugins. Currently 0 errors; the only warnings are stylistic ("fast refresh" notices) on files that intentionally export both a provider component and its hook (`lib/content.tsx`, `lib/theme.tsx`, `lib/toast.tsx`, `components/TableOfContents.tsx`).

## Layout System

Every section on every route sits inside one grid. `src/components/Container.tsx` applies `.container-editorial` (max width 1280px, `px-5 / sm:px-8 / lg:px-10`), so headings, cards, images, rules and "view all" links share the same left and right edge on every page. Vertical rhythm comes from `.section` and `.section-tight`, section headers from `SectionHeader`, and page mastheads from `PageIntro`, which is what stops routes drifting apart as they get edited independently.

Cards are one component with five shapes (`EditorialCard`: feature, standard, row, compact, portrait) plus `FeaturedStory` for the lead. Pages compose those rather than inventing local layouts, which keeps type sizes, crops and metadata consistent from the front page through to a tag archive.

## Responsive Design

Layouts are verified from 320px through 1920px, with dedicated treatment for the mobile navigation drawer, article reading order, and admin tables (which become stacked cards below the `lg` breakpoint instead of causing horizontal page scroll).

## Accessibility

Semantic landmarks, one `h1` per route, a skip-to-content link, visible focus rings, labelled form fields with inline errors, `aria-live` toasts, keyboard-dismissible dialogs and drawers, minimum 44px touch targets, and `prefers-reduced-motion` support.

Verified with axe-core (WCAG 2 A and AA) across sixteen routes in both light and dark themes: zero serious or moderate violations. The palette was tuned to get there, and the ink tones are remapped once for dark mode in `src/index.css` so a missed `dark:` variant cannot produce dark grey text on a dark ground. A crawl of all 131 reachable public URLs reports no broken links, no missing alt text and no unnamed controls.

## Error Handling

A top-level `ErrorBoundary` wraps the app and shows a plain-language "Something went wrong" state (with a Try Again button) instead of a blank crashed page or a raw stack trace. Empty states are handled per-page (`EmptyState`) for no search results, no bookmarks, no comments and no matching posts; destructive admin actions (deleting a post, category, tag, author, comment, media asset or subscriber) always go through a confirmation dialog first.

## SEO

Each route sets a dynamic document title, meta description, canonical link, Open Graph and Twitter card tags via a small `useSeo` hook (no dependency on `react-helmet`).

## Limitations

- No real backend, authentication, or persistence at all, every change resets on refresh
- Analytics figures and growth percentages are illustrative, not measured
- Search is client-side substring matching over the in-memory demo dataset

## Future Improvements

- Real backend and database (e.g. Postgres + an API layer)
- Authentication and role-based access control for `/admin`
- Cloud image storage and upload pipeline
- A real newsletter provider (e.g. transactional email + list management)
- Real, persisted comments with spam/abuse moderation
- A proper search index (e.g. hosted search) in place of client-side substring matching
- Server-rendered analytics from real traffic data
- CDN-backed asset delivery
- Content scheduling backed by a real job scheduler
