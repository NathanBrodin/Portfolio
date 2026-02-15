import { createFileRoute } from '@tanstack/react-router'

import { Grid } from '@/components/ui/backgrounds/grid'
import { Lines } from '@/components/ui/backgrounds/lines'
import { Noise } from '@/components/ui/backgrounds/noise'
import { Diamond } from '@/components/ui/diamond'
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

  const stack = keys.flatMap((key) => {
    const tech = TECH_STACK.find((t) => t.key === key)
    return tech ? [tech] : []
  })

  return (
    <main className="flex h-full w-full flex-1 items-center justify-center">
      <div
        id="og"
        className="relative flex items-center justify-center overflow-hidden"
        style={{ width: 1200, height: 630 }}
      >
        <Noise />
        <div className="relative flex flex-col">
          {/* Full-height vertical lines */}
          <div className="bg-border pointer-events-none absolute top-1/2 left-0 z-10 h-[200vh] w-[0.5px] -translate-y-1/2" />
          <div className="bg-border pointer-events-none absolute top-1/2 right-0 z-10 h-[200vh] w-[0.5px] -translate-y-1/2" />

          {/* Top divider */}
          <div className="before:bg-border after:bg-border relative flex h-4 items-center justify-between px-4 py-1 before:absolute before:top-0 before:-left-[100vw] before:z-10 before:h-[0.5px] before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:z-10 after:h-[0.5px] after:w-[200vw]">
            <Diamond top left className="left-[-4px] z-50" />
            <Diamond top right className="right-[-4px] z-50" />
            <Diamond bottom left className="left-[-4px] z-50" />
            <Diamond bottom right className="right-[-4px] z-50" />
            <Lines />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center p-14 text-center">
            <h1 className="font-display text-primary text-8xl font-normal">
              Nathan Brodin
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl text-2xl leading-5">
              A software engineer with a passion for web development, design,
              and user experience.
            </p>
            <Grid />
          </div>

          {/* Tech stack */}
          <div className="border-t-border relative flex items-center justify-center border-t-[0.5px]">
            <Diamond top left className="left-[-4px] z-50" />
            <Diamond top right className="right-[-4px] z-50" />
            <Lines className="opacity-5 select-none dark:opacity-2" />
            <ul className="flew-wrap bg-background border-x-border relative flex gap-4 border-x-[0.5px] p-6">
              <Diamond top left className="left-[-4px] z-50" />
              <Diamond top right className="right-[-4px] z-50" />
              <Diamond bottom left className="left-[-4px] z-50" />
              <Diamond bottom right className="right-[-4px] z-50" />
              {stack.map((tech) => {
                return (
                  <li key={tech.key} className="flex">
                    {tech.theme ? (
                      <>
                        <img
                          src={`/tech-stack-icons/${tech.key}-light.svg`}
                          alt={`${tech.title} light icon`}
                          width={36}
                          height={36}
                          className="block dark:hidden"
                        />
                        <img
                          src={`/tech-stack-icons/${tech.key}-dark.svg`}
                          alt={`${tech.title} dark icon`}
                          width={36}
                          height={36}
                          className="hidden dark:block"
                        />
                      </>
                    ) : (
                      <img
                        src={`/tech-stack-icons/${tech.key}.svg`}
                        alt={`${tech.title} icon`}
                        width={36}
                        height={36}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Bottom divider */}
          <div className="before:bg-border after:bg-border relative flex h-4 items-center justify-between px-4 py-1 before:absolute before:top-0 before:-left-[100vw] before:z-10 before:h-[0.5px] before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:z-10 after:h-[0.5px] after:w-[200vw]">
            <Diamond top left className="left-[-4px] z-50" />
            <Diamond top right className="right-[-4px] z-50" />
            <Diamond bottom left className="left-[-4px] z-50" />
            <Diamond bottom right className="right-[-4px] z-50" />
            <Lines />
          </div>
        </div>
      </div>
    </main>
  )
}
