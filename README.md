
# 🗿 MONUMENT

A full-featured blog and publishing platform with a public-facing reading experience and a complete CMS-style admin dashboard for managing content.

**Live demo:** [monument-blog-website.netlify.app](https://monument-blog-website.netlify.app/)

## Features

**Public site**
- Home page with featured/trending content
- Blog listing with articles, categories, and tags
- Full article view with author pages
- Trending and collections (curated groups of articles)
- Search
- Bookmarks / reading list
- Newsletter signup
- About, Contact, Privacy, and Terms pages
- Legacy URL redirects (`/article/:slug`, `/stories/:slug`, `/topics` → current routes)

**Admin dashboard**
- Dashboard overview with stats and charts
- Post management with a block-based content editor
- Categories, tags, and authors management
- Comment moderation
- Media library
- User management
- Newsletter subscriber management
- Analytics
- Site settings

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev/build tooling
- [React Router](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) for linting

Public and admin routes are code-split and lazy-loaded for faster initial page loads.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone git@github.com:kasuni17/MONUMENT.git
cd MONUMENT
npm install
```

### Development

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement. By default it's available at `http://localhost:5173`.

### Build

```bash
npm run build
```

Type-checks the project and builds a production-ready bundle.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── admin/
│   ├── components/   # Admin-only UI (charts, stat cards, block editor, etc.)
│   └── pages/         # Admin dashboard pages (posts, categories, users, analytics, etc.)
├── components/        # Shared/public UI components
├── data/               # Static/mock content data
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── pages/              # Public route-level pages
├── types/              # Shared TypeScript types
├── App.tsx             # Route definitions (public + admin, lazy-loaded)
└── main.tsx             # App entry point
```

## Deployment

The project is deployed on [Netlify](https://www.netlify.com/) and is configured to build with `npm run build`, serving the `dist` output.

## License

This project currently has no license specified.
