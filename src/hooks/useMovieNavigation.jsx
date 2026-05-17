import { useEffect, useMemo, useState } from 'react'

function parseLocation(pathname) {
  const parts = pathname.split('/').filter(Boolean)

  if (parts[0] === 'movie' && parts[1]) {
    return {
      name: 'details',
      movieId: decodeURIComponent(parts[1]),
    }
  }

  return {
    name: 'home',
    movieId: null,
  }
}

export function useMovieNavigation() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return useMemo(() => {
    const route = parseLocation(pathname)

    return {
      ...route,
      goHome() {
        window.history.pushState({}, '', '/')
        setPathname('/')
      },
      goToMovie(movieId) {
        const nextPath = `/movie/${encodeURIComponent(movieId)}`
        window.history.pushState({}, '', nextPath)
        setPathname(nextPath)
      },
    }
  }, [pathname])
}
