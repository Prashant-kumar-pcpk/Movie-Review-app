import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'movie-review-ratings'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function usePersistedRatings() {
  const [ratings, setRatings] = useState(readStored)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
  }, [ratings])

  const setRating = useCallback((movieId, stars) => {
    setRatings((prev) => {
      if (stars == null) {
        const next = { ...prev }
        delete next[movieId]
        return next
      }
      return { ...prev, [movieId]: stars }
    })
  }, [])

  const getRating = useCallback((movieId) => ratings[movieId] ?? null, [ratings])

  return { ratings, setRating, getRating }
}
