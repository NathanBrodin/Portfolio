import { Fragment } from 'react'

import type { Experience } from '@/lib/experiences'

import { Diamond } from '../ui/diamond'
import { ExperiencePositionItem } from './position-item'

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="relative flex flex-col gap-4 border-b px-4 py-4">
      <Diamond bottom left />
      <Diamond bottom right />
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          {experience.companyLogo ? (
            <img
              src={experience.companyLogo}
              alt={`${experience.companyName} logo`}
              width={24}
              height={24}
              className="rounded-full"
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg leading-snug font-medium">
          {experience.companyWebsite ? (
            <a
              className="underline-offset-4 hover:underline"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="bg-info absolute inline-flex size-3 animate-ping rounded-full opacity-50" />
            <span className="bg-info relative inline-flex size-2 rounded-full" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      <div className="before:bg-border relative space-y-4 before:absolute before:left-3 before:h-full before:w-px">
        {experience.positions.map((position) => (
          <Fragment key={position.id}>
            <ExperiencePositionItem position={position} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
