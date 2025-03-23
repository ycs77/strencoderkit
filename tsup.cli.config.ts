import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'cli': 'src/cli.ts',
  },
  minify: true,
  format: ['esm'],
  noExternal: ['unishox2.siara.cc'],
})
