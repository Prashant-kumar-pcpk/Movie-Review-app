import { movies as mockMovies } from '../data/movies.jsx'

const RAW_BASE_URL = import.meta.env.VITE_MOVIE_API_BASE_URL?.trim()
const RAW_API_KEY =
  import.meta.env.VITE_MOVIE_API_KEY?.trim() || import.meta.env.VITE_OMDB_API_KEY?.trim() || ''

export const DEFAULT_SEARCH_TERM =
  import.meta.env.VITE_DEFAULT_MOVIE_SEARCH?.trim() || 'batman'
const MAX_SEARCH_PAGES = Number(import.meta.env.VITE_OMDB_MAX_PAGES || '5')

const FALLBACK_POSTER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450">
      <rect width="300" height="450" fill="#0f172a" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="#cbd5e1" font-family="Arial, sans-serif" font-size="24">
        No Poster
      </text>
    </svg>
  `)

function parseUrlCandidate(value) {
  if (!value) return null

  try {
    return new URL(value)
  } catch {
    return null
  }
}

function resolveApiBaseUrl() {
  const parsedBaseUrl = parseUrlCandidate(RAW_BASE_URL)
  if (parsedBaseUrl) {
    return `${parsedBaseUrl.origin}${parsedBaseUrl.pathname}`
  }

  return 'https://www.omdbapi.com/'
}

function resolveApiKey() {
  const parsedApiKey = parseUrlCandidate(RAW_API_KEY)
  if (parsedApiKey) {
    return parsedApiKey.searchParams.get('apikey')?.trim() || ''
  }

  const apiKeyMatch = RAW_API_KEY.match(/(?:^|[?&])apikey=([^&]+)/i)
  if (apiKeyMatch) {
    return apiKeyMatch[1].trim()
  }

  return RAW_API_KEY || ''
}

const API_BASE_URL = resolveApiBaseUrl()
const API_KEY = resolveApiKey()

function createUrl(params) {
  const url = new URL(API_BASE_URL)

  Object.entries({ apikey: API_KEY, ...params }).forEach(([key, value]) => {
    if (value != null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

async function fetchJson(params) {
  if (!API_KEY) {
    throw new Error('Missing movie API key. Falling back to local movie catalog.')
  }

  const response = await fetch(createUrl(params))
  if (!response.ok) {
    throw new Error('Movie API request failed. Showing fallback catalog instead.')
  }

  const payload = await response.json()

  if (payload.Response === 'False') {
    if (payload.Error === 'Movie not found!') {
      return null
    }

    throw new Error(payload.Error || 'Unable to load movie data right now.')
  }

  return payload
}

function normalizePoster(poster) {
  if (!poster || poster === 'N/A') return FALLBACK_POSTER
  return poster
}

function normalizeAverage(imdbRating) {
  const parsed = Number(imdbRating)
  if (!Number.isFinite(parsed)) return 0
  return Math.round((parsed / 2) * 10) / 10
}

function normalizeYear(yearValue) {
  const match = String(yearValue ?? '').match(/\d{4}/)
  return match ? Number(match[0]) : null
}

function splitCsv(value) {
  if (!value || value === 'N/A') return []
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeMovie(detail) {
  return {
    id: detail.imdbID,
    title: detail.Title || 'Untitled',
    poster: normalizePoster(detail.Poster),
    year: normalizeYear(detail.Year),
    releaseDate: detail.Released && detail.Released !== 'N/A' ? detail.Released : 'Unknown',
    genres: splitCsv(detail.Genre),
    description:
      detail.Plot && detail.Plot !== 'N/A'
        ? detail.Plot
        : 'Plot details are not available for this title yet.',
    cast: splitCsv(detail.Actors),
    director: detail.Director && detail.Director !== 'N/A' ? detail.Director : 'Unknown',
    runtime: detail.Runtime && detail.Runtime !== 'N/A' ? detail.Runtime : 'Unknown',
    averageRating: normalizeAverage(detail.imdbRating),
    imdbRating: detail.imdbRating && detail.imdbRating !== 'N/A' ? detail.imdbRating : 'N/A',
    language: detail.Language && detail.Language !== 'N/A' ? detail.Language : 'Unknown',
    country: detail.Country && detail.Country !== 'N/A' ? detail.Country : 'Unknown',
    rated: detail.Rated && detail.Rated !== 'N/A' ? detail.Rated : 'Not rated',
  }
}

function normalizeMockMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster: normalizePoster(movie.poster),
    year: movie.year ?? null,
    releaseDate: movie.released || 'Unknown',
    genres: movie.genres || [],
    description: movie.description || 'Plot details are not available for this title yet.',
    cast: movie.cast || [],
    director: movie.director || 'Unknown',
    runtime: movie.runtime || 'Unknown',
    averageRating: Number(movie.averageRating) || 0,
    imdbRating: movie.imdbRating || ((Number(movie.averageRating) || 0) * 2).toFixed(1),
    language: movie.language || 'English',
    country: movie.country || 'Unknown',
    rated: movie.rated || 'PG-13',
  }
}

function matchesMockSearch(movie, searchTerm) {
  const query = searchTerm.trim().toLowerCase()
  if (!query) return true

  return (
    movie.title.toLowerCase().includes(query) ||
    movie.genres?.some((genre) => genre.toLowerCase().includes(query))
  )
}

function getFallbackMovies(searchTerm) {
  const query = searchTerm?.trim() || DEFAULT_SEARCH_TERM
  return mockMovies.filter((movie) => matchesMockSearch(movie, query)).map(normalizeMockMovie)
}

export async function fetchMovies(searchTerm) {
  const query = searchTerm?.trim() || DEFAULT_SEARCH_TERM

  try {
    const firstPagePayload = await fetchJson({
      s: query,
      type: 'movie',
      page: '1',
    })

    if (!firstPagePayload?.Search?.length) {
      return []
    }

    const totalResults = Number(firstPagePayload.totalResults) || firstPagePayload.Search.length
    const totalPages = Math.min(Math.ceil(totalResults / 10), Math.max(1, MAX_SEARCH_PAGES))

    const pagePayloads = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        fetchJson({
          s: query,
          type: 'movie',
          page: String(index + 2),
        }),
      ),
    )

    const searchResults = [firstPagePayload, ...pagePayloads].flatMap((payload) => payload?.Search || [])
    const uniqueResults = Array.from(
      new Map(searchResults.map((movie) => [movie.imdbID, movie])).values(),
    )

    const details = await Promise.all(
      uniqueResults.map((movie) =>
        fetchJson({
          i: movie.imdbID,
          plot: 'full',
        }),
      ),
    )

    return details.filter(Boolean).map(normalizeMovie)
  } catch {
    return getFallbackMovies(query)
  }
}

export async function fetchMovieById(movieId) {
  try {
    const detail = await fetchJson({
      i: movieId,
      plot: 'full',
    })

    if (!detail) {
      throw new Error('Movie not found.')
    }

    return normalizeMovie(detail)
  } catch {
    const fallback = mockMovies.find((movie) => movie.id === movieId)
    if (fallback) {
      return normalizeMockMovie(fallback)
    }

    throw new Error('Movie details are unavailable right now.')
  }
}

export function getMovieApiConfigStatus() {
  return {
    hasApiKey: Boolean(API_KEY),
    apiBaseUrl: API_BASE_URL,
    apiKeyPreview: API_KEY ? `${API_KEY.slice(0, 2)}***${API_KEY.slice(-2)}` : '',
    usingLegacyOmdbKey: Boolean(
      !import.meta.env.VITE_MOVIE_API_KEY?.trim() && import.meta.env.VITE_OMDB_API_KEY?.trim(),
    ),
    usingFallbackCatalog: !API_KEY,
  }
}
