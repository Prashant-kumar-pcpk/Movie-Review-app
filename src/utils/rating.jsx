/** Shown average blends catalog average with the signed-in user’s rating when set. */
export function displayedAverage(baseAverage, userStars) {
  const b = Math.min(5, Math.max(0, Number(baseAverage) || 0))
  if (userStars == null) return b
  const u = Math.min(5, Math.max(0, Number(userStars)))
  return Math.round(((b + u) / 2) * 10) / 10
}
