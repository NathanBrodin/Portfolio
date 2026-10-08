import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { Page } from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider, SubSectionDivider } from '@/components/ui/section-divider'
import { Skeleton } from '@/components/ui/skeleton'

import { BuilderToolbar } from './-components/builder-toolbar'
import { BuilderEditors } from './-components/editors'
import { ResumeBuilderProvider } from './-components/store'

export const Route = createFileRoute('/resume/builder/')({
  ssr: false,
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  pendingComponent: PendingRoute,
  component: RouteComponent,
})

// Heavy preview (server-rendered PDF) loads only when this route mounts.
const ResumePreview = lazy(() => import('./-components/preview'))

function PendingRoute() {
  return (
    <Page>
      <Section variant="panel" size="sm">
        <Skeleton className="h-7 w-full" />
      </Section>
      <SubSectionDivider />
      <Section variant="panel" size="md">
        <div className="grid w-full items-start gap-4 lg:grid-cols-[400px_minmax(0,1fr)]">
          <Skeleton className="h-screen w-full rounded-xl" />
          <Skeleton className="h-screen w-full rounded-lg" />
        </div>
      </Section>
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}

function RouteComponent() {
  return (
    <ResumeBuilderProvider>
      <Page>
        <BuilderToolbar />
        <SubSectionDivider />
        <Section variant="panel" size="md">
          <div className="grid w-full items-start gap-4 lg:grid-cols-[400px_minmax(0,1fr)]">
            <BuilderEditors />
            <div className="lg:sticky lg:top-14">
              <Suspense fallback={<Skeleton className="h-screen w-full rounded-lg" />}>
                <ResumePreview />
              </Suspense>
            </div>
          </div>
        </Section>
        <SectionDivider />
        <Section className="h-16" />
      </Page>
    </ResumeBuilderProvider>
  )
}
