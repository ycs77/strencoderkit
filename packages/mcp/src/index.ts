import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { Strencoder } from 'strencoderkit'

const server = new McpServer({
  name: 'strencoderkit',
  version: '0.2.0',
  capabilities: {
    resources: {},
    tools: {},
  },
})

for (const actionType of ['encode', 'decode'] as const) {
  server.tool(
    `${actionType}_string`,
    `${actionType[0].toUpperCase()}${actionType.slice(1)}s a string`,
    {
      input: z.string().describe(`The string to ${actionType}`),
      chars: z.string().min(2).max(256).describe(`Character set available for ${actionType}`),
      prefix: z.string().describe('Prefix for the encoded string'),
      suffix: z.string().describe('Suffix for the encoded string'),
      encrypt: z.boolean().default(true).describe('Whether to enable encryption'),
      key: z.string().default('strencoderkit').describe('Encryption key, default is "strencoderkit"'),
      compress: z.boolean().default(true).describe('Whether to enable compression'),
    },
    async ({ input, chars, prefix, suffix, encrypt, key, compress }) => {
      const strencoder = new Strencoder({
        chars: chars.split(','),
        prefix,
        suffix,
        encrypt,
        compress,
      })

      try {
        const result = actionType === 'encode'
          ? await strencoder.encode(input, key || undefined)
          : await strencoder.decode(input, key || undefined)

        return {
          content: [
            {
              type: 'text',
              text: `${actionType} result: ${result}`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `${actionType} failed`,
            },
          ],
        }
      }
    },
  )
}

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('StrEncoderKit MCP Server running on stdio')
}

main().catch(error => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
