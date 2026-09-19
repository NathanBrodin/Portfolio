import { allProjects, type Project } from 'content-collections'

export function getSortedProjects(): Project[] {
  return [...allProjects].sort((a, b) => {
    const orderDiff = (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
    if (orderDiff !== 0) return orderDiff

    const dateDiff = (b.startDate ?? '').localeCompare(a.startDate ?? '')
    if (dateDiff !== 0) return dateDiff

    return a.title.localeCompare(b.title)
  })
}
