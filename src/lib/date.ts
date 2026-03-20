/**
 * Parses a date string into a Date object.
 * Supports 'MM.YYYY', 'YYYY-MM', and 'YYYY' formats. Defaults the day to the 1st of the month.
 *
 * @param dateStr - The date string to parse.
 * @returns A Date object representing the parsed year and month.
 * * @example
 * parseDate('05.2023'); // Returns Date object for May 1, 2023
 * parseDate('2023-05'); // Returns Date object for May 1, 2023
 * parseDate('2024');    // Returns Date object for Jan 1, 2024
 */
function parseDate(dateStr: string): Date {
  if (dateStr.includes('.')) {
    const [month, year] = dateStr.split('.')
    return new Date(parseInt(year), parseInt(month) - 1, 1)
  } else if (dateStr.includes('-')) {
    const [year, month] = dateStr.split('-')
    return new Date(parseInt(year), parseInt(month) - 1, 1)
  } else {
    return new Date(parseInt(dateStr), 0, 1)
  }
}

/**
 * Formats a given date string into a standard 'MM.YYYY' format.
 *
 * @param dateStr - The input date string (can be any format supported by `parseDate`).
 * @returns The formatted date string in 'MM.YYYY' format.
 *
 * @example
 * formatDate('2023-05'); // Returns '05.2023'
 * formatDate('2024');    // Returns '01.2024'
 */
export function formatDate(dateStr: string): string {
  const date = parseDate(dateStr)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}.${year}`
}

export function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calculates the inclusive difference in months between two dates.
 *
 * @param start - The starting date.
 * @param end - The ending date.
 * @returns The total number of months between the two dates (+1 for inclusive counting).
 * * @example
 * const start = new Date(2023, 0, 1); // January 1, 2023
 * const end = new Date(2023, 2, 1);   // March 1, 2023
 * monthsDiff(start, end);             // Returns 3
 */
function monthsDiff(start: Date, end: Date): number {
  const yearsDiff = end.getFullYear() - start.getFullYear()
  const monthsDiff = end.getMonth() - start.getMonth()
  return yearsDiff * 12 + monthsDiff + 1
}

/**
 * Calculates a human-readable employment duration based on start and end dates.
 * Returns exact months if under a year, or rounds to the nearest year if 12 months or more.
 *
 * @param start - The start date string (e.g., '01.2020').
 * @param end - The optional end date string. Defaults to the current date if omitted.
 * @returns A formatted string representing the duration (e.g., '5 months', '2 years').
 *
 * @example
 * calculateEmploymentDuration('01.2023', '06.2023'); // Returns '6 months'
 * calculateEmploymentDuration('01.2020', '01.2022'); // Returns '2 years'
 */
export function calculateEmploymentDuration(start: string, end?: string): string {
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

/**
 * Formats the employment duration into an ISO 8601 duration string.
 *
 * @param start - The start date string.
 * @param end - The optional end date string. Defaults to the current date if omitted.
 * @returns The ISO 8601 formatted duration string (e.g., 'P1Y2M').
 *
 * @example
 * formatEmploymentDuration('01.2020', '03.2021'); // Returns 'P1Y3M' (inclusive of start and end months)
 * formatEmploymentDuration('05.2023', '05.2023'); // Returns 'P0M'
 */
export function formatEmploymentDuration(start: string, end?: string): string {
  const startDate = parseDate(start)
  const endDate = end ? parseDate(end) : new Date()
  const totalMonths = monthsDiff(startDate, endDate)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  let duration = 'P'
  if (years > 0) duration += `${years}Y`
  if (months > 0) duration += `${months}M`
  if (duration === 'P') duration = 'P0M'

  return duration
}
