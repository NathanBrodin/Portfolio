import { useSyncExternalStore } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'

function subscribeToMobileQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getIsMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getIsMobileServerSnapshot() {
  return false
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot,
  )
}
