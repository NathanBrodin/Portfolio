import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

import type { Activity } from '@/components/kibo-ui/contribution-graph'
import { env } from '@/env'

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getStargazersCount = createServerFn({ method: 'GET' })
  .inputValidator((data: { repo: string }) => data)
  .handler(async ({ data }) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${data.repo}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${env.GITHUB_API_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      )

      if (!response.ok) {
        return 0
      }

      const json = (await response.json()) as { stargazers_count?: number }
      return Number(json.stargazers_count) || 0
    } catch {
      return 0
    }
  })

export const getGithubContributions = createServerFn({ method: 'GET' })
  .inputValidator((data: { user: string }) => data)
  .handler(async ({ data }) => {
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${data.user}?y=last`,
      )
      const json = (await response.json()) as GitHubContributionsResponse
      return json.contributions
    } catch {
      return
    }
  })

export const getUsersLocation = createServerFn({ method: 'GET' }).handler(
  () => {
    const lat = getRequestHeader('x-vercel-ip-latitude')
    const lng = getRequestHeader('x-vercel-ip-lontitude')

    if (!lat || !lng) {
      return {
        lat: null,
        lng: null,
      }
    }

    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    }
  },
)
