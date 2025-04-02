import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow'
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow'
import { Strencoder } from 'strencoderkit'

export class StrEncoderKitNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'StrEncoderKit Node',
    name: 'strencoderkitNode',
    group: ['transform'],
    version: 1,
    description: 'StrEncoderKit 的 n8n 自訂 Node',
    defaults: {
      name: 'Example Node',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    properties: [
      {
        displayName: '輸入字串',
        name: 'input',
        type: 'string',
        default: '',
        description: '要編碼或解碼的字串',
      },
      {
        displayName: '編碼/解碼',
        name: 'actionType',
        type: 'options',
        options: [
          {
            name: '編碼',
            value: 'encode',
          },
          {
            name: '解碼',
            value: 'decode',
          },
        ],
        default: 'encode',
        description: '選擇要執行的操作',
      },
      {
        displayName: '字元集合',
        name: 'chars',
        type: 'string',
        default: '日月火水木金土',
        description: '用於定義編碼時可用的字元集合',
      },
      {
        displayName: '字串前綴',
        name: 'prefix',
        type: 'string',
        default: '',
        description: '會加在編碼結果的開頭',
      },
      {
        displayName: '加密',
        name: 'encrypt',
        type: 'boolean',
        default: true,
        description: '是否啟用加密功能',
      },
      {
        displayName: '加密金鑰',
        name: 'key',
        type: 'string',
        default: '',
        description: '加密金鑰，預設為 "strencoderkit"',
      },
      {
        displayName: '壓縮',
        name: 'compress',
        type: 'boolean',
        default: true,
        description: '是否啟用壓縮功能',
      },
    ],
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const input = this.getNodeParameter('input', 0) as string
    const actionType = this.getNodeParameter('actionType', 0) as 'encode' | 'decode'
    const chars = this.getNodeParameter('chars', 0) as string
    const prefix = this.getNodeParameter('prefix', 0) as string
    const encrypt = this.getNodeParameter('encrypt', 0) as boolean
    const key = this.getNodeParameter('key', 0) as string
    const compress = this.getNodeParameter('compress', 0) as boolean
    const items: INodeExecutionData[] = []

    try {
      const strencoder = new Strencoder({
        chars: chars.split(','),
        prefix,
        encrypt,
        compress,
      })

      if (actionType === 'encode') {
        const result = await strencoder.encode(input, key || undefined)
        items.push({ json: { result } })
      } else if (actionType === 'decode') {
        const result = await strencoder.decode(input, key || undefined)
        items.push({ json: { result } })
      }
    } catch (error) {
      const itemIndex = 0

      // Adding `itemIndex` allows other workflows to handle this error
      if (error.context) {
        // If the error thrown already contains the context property,
        // only append the itemIndex
        error.context.itemIndex = itemIndex
        throw error
      }

      throw new NodeOperationError(this.getNode(), error, {
        itemIndex,
      })
    }

    return [items]
  }
}
