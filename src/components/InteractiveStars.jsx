const FULL = 5

export function InteractiveStars({ value, onChange, disabled }) {
  const current = value ?? 0

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Your rating">
      {Array.from({ length: FULL }, (_, i) => {
        const n = i + 1
        const active = n <= current

        return (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onChange(n === current ? null : n)}
            className={`rounded-full p-1 transition duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#f6c563]/60 disabled:opacity-50 ${
              active ? 'text-[#f6c563]' : 'text-cinema-700'
            }`}
            aria-label={`Rate ${n} out of 5 stars`}
            aria-pressed={active}
          >
            <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
