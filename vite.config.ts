import contentCollections from '@content-collections/vite'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite-plus'

const markdownAccept = {
  type: 'header',
  key: 'accept',
  value: { re: '(?i)text/markdown' },
}

// Run before Vercel's filesystem handler so these routes override prerendered HTML.
const vercelRoutes = [
  {
    src: '^/(?:$|blog(?:/.*)?$)',
    headers: { Vary: 'Accept' },
    continue: true,
  },
  {
    src: '^/$',
    has: [markdownAccept],
    dest: '/llms.md',
  },
  {
    src: '^/blog/?$',
    has: [markdownAccept],
    dest: '/blog.md',
  },
  {
    src: '^/blog/(?!rss$)(?!.*\\.(?:md|html)$)([^/]+)$',
    has: [markdownAccept],
    dest: '/blog/$1.md',
  },
]

const config = defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    jsPlugins: ['@shadcn/lint'],
    options: { typeAware: true, typeCheck: true },
    plugins: ['react', 'typescript'],
    rules: {
      'no-floating-promises': 'off',
      'shadcn/no-unknown-classes': 'warn',
      'shadcn/no-restyle': [
        'warn',
        {
          allow: ['layout'],
          contracts: [
            { pattern: '^Section$', allow: ['layout', 'spacing'] },
            { pattern: '^Prose$', allow: ['layout', 'spacing'] },
            { pattern: '^Skeleton$', allow: ['layout', 'shape'] },
            { pattern: '^CollapsibleTrigger$', allow: ['layout', 'spacing'] },
          ],
        },
      ],
    },
    overrides: [
      {
        files: ['src/components/ui/**'],
        rules: { 'shadcn/no-restyle': 'off' },
      },
    ],
  },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    sortTailwindcss: {
      stylesheet: './src/styles.css',
      function: ['clsx', 'cn'],
      preserveWhitespace: true,
    },
    sortImports: {
      groups: [
        'type-import',
        ['value-builtin', 'value-external'],
        'type-internal',
        'value-internal',
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown',
      ],
    },
    ignorePatterns: ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'src/routeTree.gen.ts'],
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Inline tiny processed assets (only src-imported files are affected).
    assetsInlineLimit: 6144,
  },
  plugins: [
    contentCollections({ environment: 'client' }),
    devtools(),
    nitro({
      vercel: { config: { version: 3, routes: vercelRoutes } },
      rolldownConfig: {
        onwarn(warning, warn) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            (warning.message.includes('use client') || warning.message.includes('use server'))
          ) {
            return
          }
          warn(warning)
        },
      },
      rollupConfig: {
        onwarn(warning, warn) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            (warning.message.includes('use client') || warning.message.includes('use server'))
          ) {
            return
          }
          warn(warning)
        },
      },
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        filter: ({ path }) => !path.includes('#') && !path.startsWith('/resume'),
      },
    }),
    viteReact({ compiler: true }),
  ],
  optimizeDeps: {
    // Pre-bundle barrel-heavy libraries to improve dev server startup time
    include: ['lucide-react'],
  },
})

export default config
