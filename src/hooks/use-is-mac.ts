import { useState } from 'react'

function getIsMac() {
  if (typeof navigator === 'undefined') return true
  return navigator.platform.toUpperCase().includes('MAC')
}

// Parser-blocking script, same technique as the theme / about-greeting scripts:
// runs during HTML parsing (before first paint and before hydration) and patches
// every [data-platform-key] element, so the prerendered guess is corrected
// before the user ever sees it. Self-removes after running (via ScriptOnce).
export const IS_MAC_SCRIPT = `try{var m=navigator.platform.toUpperCase().indexOf('MAC')!==-1;var els=document.querySelectorAll('[data-platform-key]');for(var i=0;i<els.length;i++){els[i].textContent=m?'⌘':'Ctrl';}}catch(e){}`

export function useIsMac() {
  // Read synchronously instead of via useSyncExternalStore (which replays the
  // server snapshot during hydration and flashes on non-Mac): platform never
  // changes, so the first client render can already use the true value.
  // suppressHydrationWarning on consumers covers the server/client diff.
  const [isMac] = useState(getIsMac)
  return isMac
}
