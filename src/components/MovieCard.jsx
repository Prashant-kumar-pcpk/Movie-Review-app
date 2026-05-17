import { StarRow } from './StarRow.jsx'
import { displayedAverage } from '../utils/rating.jsx'

export function MovieCard({ movie, userRating, onSelect }) {
  const avg = displayedAverage(movie.averageRating, userRating)
  const genresLabel = movie.genres?.length ? movie.genres.join(', ') : 'Genre unavailable'
  const yearLabel = movie.year ?? 'Year unavailable'

  return (
    <button
      type="button"
      onClick={() => onSelect(movie)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] border border-white/8 bg-slate-950/55 text-left shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1.5 hover:border-[#f6c563]/40 hover:shadow-black/40 focus:outline-none focus:ring-2 focus:ring-[#f6c563]/50"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent px-4 pb-4 pt-12">
          <div className="flex items-end justify-between gap-3">
            <StarRow value={avg} label={`${movie.title} average rating`} />
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-white">
              {movie.imdbRating}/10
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-lg font-semibold leading-tight text-white group-hover:text-[#f6c563]">
            {movie.title}
          </h2>
          <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300">
            {yearLabel}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-300">{genresLabel}</p>
        <p className="line-clamp-3 text-sm leading-6 text-slate-400">{movie.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2 text-xs">
          {userRating != null ? (
            <span className="font-medium text-[#f6c563]">You rated this {userRating}/5</span>
          ) : (
            <span className="text-slate-500">Rate from the details page</span>
          )}
          <span className="font-semibold uppercase tracking-[0.18em] text-slate-400 group-hover:text-white">
            View more
          </span>
        </div>
      </div>
    </button>
  )
}
