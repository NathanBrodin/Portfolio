import { queryOptions } from '@tanstack/react-query'

import { getStargazersCount } from '@/lib/functions'

export function githubStarsQueryOptions(repo: string) {
  return queryOptions({
    queryKey: ['github-stars', repo],
    queryFn: () => getStargazersCount({ data: { repo } }),
    staleTime: 1000 * 60 * 60, // 1 hour — star counts barely change
  })
}
