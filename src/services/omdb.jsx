/**
 * Optional OMDB integration — set VITE_OMDB_API_KEY in .env
 * OMDB returns one title per request; this app uses mock data by default.
 */
const KEY = import.meta.env.VITE_OMDB_API_KEY

export async function searchOmdb(query) {
  if (!KEY || !query?.trim()) return null
  const url = `https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(query.trim())}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('OMDB request failed')
  const data = await res.json()
  if (data.Response === 'False') return []
  return data.Search ?? []
}
