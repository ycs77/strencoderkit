import path from 'node:path'
import fs from 'node:fs'
import { defineConfig } from 'tsdown'
import { version } from './package.json'

const banner = `/*!\n * StrEncoderKit v${version}\n * (c) 2025-present Lucas Yang\n * @license GPL-3.0\n */`

export default defineConfig({
  entry: {
    strencoderkit: 'src/index.ts',
  },
  minify: true,
  clean: false,
  format: ['cjs', 'esm'],
  external: ['unishox2.siara.cc'],
  async onSuccess() {
    // Add banner comment to the top of the file
    const files = ['strencoderkit.cjs', 'strencoderkit.js']
    for (const file of files) {
      const filePath = path.resolve(__dirname, 'dist', file)
      let code = fs.readFileSync(filePath, 'utf-8')
      code = banner + '\n' + code
      fs.writeFileSync(filePath, code)
    }

    // Copy unishox2.js to dist folder
    fs.copyFileSync(
      path.resolve(__dirname, '../../node_modules/unishox2.siara.cc/unishox2.js'),
      path.resolve(__dirname, 'dist/unishox2.cjs')
    )
    let unishox2Code = fs.readFileSync(path.resolve(__dirname, 'dist/unishox2.cjs'), 'utf-8')
    unishox2Code = unishox2Code.replace(/^\/\*/, '/*!')
    unishox2Code = unishox2Code.replace(' */', ' */\n\n/*\n * This file contains modified code from Unishox2.\n * Changes made:\n * - Commented all console.log statements\n */')
    unishox2Code = unishox2Code.replaceAll('  console.log(', '  //console.log(')
    fs.writeFileSync(path.resolve(__dirname, 'dist/unishox2.cjs'), unishox2Code)

    // Replace the import unishox2 path in esmodule
    let code = fs.readFileSync(path.resolve(__dirname, 'dist/strencoderkit.js'), 'utf-8')
    code = code.replace('"unishox2.siara.cc"', '"./unishox2.cjs"')
    fs.writeFileSync(path.resolve(__dirname, 'dist/strencoderkit.js'), code)

    // Replace the import unishox2 path in commonjs
    code = fs.readFileSync(path.resolve(__dirname, 'dist/strencoderkit.cjs'), 'utf-8')
    code = code.replace('"unishox2.siara.cc"', '"./unishox2.cjs"')
    fs.writeFileSync(path.resolve(__dirname, 'dist/strencoderkit.cjs'), code)
  },
})
