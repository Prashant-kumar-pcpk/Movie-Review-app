export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-slate-950/40 py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Movie Review App</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Built with React and TailwindCSS for fast browsing, responsive filtering, and
              local-first movie ratings.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <p>Responsive UI, detailed movie pages, and reusable components.</p>
            <p className="mt-1">Copyright 2026 Prashant kumar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
