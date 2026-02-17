import type { Activity } from '@/components/kibo-ui/contribution-graph'

import { Section } from '../ui/section'
import { GitHubContributionGraph } from './graph'

export function GithubContributions({
  contributions,
}: {
  contributions: Activity[] | undefined
}) {
  return (
    <Section id="github-contributions" className="flex flex-col">
      <h2 className="sr-only">GitHub Contributions</h2>
      <GitHubContributionGraph contributions={contributions} />
    </Section>
  )
}
