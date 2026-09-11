import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react'

interface BookmarksContextValue {
  bookmarks: string[]
  isBookmarked: (postId: string) => boolean
  toggleBookmark: (postId: string) => void
  clearBookmarks: () => void
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null)

/**
 * In-memory only, bookmarks live for the current session/tab and reset on
 * refresh. Lifted into a single context (rather than a per-component hook)
 * so the nav badge, share/bookmark buttons and the saved-articles page all
 * reflect the same live state instead of drifting out of sync.
 */
export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  const isBookmarked = useCallback((postId: string) => bookmarks.includes(postId), [bookmarks])

  const toggleBookmark = useCallback((postId: string) => {
    setBookmarks((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }, [])

  const clearBookmarks = useCallback(() => setBookmarks([]), [])

  const value = useMemo(
    () => ({ bookmarks, isBookmarked, toggleBookmark, clearBookmarks }),
    [bookmarks, isBookmarked, toggleBookmark, clearBookmarks]
  )

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>
}

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext)
  if (!ctx) throw new Error('useBookmarks must be used within BookmarksProvider')
  return ctx
}
