import fs from 'node:fs'
import path from 'node:path'

import puppeteer from 'puppeteer'

const OG_URL = 'http://localhost:3000/og'
const OUTPUT_DIR = path.resolve(import.meta.dirname, '../public')
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'og.png')
const MAX_FILE_SIZE = 8 * 1024 * 1024 // 8MB

async function generateOg() {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()

    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
    await page.goto(OG_URL, { waitUntil: 'networkidle0' })
    const og = await page.$('#og')
    if (!og) {
      throw new Error('OG element (#og) not found on the page')
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    await og.screenshot({ path: OUTPUT_PATH, type: 'png' })
    const stats = fs.statSync(OUTPUT_PATH)
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
    if (stats.size > MAX_FILE_SIZE) {
      throw new Error(`OG file size (${fileSizeMB}MB) exceeds 8MB limit`)
    }
    console.log(`OG image saved to ${OUTPUT_PATH} (${fileSizeMB}MB)`)
  } finally {
    await browser.close()
  }
}
generateOg().catch((error) => {
  console.error('Failed to generate og image:', error)
  process.exit(1)
})
