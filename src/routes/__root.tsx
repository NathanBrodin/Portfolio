import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TooltipProvider } from '@/components/ui/tooltip'
import { siteConfig } from '@/config/site'
import { AnalyticsProvider } from '@/providers/analytics'
import { ThemeProvider } from '@/providers/theme'

import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: siteConfig.title },
        { name: 'author', content: siteConfig.name },
        { name: 'keywords', content: siteConfig.keywords.join(', ') },
        { name: 'description', content: siteConfig.description },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#000000' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteConfig.url },
        { property: 'og:site_name', content: siteConfig.name },
        { property: 'og:title', content: siteConfig.title },
        { property: 'og:description', content: siteConfig.description },
        { property: 'og:image', content: siteConfig.og },
        { property: 'og:locale', content: 'en_US' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: siteConfig.twitterHandle },
        { name: 'twitter:creator', content: siteConfig.twitterHandle },
        { name: 'twitter:title', content: siteConfig.title },
        { name: 'twitter:description', content: siteConfig.description },
        { name: 'twitter:image', content: siteConfig.og },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: siteConfig.url },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    }),

    shellComponent: RootDocument,
  },
)

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <AnalyticsProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Header />
              {children}
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </AnalyticsProvider>
        <Scripts />
      </body>
    </html>
  )
}
