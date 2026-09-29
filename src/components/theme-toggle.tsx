import { useTheme } from '@lonik/themer'
import { useHotkey } from '@tanstack/react-hotkeys'
import { useCallback, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { MoonIcon } from '@/components/ui/icons/moon'
import { SunMediumIcon } from '@/components/ui/icons/sun-medium'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { META_THEME_COLORS } from '@/config/site'
import { useMounted } from '@/hooks/use-mounted'
import { playSound } from '@/lib/play-sound'
import { switch005Sound } from '@/sounds/switch-005'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // The prerender bakes one theme while the client resolves its own
  // (storage/system) — reading it during the first render mismatches SSR and
  // forces a full client re-render. Gate on mount instead: same output on
  // server and first client render, live value right after. The page itself
  // never flashes (the themer script applies the theme pre-paint); only this
  // icon button's label syncs a frame late, with identical geometry.
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark ? META_THEME_COLORS.dark : META_THEME_COLORS.light)
  }, [isDark])

  const switchTheme = useCallback(() => {
    if (!document.startViewTransition) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      playSound(switch005Sound)
      return
    }

    document.startViewTransition(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))
  }, [resolvedTheme, setTheme])

  useHotkey('T', switchTheme)

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            noSound
            size="icon"
            onClick={switchTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          />
        }
      >
        <MoonIcon
          className="relative hidden after:absolute after:-inset-2 dark:block"
          aria-hidden="true"
        />
        <SunMediumIcon
          className="relative hidden not-dark:block after:absolute after:-inset-2"
          aria-hidden="true"
        />
        <span className="sr-only">{isDark ? 'Switch to light theme' : 'Switch to dark theme'}</span>
      </TooltipTrigger>

      <TooltipContent>
        Toggle Theme
        <Kbd className="ml-1">T</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
