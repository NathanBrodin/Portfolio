import contentCollections from '@content-collections/vite'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { createRequire } from 'node:module'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite-plus'

const takumiServerEntry = createRequire(import.meta.url).resolve('takumi-pdf/next')

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
      {
        files: ['src/routes/**/og/**'],
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
  plugins: [
    contentCollections({ environment: 'client' }),
    devtools(),
    nitro({
      moduleSideEffects: [takumiServerEntry],
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
