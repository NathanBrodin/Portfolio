import { useTheme } from '@/providers/theme'
import { useCallback } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { useSound } from '@/hooks/use-sound'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { MoonIcon } from '@/components/ui/icons/moon'
import { SunMediumIcon } from '@/components/ui/icons/sun-medium'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const playClick = useSound('/audio/click.wav')

  const switchTheme = useCallback(() => {
    playClick(0.5)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme, playClick])

  useHotkeys('d', switchTheme)

  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="ghost" size="icon" onClick={switchTheme} />}
      >
        <MoonIcon className="relative hidden after:absolute after:-inset-2 dark:block" />
        <SunMediumIcon className="relative hidden after:absolute after:-inset-2 not-dark:block" />
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
