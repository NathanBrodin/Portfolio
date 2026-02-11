import { Suspense } from 'react'

import { useServerFn } from '@tanstack/react-start'

import { siteConfig } from '@/config/site'
import { getGithubContributions as getServerGithubContributions } from '@/lib/functions'

import { Section } from '../ui/section'
import { GitHubContributionFallback, GitHubContributionGraph } from './graph'

export function GithubContributions() {
  const getGithubContributions = useServerFn(getServerGithubContributions)

  const contributionsPromise = getGithubContributions({
    data: { user: siteConfig.githubHandle },
  })

  return (
    <Section id="github-contributions" className="flex flex-col">
      <h2 className="sr-only">GitHub Contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributionsPromise} />
      </Suspense>
    </Section>
  )
}
