import { TECH_STACK } from '@/config/tech-stack'

import { Lines } from '../ui/backgrounds/lines'
import { Diamond } from '../ui/diamond'
import { Section, SectionTitle } from '../ui/section'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export function TechStack() {
  return (
    <Section id="tech-stack" className="flex flex-col">
      <SectionTitle>Tech Stack</SectionTitle>
      <div className="relative flex w-full items-center justify-center border-t px-4">
        <Lines className="opacity-5 select-none dark:opacity-2" />
        <Diamond top left />
        <Diamond top right />
        <ul className="bg-background flex max-w-4xl flex-wrap items-center justify-center gap-4 border-x px-2 py-4 select-none">
          {TECH_STACK.map((tech) => {
            return (
              <li key={tech.key} className="flex">
                <Tooltip>
                  <TooltipTrigger
                    delay={0}
                    render={
                      <a
                        href={tech.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tech.title}
                      />
                    }
                  >
                    {tech.theme ? (
                      <>
                        <img
                          src={`/tech-stack-icons/${tech.key}-light.svg`}
                          alt={`${tech.title} light icon`}
                          width={32}
                          height={32}
                          className="block dark:hidden"
                          loading="lazy"
                        />
                        <img
                          src={`/tech-stack-icons/${tech.key}-dark.svg`}
                          alt={`${tech.title} dark icon`}
                          width={32}
                          height={32}
                          className="hidden dark:block"
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <img
                        src={`/tech-stack-icons/${tech.key}.svg`}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.title}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
