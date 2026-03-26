import { useEffect } from 'react'
import { StarRow } from './StarRow'
import { InteractiveStars } from './InteractiveStars'
import { displayedAverage } from '../utils/rating'

export function MovieDetailModal({ movie, userRating, onRate, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!movie) return null

  const avg = displayedAverage(movie.averageRating, userRating)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close details"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-cinema-900 shadow-2xl ring-1 ring-white/10 sm:max-h-[90vh] sm:rounded-3xl">
        <div className="flex shrink-0 justify-end p-2 sm:absolute sm:right-2 sm:top-2 sm:z-20">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-cinema-800/90 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10 hover:bg-cinema-700 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6 sm:flex-row sm:gap-8 sm:p-8">
          <div className="mx-auto w-full max-w-[220px] shrink-0 sm:mx-0 sm:max-w-[280px]">
            <img
              src={movie.poster}
              alt=""
              className="w-full rounded-xl object-cover shadow-lg ring-1 ring-white/10"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div>
              <h2 id="movie-detail-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
                {movie.title}
              </h2>
              <p className="mt-1 text-cinema-muted">
                {movie.year}
                <span className="mx-2">·</span>
                {movie.genres.join(' · ')}
              </p>
            </div>

            <div className="rounded-xl bg-cinema-800/60 p-4 ring-1 ring-white/5">
              <p className="text-xs font-medium uppercase tracking-wide text-cinema-muted">Average rating</p>
              <div className="mt-2">
                <StarRow value={avg} label={`Average for ${movie.title}`} />
              </div>
              {userRating != null ? (
                <p className="mt-2 text-sm text-slate-400">
                  Catalog baseline {movie.averageRating.toFixed(1)} blended with your {userRating}★
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-400">Rate below to blend your score into the average.</p>
              )}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-cinema-muted">Your rating</p>
              <div className="mt-2">
                <InteractiveStars value={userRating} onChange={(n) => onRate(movie.id, n)} />
              </div>
              <p className="mt-1 text-xs text-cinema-muted">Tap the same star again to clear your rating.</p>
            </div>

            <p className="text-sm leading-relaxed text-slate-300">{movie.description}</p>

            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-cinema-muted">Director</dt>
                <dd className="font-medium text-white">{movie.director}</dd>
              </div>
              <div>
                <dt className="text-cinema-muted">Released</dt>
                <dd className="font-medium text-white">{movie.released}</dd>
              </div>
              <div>
                <dt className="text-cinema-muted">Runtime</dt>
                <dd className="font-medium text-white">{movie.runtime}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-cinema-muted">Cast</dt>
                <dd className="font-medium text-white">{movie.cast.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
