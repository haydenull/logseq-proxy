import type { Options } from 'tsup'

const config: Options = {
  entry: ['src/index.ts'],
  dts: true,
  // sourcemap: true,
  format: ['esm'],
}

export default config
