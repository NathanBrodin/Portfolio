import type { Certification } from 'content-collections'
import { ArrowUpRightIcon, CircleCheckBigIcon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { getIcon } from '../ui/icons'

export function CertificationItem({
  className,
  certification,
}: {
  className?: string
  certification: Certification
}) {
  return (
    <a
      className={cn(
        'group hover:bg-muted/50 flex items-center gap-2 p-2',
        className,
      )}
      href={certification.credentialUrl}
      target="_blank"
      rel="noopener"
    >
      <div
        className={cn(
          'mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg select-none',
          'border-muted-foreground/15 ring-edge ring-offset-background border ring-1 ring-offset-1',
          'bg-muted text-muted-foreground [&_svg]:size-4',
        )}
        aria-hidden
      >
        {getIcon(certification.issuerIconName) ?? <CircleCheckBigIcon />}
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="mb-1 leading-snug font-medium text-balance">
          {certification.title}
        </h3>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <dl>
            <dt className="sr-only">Issued by</dt>
            <dd>
              <span aria-hidden>@</span>
              <span className="ml-0.5">{certification.issuer}</span>
            </dd>
          </dl>

          <Separator
            className="data-[orientation=vertical]:h-4"
            orientation="vertical"
          />

          <dl>
            <dt className="sr-only">Issued on</dt>
            <dd>{certification.issueDate}</dd>
          </dl>
        </div>
      </div>

      {certification.credentialUrl && (
        <ArrowUpRightIcon
          className="text-muted-foreground size-4 transition-[rotate] duration-300 group-hover:rotate-45"
          aria-hidden
        />
      )}
    </a>
  )
}
