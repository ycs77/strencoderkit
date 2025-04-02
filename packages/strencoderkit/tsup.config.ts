import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    strencoderkit: 'src/index.ts',
  },
  dts: true,
  minify: true,
  format: ['esm'],
  external: ['unishox2.siara.cc'],
  banner: () => ({
    js: `/*!\n * strencoderkit\n * (c) 2025-present Lucas Yang\n * @license GPL-3.0\n */`,
  }),
  async onSuccess() {
    // Copy unishox2.js to dist folder
    fs.copyFileSync(
      path.resolve(__dirname, '../../node_modules/unishox2.siara.cc/unishox2.js'),
      path.resolve(__dirname, 'dist/unishox2.js')
    )
    let unishox2Code = fs.readFileSync(path.resolve(__dirname, 'dist/unishox2.js'), 'utf-8')
    unishox2Code = unishox2Code.replace(/^\/\*/, '/*!')
    unishox2Code = unishox2Code.replace(' */', ' */\n\n/*\n * This file contains modified code from Unishox2.\n * Changes made:\n * - Commented all console.log statements\n */')
    unishox2Code = unishox2Code.replaceAll('  console.log(', '  //console.log(')
    fs.writeFileSync(path.resolve(__dirname, 'dist/unishox2.js'), unishox2Code)

    // Replace the import unishox2 path
    let code = fs.readFileSync(path.resolve(__dirname, 'dist/strencoderkit.js'), 'utf-8')
    code = code.replace('"unishox2.siara.cc"', '"./unishox2.js"')
    fs.writeFileSync(path.resolve(__dirname, 'dist/strencoderkit.js'), code)
  },
})
