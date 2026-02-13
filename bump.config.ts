import { defineConfig, ProgressEvent } from 'bumpp'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  async execute(operation) {
    const packageJson = JSON.parse(readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf-8'))

    const filePath = resolve(import.meta.dirname, 'packages/mcp/src/index.ts')
    const code = readFileSync(filePath, 'utf-8')
    const newCode = code.replace(/version: '(\d+\.\d+\.\d+)'/, `version: '${packageJson.version}'`)
    writeFileSync(filePath, newCode, 'utf-8')

    operation.update({
      event: ProgressEvent.FileUpdated,
      updatedFiles: operation.state.updatedFiles.concat(filePath),
    })
  },
})
