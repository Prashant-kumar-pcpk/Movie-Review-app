export default function Header({ compact = false }) {
  return (
    <header className="border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f6c563]">
              Cinematic reviews
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Movie Review Application
            </h1>
            {!compact ? (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Discover movies, refine your search with smart filters, and save your personal
                star ratings with a responsive UI that works beautifully on any screen size.
              </p>
            ) : null}
          </div>

          <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
            <a
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5"
            >
              Home
            </a>
            <a
              href="/#browse-movies"
              className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5"
            >
              Browse
            </a>
            {!compact ? (
              <a
                href="/#browse-movies"
                className="rounded-full border border-white/10 px-4 py-2 transition hover:bg-white/5"
              >
                Filters
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}
