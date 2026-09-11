import { useCallback, useState } from 'react'

/**
 * In-memory CRUD collection backed by plain React state, no persistence.
 * MONUMENT is a strictly frontend-only demo: admin edits (create/update/
 * delete) apply for the current session only and are lost on refresh,
 * exactly like any other unsaved React state. This is intentional, not a
 * bug, see README.md > Frontend-only Architecture.
 */
export function useCollection<T extends { id: string }>(seedData: T[]) {
  const [items, setItems] = useState<T[]>(seedData)

  const add = useCallback((item: T) => {
    setItems((prev) => [item, ...prev])
  }, [])

  const update = useCallback((id: string, patch: Partial<T>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }, [])

  const reset = useCallback(() => {
    setItems(seedData)
  }, [seedData])

  return { items, setItems, add, update, remove, reset }
}
