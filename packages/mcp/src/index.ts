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
  const action = actionType === 'encode' ? '編碼' : '解碼'

  server.tool(
    actionType,
    `${action}字串`,
    {
      input: z.string().describe(`要${action}的字串`),
      chars: z.string().min(2).max(256).describe(`用於定義${action}時可用的字元集合`),
      prefix: z.string().describe('增加在編碼字串前的前綴'),
      suffix: z.string().describe('增加在編碼字串後的後綴'),
      encrypt: z.boolean().default(true).describe('是否啟用加密功能'),
      key: z.string().default('strencoderkit').describe('加密金鑰，預設為 "strencoderkit"'),
      compress: z.boolean().default(true).describe('是否啟用壓縮功能'),
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
              text: `${action}結果: ${result}`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `${action}失敗`,
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
