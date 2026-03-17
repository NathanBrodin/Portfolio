import { useTheme } from '@lonik/themer'
import { useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { Button } from '@/components/ui/button'
import { MoonIcon } from '@/components/ui/icons/moon'
import { SunMediumIcon } from '@/components/ui/icons/sun-medium'
import { Kbd } from '@/components/ui/kbd'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { playSound } from '@/lib/play-sound'
import { switch005Sound } from '@/sounds/switch-005'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const switchTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    playSound(switch005Sound)
  }, [resolvedTheme, setTheme])

  useHotkeys('t', switchTheme)

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="ghost" noSound size="icon" onClick={switchTheme} />
        }
      >
        <MoonIcon className="relative hidden after:absolute after:-inset-2 dark:block" />
        <SunMediumIcon className="relative hidden not-dark:block after:absolute after:-inset-2" />
        <span className="sr-only">Theme Toggle</span>
      </TooltipTrigger>

      <TooltipContent>
        Toggle Theme
        <Kbd className="ml-1">T</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
