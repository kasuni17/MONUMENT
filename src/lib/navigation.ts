export interface NavLinkItem {
  to: string
  label: string
}

/** The primary navigation, shared by the header and the mobile drawer. */
export const primaryLinks: NavLinkItem[] = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Stories' },
  { to: '/categories', label: 'Topics' },
  { to: '/trending', label: 'Trending' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
]
