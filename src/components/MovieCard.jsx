import { StarRow } from './StarRow'
import { displayedAverage } from '../utils/rating'

export function MovieCard({ movie, userRating, onSelect }) {
  const avg = displayedAverage(movie.averageRating, userRating)

  return (
    <button
      type="button"
      onClick={() => onSelect(movie)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-cinema-800/80 text-left ring-1 ring-white/5 transition hover:ring-cinema-accent/40 hover:shadow-lg hover:shadow-black/40 focus:outline-none focus:ring-2 focus:ring-cinema-accent"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-cinema-900">
        <img
          src={movie.poster}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cinema-950 via-cinema-950/80 to-transparent px-3 pb-3 pt-12">
          <StarRow value={avg} label={`${movie.title} average rating`} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="font-display text-lg font-semibold leading-tight text-white group-hover:text-cinema-accent">
          {movie.title}
        </h2>
        <p className="text-sm text-cinema-muted">
          {movie.year}
          <span className="mx-2 text-cinema-700">·</span>
          {movie.genres.join(', ')}
        </p>
        {userRating != null ? (
          <p className="text-xs text-cinema-accent">You rated {userRating}★</p>
        ) : null}
      </div>
    </button>
  )
}
