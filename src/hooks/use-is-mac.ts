import { useSyncExternalStore } from 'react'

function getIsMac() {
  return navigator.platform.toUpperCase().includes('MAC')
}

function getServerSnapshot() {
  return true
}

function subscribe() {
  // Platform doesn't change, no need to subscribe to anything
  return () => {}
}

export function useIsMac() {
  return useSyncExternalStore(subscribe, getIsMac, getServerSnapshot)
}
