import type { Graph } from 'schema-dts'

export const siteConfig = {
  title: 'Nathan Brodin | Frontend Engineer',
  name: 'Nathan Brodin',
  description:
    'A frontend engineer with a passion for web development, design, and user experience.',
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
      jobTitle: 'Frontend Engineer',
      description:
        'A frontend engineer with a passion for web development, design, and user experience.',
      sameAs: [
        'https://github.com/NathanBrodin',
        'https://linkedin.com/in/nathan-brodin',
        'https://twitter.com/nathan_brodin',
        'https://medium.com/@nathan-brodin',
        'https://dev.to/nathan-brodin',
        'https://peerlist.io/brodin',
        'https://www.figma.com/@nathanbrodin',
      ],
      knowsAbout: ['TypeScript', 'React', 'Next.js', 'TanStack', 'Tailwind CSS'],
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
      name: 'Nathan Brodin | Frontend Engineer',
      url: 'https://brodin.dev',
      description:
        'A frontend engineer with a passion for web development, design, and user experience.',
      inLanguage: 'en-US',
      author: {
        '@id': 'https://brodin.dev/#person',
      },
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://brodin.dev/#profilepage',
      name: 'Nathan Brodin | Frontend Engineer',
      url: 'https://brodin.dev',
      description:
        'A frontend engineer with a passion for web development, design, and user experience.',
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
