import { useTheme } from '@lonik/themer'
import { Dithering } from '@paper-design/shaders-react'
import { createFileRoute } from '@tanstack/react-router'

import { Grid } from '@/components/ui/backgrounds/grid'
import { Page, PageDescription, PageTitle } from '@/components/ui/page'

export const Route = createFileRoute('/blog/og/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resolvedTheme } = useTheme()

  return (
    <Page>
      <div
        id="og"
        className="relative mt-2 flex h-full flex-col items-center justify-between overflow-hidden border p-14"
        style={{ width: 1200, height: 630 }}
      >
        <div />
        <div className="flex flex-col gap-2">
          <PageTitle className="text-9xl">Nathan's Blog</PageTitle>
          <PageDescription className="max-w-3xl text-2xl">
            Articles on development, design and ideas.
          </PageDescription>
        </div>
        <div />
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
            offsetX={0.3}
          />
        </div>
        <Grid />
      </div>
    </Page>
  )
}
