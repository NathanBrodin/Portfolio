import { useTheme } from '@lonik/themer'
import { Dithering } from '@paper-design/shaders-react'

import { createFileRoute } from '@tanstack/react-router'

import { Grid } from '@/components/ui/backgrounds/grid'
import { Page, PageDescription, PageTitle } from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { TECH_STACK } from '@/config/tech-stack'

export const Route = createFileRoute('/og/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resolvedTheme } = useTheme()

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
    <Page>
      <div
        id="og"
        className="relative mt-2 flex flex-col items-center overflow-hidden border"
        style={{ width: 1200, height: 630 }}
      >
        <Section className="h-full border-none"></Section>
        <Section className="flex h-fit flex-col border-none py-24">
          <PageTitle className="text-9xl">Nathan Brodin</PageTitle>
          <PageDescription className="max-w-3xl text-2xl">
            A software engineer with a passion for web development, design, and
            user experience.
          </PageDescription>
        </Section>
        <Section className="h-full border-none">
          <ul className="flew-wrap relative flex gap-4 p-4">
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
        </Section>

        <div className="pointer-events-none absolute inset-0 -z-1 h-full w-full overflow-hidden opacity-10">
          <Dithering
            width={1200}
            height={630}
            colorBack={resolvedTheme === 'dark' ? '#000000' : '#FFFFFF'}
            colorFront={resolvedTheme === 'dark' ? '#cbfbf1' : '#00786f'}
            shape="warp"
            type="4x4"
            size={1.0}
            speed={0}
            scale={1.84}
            offsetX={1.4}
          />
        </div>
        <Grid />
      </div>
    </Page>
  )
}
