// Design tokens bridging the portfolio theme (light) into Takumi's built-in
// Tailwind parser: utilities like `text-primary` or `font-display` resolve
// these custom properties. Values are static (no color-mix), and the import
// enables preflight, which drops UA margins and list markers.
export const resumeThemeCss = `
@import "tailwindcss";
:root {
  --color-background: #ffffff;
  --color-foreground: #262626;
  --color-primary: #0f766e;
  --color-muted-foreground: #737373;
  --color-border: #e5e5e5;
  --font-sans: 'Writer', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Lora', Georgia, serif;
}
`
