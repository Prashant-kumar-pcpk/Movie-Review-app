import { useEffect, useState } from 'react'
import Header from '../layout/Header.jsx'
import Footer from '../layout/footer.jsx'
import { InteractiveStars } from '../components/InteractiveStars.jsx'
import { StarRow } from '../components/StarRow.jsx'
import { StatusMessage } from '../components/StatusMessage.jsx'
import { displayedAverage } from '../utils/rating.jsx'

const DESCRIPTION_PREVIEW_LENGTH = 220

function DetailsSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="aspect-[2/3] animate-pulse rounded-[2rem] bg-white/10" />
      <div className="space-y-5">
        <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-white/10" />
        <div className="h-6 w-1/2 animate-pulse rounded-xl bg-white/10" />
        <div className="h-28 animate-pulse rounded-[2rem] bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-16 animate-pulse rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  )
}

function MetaCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c563]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white">{value}</p>
    </div>
  )
}

function ExpandableDescription({ text, className = '' }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(false)
  }, [text])

  if (!text) return null

  const canToggle = text.length > DESCRIPTION_PREVIEW_LENGTH
  const previewText = canToggle
    ? `${text.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`
    : text

  return (
    <div>
      <p className={className}>{expanded ? text : previewText}</p>
      {canToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 text-sm font-semibold text-[#f6c563] transition hover:text-[#ffd979]"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      ) : null}
    </div>
  )
}

export function MovieDetailsPage({ movie, loading, error, onBack, onRetry, userRating, onRate }) {
  const average = movie ? displayedAverage(movie.averageRating, userRating) : 0

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.16),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(160deg,_#09111f,_#111827_40%,_#1f2937)] text-white">
      <Header compact />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-[#f6c563]/40 hover:bg-white/10"
        >
          <span aria-hidden>←</span>
          Back to browse
        </button>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          {loading ? <DetailsSkeleton /> : null}

          {!loading && error ? (
            <StatusMessage
              title="Unable to load movie details"
              message={error}
              tone="error"
              action={
                <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-full border border-rose-300/40 px-4 py-2 text-sm font-medium text-rose-100 transition hover:bg-rose-400/10"
                >
                  Retry
                </button>
              }
            />
          ) : null}

          {!loading && !error && movie ? (
            <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#f6c563]/20 to-transparent blur-2xl" />
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="relative aspect-[2/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-black/40"
                />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f6c563]">
                      Movie details
                    </p>
                    <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {movie.title}
                    </h1>
                    <ExpandableDescription
                      text={movie.description}
                      className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base"
                    />
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 text-right backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                      
                    </p>
                    <div className="mt-3 flex justify-end">
                      <StarRow value={average} label={`${movie.title} average rating`} />
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      IMDb {movie.imdbRating}/10
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {movie.releaseDate}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {movie.runtime}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {movie.rated}
                  </span>
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <section className="mt-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(245,158,11,0.14),rgba(255,255,255,0.03))] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c563]">
                        Your rating
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        Rate this movie from 1 to 5 stars. Tap the same star again to clear it.
                      </p>
                    </div>
                    <InteractiveStars value={userRating} onChange={(value) => onRate(movie.id, value)} />
                  </div>
                  <p className="mt-4 text-sm text-slate-300">
                    {userRating != null
                      ? `Your review score is ${userRating}/5 and is blended into the displayed average.`
                      : 'No personal rating yet. Add one to personalize the score everywhere in the app.'}
                  </p>
                </section>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <MetaCard label="Director" value={movie.director} />
                  <MetaCard label="Actors" value={movie.cast?.join(', ') || 'Cast unavailable'} />
                  <MetaCard label="Language" value={movie.language} />
                  <MetaCard label="Country" value={movie.country} />
                  <MetaCard label="Release Year" value={movie.year ?? 'Unknown'} />
                  <MetaCard label="Genre Mix" value={movie.genres?.join(', ') || 'Unknown'} />
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  )
}
