import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow'
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow'
import { Strencoder } from 'strencoderkit'

export class StrEncoderKit implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'StrEncoderKit',
    name: 'strencoderkit',
    group: ['transform'],
    version: 1,
    description: '使用 StrEncoderKit 來編碼和解碼字串',
    defaults: {
      name: 'String Encoder Node',
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
        description: '增加在編碼字串前的前綴',
      },
      {
        displayName: '字串後綴',
        name: 'suffix',
        type: 'string',
        default: '',
        description: '增加在編碼字串後的後綴',
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
      {
        displayName: '拋出錯誤',
        name: 'throwError',
        type: 'boolean',
        default: false,
        description: '是否拋出錯誤',
        displayOptions: {
          show: {
            actionType: [
              'decode',
            ],
          },
        },
      },
    ],
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData()

    for (let i = 0; i < items.length; i++) {
      const input = this.getNodeParameter('input', i, '') as string
      const actionType = this.getNodeParameter('actionType', i, 'encode') as 'encode' | 'decode'
      const chars = this.getNodeParameter('chars', i, '日月火水木金土') as string
      const prefix = this.getNodeParameter('prefix', i, '') as string
      const suffix = this.getNodeParameter('suffix', i, '') as string
      const encrypt = this.getNodeParameter('encrypt', i, true) as boolean
      const key = this.getNodeParameter('key', i, '') as string
      const compress = this.getNodeParameter('compress', i, true) as boolean
      const throwError = this.getNodeParameter('throwError', i, false) as boolean

      try {
        const strencoder = new Strencoder({
          chars: chars.split(''),
          prefix,
          suffix,
          encrypt,
          compress,
        })

        const result = actionType === 'encode'
          ? await strencoder.encode(input, key || undefined)
          : throwError
            ? await strencoder.decode(input, key || undefined)
            : await strencoder.decodeSilent(input, key || undefined)

        items.push({ json: { result } })
      } catch (error) {
        // Adding `itemIndex` allows other workflows to handle this error
        if (error.context) {
          // If the error thrown already contains the context property,
          // only append the itemIndex
          error.context.itemIndex = i
          throw error
        }

        throw new NodeOperationError(this.getNode(), error, {
          itemIndex: i,
        })
      }
    }

    return [items]
  }
}
