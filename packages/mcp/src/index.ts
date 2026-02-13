import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { Strencoder } from 'strencoderkit'
import * as z from 'zod'

const server = new McpServer({
  name: 'strencoderkit',
  version: '0.6.0',
})

server.registerTool(
  'encode_string',
  {
    title: 'String Encoder',
    description: 'Encodes a string using a specified character set and optional encryption key.',
    inputSchema: {
      input: z.string().describe('The string to encode'),
      chars: z.string().min(2).max(256).describe('Character set available for encode'),
      key: z.string().optional().describe('Encryption key'),
    },
  },
  async ({ input, chars, key }) => {
    const strencoder = new Strencoder({
      chars: chars.split(''),
    })

    try {
      const result = await strencoder.encode(input, key)
      return {
        content: [{ type: 'text', text: result }],
      }
    } catch (error) {
      return {
        content: [{ type: 'text', text: `String encode failed: ${error.message}` }],
        isError: true,
      }
    }
  },
)
server.registerTool(
  'decode_string',
  {
    title: 'String Decoder',
    description: 'Decodes a string using a specified character set and optional encryption key.',
    inputSchema: {
      input: z.string().describe('The string to decode'),
      chars: z.string().min(2).max(256).describe('Character set available for decode'),
      key: z.string().optional().describe('Encryption key'),
    },
  },
  async ({ input, chars, key }) => {
    const strencoder = new Strencoder({
      chars: chars.split(''),
    })

    try {
      const result = await strencoder.decode(input, key)
      return {
        content: [{ type: 'text', text: result }],
      }
    } catch (error) {
      return {
        content: [{ type: 'text', text: `String decode failed: ${error.message}` }],
        isError: true,
      }
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('StrEncoderKit MCP Server running on stdio')
}

main().catch(error => {
  console.error('Fatal error running server:', error)
  process.exit(1)
})
