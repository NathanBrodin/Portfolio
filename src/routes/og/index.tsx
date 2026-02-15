import { createFileRoute } from '@tanstack/react-router'

import { Grid } from '@/components/ui/backgrounds/grid'
import { Lines } from '@/components/ui/backgrounds/lines'
import { Noise } from '@/components/ui/backgrounds/noise'
import { Diamond } from '@/components/ui/diamond'
import { SectionDivider } from '@/components/ui/section-divider'
import { TECH_STACK } from '@/config/tech-stack'

export const Route = createFileRoute('/og/')({
  component: RouteComponent,
})

function RouteComponent() {
  const keys = [
    'typescript',
    'react',
    'tailwindcss',
    'shadcn-ui',
    'tanstack',
    'nextjs2',
  ] as const

  const stack = TECH_STACK.filter((tech) =>
    (keys as readonly string[]).includes(tech.key),
  )

  return (
    <main className="flex h-full w-full flex-1 items-center justify-center">
      <div
        id="og"
        className="relative flex items-center justify-center overflow-hidden"
        style={{ width: 1200, height: 630 }}
      >
        <Noise />
        <div className="before:bg-border after:bg-border relative flex flex-col before:absolute before:top-0 before:-left-[100vw] before:z-10 before:h-[0.5px] before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:z-10 after:h-[0.5px] after:w-[200vw]">
          <div className="bg-border pointer-events-none absolute top-1/2 left-0 h-[200vh] w-[0.5px] -translate-y-1/2" />
          <div className="bg-border pointer-events-none absolute top-1/2 right-0 h-[200vh] w-[0.5px] -translate-y-1/2" />
          <div className="flex flex-col items-center justify-center px-10 py-10 text-center">
            <h1 className="font-display text-primary text-7xl font-normal">
              Nathan Brodin
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-xl">
              A software engineer with a passion for web development, design,
              and user experience.
            </p>
          </div>
          <div className="flex items-center justify-center py-4">
            <ul className="flew-wrap flex gap-4">
              {stack.map((tech) => {
                return (
                  <li key={tech.key} className="flex">
                    {tech.theme ? (
                      <>
                        <img
                          src={`/tech-stack-icons/${tech.key}-light.svg`}
                          alt={`${tech.title} light icon`}
                          width={32}
                          height={32}
                          className="block dark:hidden"
                        />
                        <img
                          src={`/tech-stack-icons/${tech.key}-dark.svg`}
                          alt={`${tech.title} dark icon`}
                          width={32}
                          height={32}
                          className="hidden dark:block"
                        />
                      </>
                    ) : (
                      <img
                        src={`/tech-stack-icons/${tech.key}.svg`}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
