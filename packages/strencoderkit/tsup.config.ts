import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    strencoderkit: 'src/index.ts',
  },
  dts: true,
  minify: true,
  format: ['esm'],
  noExternal: ['unishox2.siara.cc'],
})
