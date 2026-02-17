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
import { useSound } from '@/hooks/use-sound'
import { useTheme } from '@/providers/theme'
import { switch005Sound } from '@/sounds/switch-005'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const [play] = useSound(switch005Sound)

  const switchTheme = useCallback(() => {
    play()

    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme, play])

  useHotkeys('d', switchTheme)

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

      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
