export function StatusMessage({ title, message, tone = 'neutral', action }) {
  const toneClassName =
    tone === 'error'
      ? 'border-rose-500/30 bg-rose-500/10 text-rose-100'
      : 'border-white/10 bg-white/5 text-slate-100'

  return (
    <div className={`mt-10 rounded-[2rem] border p-6 text-center shadow-xl shadow-black/10 ${toneClassName}`}>
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 opacity-90">{message}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
