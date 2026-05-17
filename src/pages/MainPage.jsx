import { useEffect, useState } from 'react'
import { MovieCard } from '../components/MovieCard.jsx'
import { MovieFilters } from '../components/MovieFilters.jsx'
import { MovieGridSkeleton } from '../components/MovieGridSkeleton.jsx'
import { StatusMessage } from '../components/StatusMessage.jsx'
import Header from '../layout/Header.jsx'
import Footer from '../layout/footer.jsx'

const FEATURED_DESCRIPTION_PREVIEW = 180

function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c563]">{label}</p>
      <p className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{helper}</p>
    </div>
  )
}

function FeaturedMovie({ movie, onOpen }) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsExpanded(false)
  }, [movie?.id])

  if (!movie) return null

  const description = movie.description || 'Plot details are not available for this title yet.'
  const shouldTruncate = description.length > FEATURED_DESCRIPTION_PREVIEW
  const displayedDescription =
    shouldTruncate && !isExpanded
      ? `${description.slice(0, FEATURED_DESCRIPTION_PREVIEW).trimEnd()}...`
      : description

  return (
    <section >
      <div className="relative overflow-hidden rounded-[2rem] border grid gap-4 lg:grid-cols-[1.0fr_1.0fr] lg:items-stretch  border-white/10 bg-[linear-gradient(140deg,rgba(245,158,11,0.2),rgba(15,23,42,0.86)_38%,rgba(8,47,73,0.9))] p-2 shadow-2xl shadow-black/30 sm:p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.14),transparent_30%)]" />
        <div className="relative ">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f6c563]">
              Spotlight pick
            </p>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
              Editor's choice
            </span>
          </div>

          <h2 className="mt-2 max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {movie.title}
          </h2>

          <div className='pt-2'>
            {/* <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Quick synopsis
            </p> */}
            <p className="mt-2 max-w-xl text-base leading-7 text-slate-200">
              {displayedDescription}
            </p>
            {shouldTruncate ? (
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                className="mt-3 text-sm font-semibold text-[#f6c563] transition hover:text-[#ffd979]"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/8 px-2 py-1.5">
              {movie.year ?? 'Unknown year'}
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-2 py-1.5">
              IMDb {movie.imdbRating}/10
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-2 py-1.5">
              {movie.releaseDate || 'Release date unavailable'}
            </span>
            {(movie.genres || []).slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/10 bg-white/8 px-2 py-1.5"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onOpen(movie)}
              className="rounded-full bg-[#f6c563] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px] hover:bg-[#ffd979]"
            >
              Open details
            </button>
            <a
              href="#browse-movies"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore catalog
            </a>
          </div>
        </div>
            <button
            type="button"
            onClick={() => onOpen(movie)}
            className="group relative mx-auto flex w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 text-left shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-[#f6c563]/35 focus:outline-none focus:ring-2 focus:ring-[#f6c563]/50"
          >
            <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-[#f6c563]/25 to-transparent blur-2xl" />
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="relative aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f6c563]">
                  Watch details
                </p>
                <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-white">
                  {movie.imdbRating}/10
                </span>
              </div>
              <p className="mt-2 text-xl font-semibold text-white">{movie.title}</p>
              <p className="mt-1 text-sm text-slate-300">{movie.releaseDate}</p>
            </div>
          </button>
      </div>
    </section>
  )
}

export function MainPage({
  loading,
  movies,
  filteredMovies,
  featuredMovie,
  topRatedMovie,
  activeSearchLabel,
  apiConfig,
  error,
  retryCount,
  setRetryCount,
  resetFilters,
  query,
  setQuery,
  genre,
  setGenre,
  genres,
  releaseYear,
  setReleaseYear,
  years,
  minRating,
  setMinRating,
  ratings,
  getRating,
  onSelectMovie,
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.16),_transparent_20%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_24%),linear-gradient(155deg,_#08111f,_#111827_45%,_#1f2937)] text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#f6c563]">
              Responsive movie discovery
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Search, filter, rate, and revisit films in one polished experience.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Browse live OMDb results when available, fall back to a curated local catalog when
              needed, and keep your own star ratings saved locally across sessions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Catalog size"
                value={loading ? '...' : movies.length}
                helper={`Current search: "${activeSearchLabel}"`}
              />
              <StatCard
                label="Top IMDb"
                value={topRatedMovie?.imdbRating ? `${topRatedMovie.imdbRating}/10` : 'N/A'}
                helper={topRatedMovie?.title || 'Waiting for results'}
              />
              <StatCard
                label="Your ratings"
                value={Object.keys(ratings).length}
                helper="Stored in local browser storage"
              />
            </div>
          </div>

          <FeaturedMovie movie={featuredMovie} onOpen={onSelectMovie} />
        </section>

        <section id="browse-movies" className="mt-14">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f6c563]">
                Main catalog
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Instant search with combinable filters
              </h2>
              <p className="mt-2 max-w-2xl text-slate-300">
                Search by title, then narrow the results by genre, year, and rating without waiting
                for a full page refresh.
              </p>
            </div>
          </div>

          <MovieFilters
            query={query}
            onQueryChange={setQuery}
            genre={genre}
            onGenreChange={setGenre}
            genres={genres}
            releaseYear={releaseYear}
            onReleaseYearChange={setReleaseYear}
            years={years}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            resultCount={filteredMovies.length}
            totalCount={movies.length}
            activeSearchLabel={activeSearchLabel}
            onReset={resetFilters}
          />
        </section>

        {loading ? <MovieGridSkeleton /> : null}

        {!loading && error ? (
          <StatusMessage
            title="Unable to load live movie results"
            message={
              apiConfig.hasApiKey
                ? `${error} The interface will keep working with the local catalog if needed.`
                : 'No OMDb API key was detected, so the app is using the built-in fallback catalog.'
            }
            tone="error"
            action={
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRetryCount((count) => count + 1)}
                  className="rounded-full border border-rose-300/40 px-4 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-400/10"
                >
                  Retry
                </button>
                <p className="text-xs text-rose-100/80">
                  Expected env vars: `VITE_MOVIE_API_KEY` and optional `VITE_MOVIE_API_BASE_URL`
                </p>
              </div>
            }
          />
        ) : null}

        {!loading && !error && movies.length === 0 ? (
          <StatusMessage
            title="No movies found"
            message={`We couldn’t find titles for "${activeSearchLabel}". Try another title or broader keywords.`}
          />
        ) : null}

        {!loading && !error && movies.length > 0 && filteredMovies.length === 0 ? (
          <StatusMessage
            title="No movies match these filters"
            message="Try widening the genre, rating, or release-year filters to bring more titles back."
            action={
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Clear filters
              </button>
            }
          />
        ) : null}

        {!loading && filteredMovies.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredMovies.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  movie={movie}
                  userRating={getRating(movie.id)}
                  onSelect={onSelectMovie}
                />
              </li>
            ))}
          </ul>
        ) : null}

        {!loading && apiConfig.usingFallbackCatalog ? (
          <p className="mt-8 text-center text-sm text-slate-400">
            Showing fallback movie data. Add a valid OMDb API key in `.env` to enable live search.
          </p>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}
