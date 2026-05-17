export function displayedAverage(baseAverage, userStars) {
  const base = Math.min(5, Math.max(0, Number(baseAverage) || 0))
  if (userStars == null) return base

  const user = Math.min(5, Math.max(0, Number(userStars) || 0))
  return Math.round(((base + user) / 2) * 10) / 10
}
