import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { Page } from '@/components/ui/page'
import { Section } from '@/components/ui/section'
import { SectionDivider, SubSectionDivider } from '@/components/ui/section-divider'
import { Skeleton } from '@/components/ui/skeleton'
import { BuilderEditors } from '@/features/resume-builder/editors'
import { ResumeBuilderProvider } from '@/features/resume-builder/store'

import { BuilderToolbar } from './-components/builder-toolbar'
import { EditorSkeleton, PreviewSkeleton } from './-components/preview-skeleton'

export const Route = createFileRoute('/resume/builder/')({
  ssr: false,
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  pendingComponent: BuilderPending,
  component: BuilderPage,
})

// Heavy preview (server-rendered PDF) loads only when this route mounts.
const ResumePreview = lazy(() => import('@/features/resume-builder/preview'))

function BuilderPending() {
  return (
    <Page>
      <Section variant="panel" size="sm">
        <Skeleton className="h-7 w-full" />
      </Section>
      <SubSectionDivider />
      <Section variant="panel" size="md">
        <div className="grid w-full items-start gap-4 lg:grid-cols-[400px_minmax(0,1fr)]">
          <EditorSkeleton />
          <PreviewSkeleton />
        </div>
      </Section>
      <SectionDivider />
      <Section className="h-16" />
    </Page>
  )
}

function BuilderPage() {
  return (
    <ResumeBuilderProvider>
      <Page>
        <BuilderToolbar />
        <SubSectionDivider />
        <Section variant="panel" size="md">
          <div className="grid w-full items-start gap-4 lg:grid-cols-[400px_minmax(0,1fr)]">
            <BuilderEditors />
            <div className="lg:sticky lg:top-14">
              <Suspense fallback={<PreviewSkeleton />}>
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
