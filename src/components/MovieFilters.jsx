export function MovieFilters({
  query,
  onQueryChange,
  genre,
  onGenreChange,
  genres,
  releaseYear,
  onReleaseYearChange,
  years,
  minRating,
  onMinRatingChange,
  resultCount,
  totalCount,
  activeSearchLabel,
  onReset,
}) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-4 shadow-2xl shadow-black/20 backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="block flex-1">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f6c563]">
              Search Movies
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search by title, keyword, or genre"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#f6c563] focus:outline-none focus:ring-2 focus:ring-[#f6c563]/30"
            />
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 lg:min-w-64">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Results
            </p>
            <p className="mt-2 text-2xl font-bold text-white">
              {resultCount}
              <span className="ml-2 text-sm font-medium text-slate-400">of {totalCount}</span>
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {activeSearchLabel ? `Showing matches for "${activeSearchLabel}"` : 'Showing default catalog'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Genre
            </span>
            <select
              value={genre}
              onChange={(event) => onGenreChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-[#f6c563] focus:outline-none focus:ring-2 focus:ring-[#f6c563]/30"
            >
              <option value="">All genres</option>
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Rating
            </span>
            <select
              value={minRating}
              onChange={(event) => onMinRatingChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-[#f6c563] focus:outline-none focus:ring-2 focus:ring-[#f6c563]/30"
            >
              <option value="0">Any rating</option>
              <option value="2.5">2.5+ stars</option>
              <option value="3">3.0+ stars</option>
              <option value="3.5">3.5+ stars</option>
              <option value="4">4.0+ stars</option>
              <option value="4.5">4.5+ stars</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Release year
            </span>
            <select
              value={releaseYear}
              onChange={(event) => onReleaseYearChange(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white focus:border-[#f6c563] focus:outline-none focus:ring-2 focus:ring-[#f6c563]/30"
            >
              <option value="">All years</option>
              {years.map((item) => (
                <option key={item} value={String(item)}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={onReset}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#f6c563]/40 hover:bg-white/10"
            >
              Reset all filters
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
