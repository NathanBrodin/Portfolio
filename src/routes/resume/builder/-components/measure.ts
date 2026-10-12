let cached: CanvasRenderingContext2D | null = null

function context(): CanvasRenderingContext2D | null {
  if (!cached) cached = document.createElement('canvas').getContext('2d')
  return cached
}

export function ensureMeasureFonts(): Promise<void> {
  return Promise.all([
    document.fonts.load('12px Writer'),
    document.fonts.load('500 12px Writer'),
  ]).then(() => undefined)
}

export function estimateFills(text: string, width: number, prefix = ''): number[] {
  const ctx = context()
  if (!ctx) return [0]
  ctx.font = '12px Writer'
  const space = ctx.measureText(' ').width
  let used = 0
  let hasContent = false
  if (prefix) {
    ctx.font = '500 12px Writer'
    used = ctx.measureText(prefix).width
    ctx.font = '12px Writer'
    hasContent = true
  }
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length === 0) return [used > 0 ? Math.min(used / width, 1) : 0]
  const fills: number[] = []
  for (const word of words) {
    const wordWidth = ctx.measureText(word).width
    const next = used + (hasContent ? space : 0) + wordWidth
    if (hasContent && next > width) {
      fills.push(Math.min(used / width, 1))
      used = wordWidth
    } else {
      used = next
    }
    hasContent = true
  }
  fills.push(Math.min(used / width, 1))
  return fills
}
