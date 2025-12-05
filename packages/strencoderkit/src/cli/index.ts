import cac from 'cac'
import { version } from '../../package.json'
import { executeAction } from './action'
import { resolveOptions } from './options'

const cli = cac('strencoderkit')

cli.option('--chars <chars>', '自定義字元集', { default: '日月火水木金土' })
cli.option('--charfile <file>', '字元集檔案')
cli.option('--prefix <prefix>', '編碼前綴')
cli.option('--suffix <suffix>', '編碼後綴')
cli.option('--encrypt', '加密', { default: true })
cli.option('--key <key>', '密碼')
cli.option('--compress', '壓縮', { default: true })
cli.option('--plain', '純文字輸出', { default: false })
cli.option('--debug', 'Debug 模式', { default: false })

cli.command('')
  .action(async userOptions => {
    executeAction(resolveOptions(userOptions))
  })

cli.command('encode [message]', '編碼文字')
  .action(async (message: string | undefined, userOptions) => {
    const options = resolveOptions(userOptions)
    options.actionType = 'encode'
    options.message = message
    executeAction(options)
  })

cli.command('decode [message]', '解碼文字')
  .action(async (message: string | undefined, userOptions) => {
    const options = resolveOptions(userOptions)
    options.actionType = 'decode'
    options.message = message
    executeAction(options)
  })

cli.version(version)
cli.help()

cli.parse()
