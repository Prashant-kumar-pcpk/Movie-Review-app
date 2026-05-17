export function MovieGridSkeleton({ count = 8 }) {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-[1.8rem] border border-white/8 bg-slate-950/55 shadow-lg shadow-black/20"
        >
          <div className="aspect-[2/3] animate-pulse bg-slate-800" />
          <div className="space-y-3 p-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
          </div>
        </li>
      ))}
    </ul>
  )
}
