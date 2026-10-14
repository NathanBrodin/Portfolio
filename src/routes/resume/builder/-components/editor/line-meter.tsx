import { useEffect, useState } from 'react'

import { InputGroupAddon } from '@/components/ui/input-group'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import { ensureMeasureFonts, estimateFills } from '../measure'

const meterVariants = {
  headline: { width: 730, maxLines: 1 },
  bullet: { width: 678, maxLines: 3 },
  project: { width: 698, maxLines: 2 },
}

export function LineMeter({
  text,
  variant,
  name = '',
  id,
}: {
  text: string
  variant: keyof typeof meterVariants
  name?: string
  id: string
}) {
  const [, refresh] = useState(0)

  useEffect(() => {
    let active = true
    void ensureMeasureFonts().then(() => {
      if (active) refresh((value) => value + 1)
    })
    return () => {
      active = false
    }
  }, [])

  const { width, maxLines } = meterVariants[variant]
  const fills = estimateFills(text, width, variant === 'project' && name ? `${name} — ` : '')
  const last = fills[fills.length - 1] ?? 0
  const lines = fills.length
  const empty = lines === 1 && fills[0] === 0
  const over = lines > maxLines
  const orphan = !empty && !over && lines > 1 && last < 0.25
  const warn = over || orphan

  const count = lines === 1 ? '1 line' : `${lines} lines`
  const percent = Math.round(last * 100)
  let detail = empty
    ? 'Empty. Takes no space in the PDF.'
    : `${count} in PDF, last line ${percent}% full.`
  if (over) detail += ` Over the ${maxLines}-line limit. Trim words to fit.`
  else if (orphan) detail += ' Trimming a few words from the last line could save lots of space.'
  else if (!empty && last > 0.9) detail += ` One more word may tip to ${lines + 1} lines.`

  return (
    <InputGroupAddon align="block-end" className="mt-1 justify-end">
      <Tooltip>
        <TooltipTrigger
          render={
            <span
              className="flex cursor-default flex-col items-end py-0.5 outline-none"
              aria-hidden="true"
            />
          }
        >
          <span aria-hidden="true" className="flex w-8 flex-col gap-0.5">
            {fills.map((fill, index) => (
              <span key={index} className="h-0.75 w-full rounded-full bg-input">
                <span
                  className={cn(
                    'block h-full rounded-full',
                    warn ? 'bg-warning' : 'bg-muted-foreground',
                  )}
                  style={{ width: `${Math.round(fill * 100)}%` }}
                />
              </span>
            ))}
          </span>
        </TooltipTrigger>
        <TooltipPopup side="bottom">{detail}</TooltipPopup>
      </Tooltip>
      <span id={id} className="sr-only">
        {detail}
      </span>
      <span role="status" className="sr-only">
        {over ? `${name ? `${name} over` : 'Over'} the ${maxLines}-line limit.` : ''}
      </span>
    </InputGroupAddon>
  )
}
