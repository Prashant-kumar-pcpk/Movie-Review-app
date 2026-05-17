import { useEffect, useMemo, useState } from 'react'
import { MainPage } from './pages/MainPage.jsx'
import { MovieDetailsPage } from './pages/MovieDetailsPage.jsx'
import { useDebouncedValue } from './hooks/useDebouncedValue.jsx'
import { useMovieNavigation } from './hooks/useMovieNavigation.jsx'
import { usePersistedRatings } from './hooks/usePersistedRatings.jsx'
import {
  DEFAULT_SEARCH_TERM,
  fetchMovieById,
  fetchMovies,
  getMovieApiConfigStatus,
} from './services/omdb.jsx'
import { displayedAverage } from './utils/rating.jsx'

export default function App() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [minRating, setMinRating] = useState('0')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [movieCache, setMovieCache] = useState({})
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState('')
  const debouncedQuery = useDebouncedValue(query, 450)
  const route = useMovieNavigation()
  const apiConfig = getMovieApiConfigStatus()
  const { ratings, setRating, getRating } = usePersistedRatings()

  useEffect(() => {
    let cancelled = false

    async function loadMovies() {
      setLoading(true)
      setError('')

      try {
        const response = await fetchMovies(debouncedQuery)
        if (!cancelled) {
          setMovies(response)
          setMovieCache((prev) => {
            const next = { ...prev }
            response.forEach((movie) => {
              next[movie.id] = movie
            })
            return next
          })
        }
      } catch (fetchError) {
        if (!cancelled) {
          setMovies([])
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Something went wrong while loading movies.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadMovies()

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, retryCount])

  useEffect(() => {
    if (route.name !== 'details' || !route.movieId) {
      setDetailsLoading(false)
      setDetailsError('')
      return
    }

    if (movieCache[route.movieId]) {
      setDetailsError('')
      setDetailsLoading(false)
      return
    }

    let cancelled = false

    async function loadMovieDetails() {
      setDetailsLoading(true)
      setDetailsError('')

      try {
        const movie = await fetchMovieById(route.movieId)
        if (!cancelled) {
          setMovieCache((prev) => ({ ...prev, [movie.id]: movie }))
        }
      } catch (fetchError) {
        if (!cancelled) {
          setDetailsError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Unable to load this movie right now.',
          )
        }
      } finally {
        if (!cancelled) {
          setDetailsLoading(false)
        }
      }
    }

    loadMovieDetails()

    return () => {
      cancelled = true
    }
  }, [movieCache, route])

  const genres = useMemo(
    () =>
      [...new Set(movies.flatMap((movie) => movie.genres || []))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [movies],
  )

  const years = useMemo(
    () =>
      [...new Set(movies.map((movie) => movie.year).filter(Boolean))].sort((a, b) => b - a),
    [movies],
  )

  const filteredMovies = useMemo(() => {
    const ratingFloor = Number(minRating) || 0

    return movies.filter((movie) => {
      if (genre && !movie.genres?.includes(genre)) return false
      if (releaseYear && String(movie.year) !== releaseYear) return false

      const userRating = getRating(movie.id)
      const average = displayedAverage(movie.averageRating, userRating)
      if (average < ratingFloor) return false

      return true
    })
  }, [movies, genre, releaseYear, minRating, getRating])

  const featuredMovie = movies[0] || null

  const topRatedMovie = useMemo(
    () =>
      [...movies].sort((left, right) => Number(right.imdbRating) - Number(left.imdbRating))[0] ||
      null,
    [movies],
  )

  const activeSearchLabel = debouncedQuery.trim() || DEFAULT_SEARCH_TERM
  const selectedMovie =
    route.name === 'details' && route.movieId ? movieCache[route.movieId] || null : null

  function resetFilters() {
    setGenre('')
    setReleaseYear('')
    setMinRating('0')
  }

  if (route.name === 'details' && route.movieId) {
    return (
      <MovieDetailsPage
        movie={selectedMovie}
        loading={detailsLoading}
        error={detailsError}
        onBack={route.goHome}
        onRetry={() => {
          setMovieCache((prev) => {
            const next = { ...prev }
            delete next[route.movieId]
            return next
          })
          setRetryCount((count) => count + 1)
        }}
        userRating={selectedMovie ? getRating(selectedMovie.id) : null}
        ratings={ratings}
        onRate={(movieId, stars) => setRating(movieId, stars)}
      />
    )
  }

  return (
    <MainPage
      loading={loading}
      movies={movies}
      filteredMovies={filteredMovies}
      featuredMovie={featuredMovie}
      topRatedMovie={topRatedMovie}
      activeSearchLabel={activeSearchLabel}
      apiConfig={apiConfig}
      error={error}
      resetFilters={resetFilters}
      retryCount={retryCount}
      setRetryCount={setRetryCount}
      query={query}
      setQuery={setQuery}
      genre={genre}
      setGenre={setGenre}
      genres={genres}
      releaseYear={releaseYear}
      setReleaseYear={setReleaseYear}
      years={years}
      minRating={minRating}
      setMinRating={setMinRating}
      ratings={ratings}
      getRating={getRating}
      onSelectMovie={(movie) => route.goToMovie(movie.id)}
    />
  )
}
