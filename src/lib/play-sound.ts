import type { SoundAsset } from '@/lib/sound-types'

import { haptic } from './haptic'

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

const bufferCache = new Map<string, AudioBuffer>()

async function decodeAudioData(dataUri: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(dataUri)
  if (cached) return cached

  const ctx = getAudioContext()
  const base64 = dataUri.split(',')[1]
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const audioBuffer = await ctx.decodeAudioData(bytes.buffer.slice(0))
  bufferCache.set(dataUri, audioBuffer)
  return audioBuffer
}

/**
 * Fire-and-forget sound playback without React hooks or effects.
 * Lazily decodes the audio buffer on first call, then uses the cached buffer.
 * This avoids per-component useEffect overhead for every Button instance.
 */
export function playSound(sound: SoundAsset, volume = 0.02): void {
  const ctx = getAudioContext()

  if (ctx.state === 'suspended') {
    ctx.resume()
  }

  decodeAudioData(sound.dataUri).then((buffer) => {
    const source = ctx.createBufferSource()
    const gain = ctx.createGain()

    source.buffer = buffer
    gain.gain.value = volume

    source.connect(gain)
    gain.connect(ctx.destination)
    source.start(0)
  })

  haptic()
}
