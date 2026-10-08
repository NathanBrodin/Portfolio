import type { CssInput } from '@takumi-rs/helpers'

export const PDF_FONT_FAMILIES = ['Writer', 'Lora']

// Flat values from the light theme in src/styles.css: Takumi does not resolve var() inside custom property values.
export const PDF_CSS: CssInput = {
  selector: ':root',
  style: {
    '--font-sans': "'Writer'",
    '--font-display': "'Lora'",
    '--color-foreground': '#262626',
    '--color-muted-foreground': 'color-mix(in srgb, #737373 90%, black)',
    '--color-primary': '#0f766e',
    '--color-border': 'color-mix(in oklab, black 8%, transparent)',
  },
}
