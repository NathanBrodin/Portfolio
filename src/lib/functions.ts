import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

import { Activity } from '@/components/github-contributions/contribution-graph'
import { env } from '@/env'

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getStargazersCount = createServerFn({ method: 'GET' })
  .inputValidator((data: { repo: string }) => data)
  .middleware([
    // @ts-expect-error types currently mismatch between start-static-server-functions and react-start
    staticFunctionMiddleware,
  ])
  .handler(async ({ data }) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${data.repo}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${env.GITHUB_API_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })

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

export const getUsersLocation = createServerFn({ method: 'GET' }).handler(() => {
  const lat = getRequestHeader('x-vercel-ip-latitude')
  const lng = getRequestHeader('x-vercel-ip-longitude')

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
})

export type BlogPreviewPost = {
  slug: string
  title: string
}

export type BlogNavItem = {
  slug: string
  title: string
}

// Dynamic imports keep `content-collections` (full post markup) out of the
// client bundle: these handlers run server-side only.
export const getBlogPreview = createServerFn({ method: 'GET' }).handler(
  async (): Promise<BlogPreviewPost[]> => {
    const { allBlogPosts } = await import('content-collections')
    return allBlogPosts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)
      .map((post) => ({ slug: post.slug, title: post.title }))
  },
)

export const getBlogNav = createServerFn({ method: 'GET' }).handler(
  async (): Promise<BlogNavItem[]> => {
    const { allBlogPosts } = await import('content-collections')
    return allBlogPosts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((post) => ({ slug: post.slug, title: post.title }))
  },
)
