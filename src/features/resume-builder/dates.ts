const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// '2025-08' -> 'Aug 2025'
function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  return `${MONTHS[Number(month) - 1]} ${year}`
}

// ('2025-08', undefined) -> 'Aug 2025 – Present'
export function formatDateRange(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}
