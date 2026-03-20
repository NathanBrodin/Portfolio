import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'http://localhost:3001/',
  scanner: {
    samples: 3,
    throttle: true,
  },
})
