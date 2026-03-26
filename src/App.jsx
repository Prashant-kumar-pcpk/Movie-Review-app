import { useMemo, useState } from 'react'
import { movies, allGenres, yearBounds } from './data/movies'
import { usePersistedRatings } from './hooks/usePersistedRatings'
import { MovieCard } from './components/MovieCard'
import { MovieDetailModal } from './components/MovieDetailModal'
import { displayedAverage } from './utils/rating'
import Header from './layout/Header.jsx'
import Footer from './layout/footer.jsx'

export default function App() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('')
  const [yearMin, setYearMin] = useState((yearBounds.min))
  const [yearMax, setYearMax] = useState((yearBounds.max))
  const [minRating, setMinRating] = useState('0')
  const [selected, setSelected] = useState(null)

  const { setRating, getRating } = usePersistedRatings()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const yMin = (yearMin) || yearBounds.min
    const yMax = (yearMax) || yearBounds.max
    const rMin = (minRating) || 0

    return movies.filter((m) => {
      if (q && !m.title.toLowerCase().includes(q)) return false
      if (genre && !m.genres.includes(genre)) return false
      if (m.year < Math.min(yMin, yMax) || m.year > Math.max(yMin, yMax)) return false
      const user = getRating(m.id)
      const avg = displayedAverage(m.averageRating, user)
      if (avg < rMin) return false
      return true
    })
  }, [query, genre, yearMin, yearMax, minRating, getRating])

  const years = useMemo(() => {
    const ys = [...new Set(movies.map((m) => m.year))].sort((a, b) => b - a)
    return ys
  }, [])

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-900 via-yellow-200 to-violet-800 text-white">

      {/* Header */}
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-cyan-900/40 p-4 ring-1 ring-white/5 sm:p-6">
          <label className="block"> 
            <span className="text-sm font-semibold uppercase tracking-wide text-black/80 dark:text-white/80">Search by title</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Inception"
              className="mt-2  w-full rounded-2xl border border-cinema-700 bg-cinema-950/80 px-4 py-3 text-white placeholder:text-cinema-muted focus:border-cinema-accent focus:outline-none focus:ring-1 focus:ring-cinema-accent"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-medium uppercase tracking-wide  text-black/80 dark:text-white/80">Genre</span>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-cinema-700 bg-cinema-950/80 px-4 py-3 text-white focus:border-cinema-accent focus:outline-none focus:ring-1 focus:ring-cinema-accent"
              >
                <option value="">All genres</option>
                {allGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-black/80 dark:text-white/80">Year from</span>
              <select
                value={yearMin}
                onChange={(e) => setYearMin(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-cinema-700 bg-cinema-950/80 px-4 py-3 text-white focus:border-cinema-accent focus:outline-none focus:ring-1 focus:ring-cinema-accent"
              >
                {years.map((y) => (
                  <option key={`min-${y}`} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide  text-black/80 dark:text-white/80">Year to</span>
              <select
                value={yearMax}
                onChange={(e) => setYearMax(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-cinema-700 bg-cinema-950/80 px-4 py-3 text-white focus:border-cinema-accent focus:outline-none focus:ring-1 focus:ring-cinema-accent"
              >
                {years.map((y) => (
                  <option key={`max-${y}`} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wide text-black/80 dark:text-white/80">Min. average</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-cinema-700 bg-cinema-950/80 px-4 py-3 text-white focus:border-cinema-accent focus:outline-none focus:ring-1 focus:ring-cinema-accent"
              >
                <option value="0">Any</option>
                <option value="3">3+ stars</option>
                <option value="3.5">3.5+ stars</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
              </select>
            </label>
          </div>

          <p className="text-sm font-semibold  text-black/80 dark:text-white/80">
            Showing <span className=" px-1.5 font-bold text-white">{filtered.length}</span> of {movies.length} titles
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-cinema-muted">No movies match your filters. Try clearing search or filters.</p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} userRating={getRating(movie.id)} onSelect={setSelected} />
              </li>
            ))}
          </ul>
        )}
      </main>

      <MovieDetailModal
        movie={selected}
        userRating={selected ? getRating(selected.id) : null}
        onRate={(id, stars) => setRating(id, stars)}
        onClose={() => setSelected(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
