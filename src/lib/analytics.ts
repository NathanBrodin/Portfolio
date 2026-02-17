/**
 * Lightweight analytics wrapper that lazy-loads posthog-js on first use.
 * This keeps the full PostHog SDK (~80-100kB) out of the initial JS bundle.
 */
export function capture(
  event: string,
  properties?: Record<string, unknown>,
): void {
  import('posthog-js').then(({ default: posthog }) => {
    posthog.capture(event, properties)
  })
}
