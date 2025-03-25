import cac from 'cac'
import { resolveOptions } from './options'
import { executeAction } from './action'
import { version } from '../../package.json'

const cli = cac('strencoderkit')

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
