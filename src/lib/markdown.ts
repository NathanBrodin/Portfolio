import rehypeShiki from '@shikijs/rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

type MarkdownHeading = {
  id: string
  text: string
  level: number
}

type MarkdownResult = {
  markup: string
  headings: Array<MarkdownHeading>
}

// Only these languages are loaded into Shiki. Loading all 332 bundled
// languages costs ~5s cold start and ~95ms per render; pinning the ones
// actually used in content/* brings that to ~150ms cold and ~3ms warm.
// If a code fence uses another language, `fallbackLanguage: 'text'`
// renders it unhighlighted instead of failing.
const SHIKI_LANGS = [
  'tsx',
  'ts',
  'typescript',
  'javascript',
  'js',
  'yaml',
  'yml',
  'python',
  'py',
  'makefile',
  'bash',
  'sh',
  'json',
  'markdown',
  'diff',
] as const

const HAS_CODE_FENCE = /```/

function createProcessor(withHighlighting: boolean) {
  const processor = unified()
    .use(remarkParse) // Parse markdown
    .use(remarkGfm) // Support GitHub Flavored Markdown
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
    .use(rehypeRaw) // Process raw HTML in markdown
  if (withHighlighting) {
    processor.use(rehypeShiki, {
      themes: {
        light: 'min-light',
        dark: 'min-dark',
      },
      langs: [...SHIKI_LANGS],
      defaultColor: false,
      fallbackLanguage: 'text',
    })
  }
  return processor
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['anchor'] },
    })
    .use(rehypeStringify) // Serialize to HTML string
}

// Shared across all renders: building the pipeline and (especially) the
// Shiki highlighter once instead of per document is the bulk of the win.
// Only content with code fences pays for highlighting.
const plainProcessor = createProcessor(false)
const codeProcessor = createProcessor(true)

export async function renderMarkdown(content: string): Promise<MarkdownResult> {
  const headings: Array<MarkdownHeading> = []

  if (!content.trim()) {
    return { markup: '', headings }
  }

  const processor = HAS_CODE_FENCE.test(content) ? codeProcessor : plainProcessor
  const result = await processor.process(content)

  return {
    markup: String(result),
    headings,
  }
}
