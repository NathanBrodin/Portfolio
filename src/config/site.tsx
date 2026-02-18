import type { Graph } from 'schema-dts'

export const siteConfig = {
  title: 'Nathan Brodin | Portfolio',
  name: 'Nathan Brodin',
  description:
    'Frontend Engineer crafting modern web experiences. Explore my projects, skills, and journey in web development.',
  url: 'https://brodin.dev',
  og: 'https://brodin.dev/og.png',
  authorUrl: 'https://brodin.dev',
  twitterHandle: '@nathan_brodin',
  githubHandle: 'NathanBrodin',
  keywords: [
    'Nathan Brodin',
    'Frontend Engineer',
    'portfolio',
    'tech career',
    'web development',
    'developer insights',
    'career information',
    'project showcase',
  ],
}

export const siteJsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://brodin.dev/#person',
      name: 'Nathan Brodin',
      url: 'https://brodin.dev',
      image: 'https://brodin.dev/og.png',
      jobTitle: 'Software Engineer',
      description:
        'Frontend Engineer crafting modern web experiences. Explore my projects, skills, and journey in web development.',
      sameAs: [
        'https://github.com/NathanBrodin',
        'https://linkedin.com/in/nathan-brodin',
        'https://twitter.com/nathan_brodin',
      ],
      knowsAbout: [
        'TypeScript',
        'React',
        'Next.js',
        'TanStack',
        'Tailwind CSS',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'ESIEA Graduate School of Engineering',
        sameAs: 'https://www.esiea.fr/',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Capia AS',
        sameAs: 'https://capia.no/',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tromso',
        addressCountry: 'NO',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://brodin.dev/#website',
      name: 'Nathan Brodin | Portfolio',
      url: 'https://brodin.dev',
      description:
        'Frontend Engineer crafting modern web experiences. Explore my projects, skills, and journey in web development.',
      inLanguage: 'en-US',
      author: {
        '@id': 'https://brodin.dev/#person',
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://brodin.dev/#profilepage',
      name: 'Nathan Brodin | Portfolio',
      url: 'https://brodin.dev',
      description:
        'Frontend Engineer crafting modern web experiences. Explore my projects, skills, and journey in web development.',
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://brodin.dev/#website',
      },
      mainEntity: {
        '@id': 'https://brodin.dev/#person',
      },
      about: {
        '@id': 'https://brodin.dev/#person',
      },
    },
  ],
}

export type SiteConfig = typeof siteConfig
