import { useCallback, useEffect, useState } from 'react'

const readStored = (storageKey, fallback) => {
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

/**
 * Frontend-only stand-in for a database: keeps a list in localStorage so
 * submissions survive a refresh. Swap for an API call when a backend exists.
 */
function useStoredCollection(storageKey, seed) {
  const [items, setItems] = useState(() => readStored(storageKey, seed))

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items))
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the UI still works.
    }
  }, [storageKey, items])

  const add = useCallback((item) => setItems((current) => [item, ...current]), [])

  const update = useCallback((id, updater) => {
    setItems((current) => current.map((item) => (item.id === id ? updater(item) : item)))
  }, [])

  return { items, add, update }
}

export default useStoredCollection
