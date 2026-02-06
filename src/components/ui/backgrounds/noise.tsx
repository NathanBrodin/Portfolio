import { cn } from '@/lib/utils'

export function Noise({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-[-1] bg-size-[180px] bg-repeat opacity-[0.035] dark:opacity-[0.012]',
      )}
      style={{ backgroundImage: 'url(/backgrounds/noise.png)' }}
      {...props}
    />
  )
}
