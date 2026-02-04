import { createServerFn } from '@tanstack/react-start'

export const getStargazersCount = createServerFn({ method: 'GET' })
  .inputValidator((data: { repo: string }) => data)
  .handler(async ({ data }) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${data.repo}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      )

      if (!response.ok) {
        return 0
      }

      const json = (await response.json()) as { stargazers_count?: number }
      return Number(json?.stargazers_count) || 0
    } catch {
      return 0
    }
  })
