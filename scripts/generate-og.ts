import fs from 'node:fs'
import path from 'node:path'

import puppeteer, { type Browser, type Page } from 'puppeteer'

const BASE_URL = 'http://localhost:3000'
const PUBLIC_DIR = path.resolve(import.meta.dirname, '../public')
const CONTENT_BLOG_DIR = path.resolve(import.meta.dirname, '../content/blog')
const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB

async function captureOg(page: Page, url: string, outputPath: string) {
  await page.goto(url, { waitUntil: 'networkidle0' })
  const og = await page.$('#og')
  if (!og) {
    throw new Error(`OG element (#og) not found at ${url}`)
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  await og.screenshot({ path: outputPath, type: 'png' })

  const stats = fs.statSync(outputPath)
  const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  if (stats.size > MAX_FILE_SIZE) {
    throw new Error(
      `OG file size (${fileSizeMB}MB) exceeds 8MB limit: ${outputPath}`,
    )
  }

  console.log(`  ${outputPath} (${fileSizeMB}MB)`)
}

function getBlogSlugs(): string[] {
  if (!fs.existsSync(CONTENT_BLOG_DIR)) {
    return []
  }

  return fs
    .readdirSync(CONTENT_BLOG_DIR, { recursive: true })
    .filter((file) => String(file).endsWith('.md'))
    .map((file) => String(file).replace(/\.md$/, ''))
}

async function generateOg() {
  const browser: Browser = await puppeteer.launch({ headless: true })
  try {
    const page: Page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })

    // Site-level OG image
    console.log('Generating site OG image...')
    await captureOg(page, `${BASE_URL}/og`, path.join(PUBLIC_DIR, 'og.png'))

    // Blog post OG images
    const slugs = getBlogSlugs()
    if (slugs.length > 0) {
      console.log(`Generating OG images for ${slugs.length} blog post(s)...`)
      for (const slug of slugs) {
        await captureOg(
          page,
          `${BASE_URL}/blog/${slug}/og`,
          path.join(PUBLIC_DIR, 'og', 'blog', `${slug}.png`),
        )
      }
    }

    console.log('Done!')
  } finally {
    await browser.close()
  }
}

generateOg().catch((error) => {
  console.error('Failed to generate og image:', error)
  process.exit(1)
})
