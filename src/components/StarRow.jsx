import { useId } from 'react'

const FULL = 5

function StarIcon({ filled, half, gradientId }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${filled || half ? 'text-cinema-accent' : 'text-cinema-700'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      {half ? (
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="rgb(37 43 56)" stopOpacity="1" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        fill={half ? `url(#${gradientId})` : 'currentColor'}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  )
}

/** Read-only star display for a 1–5 value (supports halves for averages). */
export function StarRow({ value, label, className = '' }) {
  const gid = useId().replace(/:/g, '')
  const v = Math.min(FULL, Math.max(0, Number(value) || 0))
  const stars = []
  for (let i = 1; i <= FULL; i++) {
    if (v >= i) stars.push({ key: i, filled: true, half: false })
    else if (v >= i - 0.5) stars.push({ key: i, filled: false, half: true })
    else stars.push({ key: i, filled: false, half: false })
  }

  return (
    <div className={`flex flex-wrap items-center gap-1 ${className}`}>
      <span className="flex gap-0.5" role="img" aria-label={label ?? `Rating ${v.toFixed(1)} out of 5`}>
        {stars.map((s) => (
          <StarIcon key={s.key} filled={s.filled} half={s.half} gradientId={`${gid}-h${s.key}`} />
        ))}
      </span>
      <span className="text-sm text-cinema-muted">{v.toFixed(1)}</span>
    </div>
  )
}
