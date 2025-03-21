import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'strencoderkit': 'src/index.ts',
  },
  dts: true,
  minify: true,
  format: ['cjs', 'esm'],
  outExtension(ctx) {
    if (ctx.format === 'cjs')
      return { 'js': '.cjs' }
    return { 'js': '.mjs' }
  },
})
