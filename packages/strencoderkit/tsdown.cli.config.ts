import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    cli: 'src/cli/index.ts',
  },
  dts: false,
  clean: false,
  external: ['unishox2.siara.cc'],
  async onSuccess() {
    // Replace the import unishox2 path
    let code = fs.readFileSync(path.resolve(__dirname, 'dist/cli.mjs'), 'utf-8')
    code = code.replace('"unishox2.siara.cc"', '"./unishox2.cjs"')
    fs.writeFileSync(path.resolve(__dirname, 'dist/cli.mjs'), code)
  },
})
