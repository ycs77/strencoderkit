import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    cli: 'src/cli/index.ts',
  },
  format: ['esm'],
  external: ['unishox2.siara.cc'],
  async onSuccess() {
    // Replace the import unishox2 path
    let code = fs.readFileSync(path.resolve(__dirname, 'dist/cli.js'), 'utf-8')
    code = code.replace('"unishox2.siara.cc"', '"./unishox2.cjs"')
    fs.writeFileSync(path.resolve(__dirname, 'dist/cli.js'), code)
  },
})
