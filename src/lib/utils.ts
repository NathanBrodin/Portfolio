import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseDate(dateStr: string): Date {
  if (dateStr.includes('.')) {
    const [month, year] = dateStr.split('.')
    return new Date(parseInt(year), parseInt(month) - 1, 1)
  } else {
    return new Date(parseInt(dateStr), 0, 1)
  }
}

function monthsDiff(start: Date, end: Date): number {
  const yearsDiff = end.getFullYear() - start.getFullYear()
  const monthsDiff = end.getMonth() - start.getMonth()
  return yearsDiff * 12 + monthsDiff + 1
}

export function calculateEmploymentDuration(
  start: string,
  end?: string,
): string {
  const startDate = parseDate(start)
  const endDate = end ? parseDate(end) : new Date()
  const totalMonths = monthsDiff(startDate, endDate)
  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths === 1 ? '' : 's'}`
  } else {
    const years = Math.round(totalMonths / 12)
    return `${years} year${years === 1 ? '' : 's'}`
  }
}
