import yargs from 'yargs-parser'
import { intro, log, outro, select, text } from '@clack/prompts'
import c from 'picocolors'
import { Strencoder } from './strencoder'

async function cli() {
  const flags = yargs(process.argv.slice(2))
  const actionTypeOption = String(flags._[0] || '').toLowerCase()
  const messageOption = String(flags._[1] || '')

  const isPlain = flags.plain && ['encode', 'decode'].includes(actionTypeOption) && messageOption

  if (!isPlain) {
    intro('StrEncoderKit')
  }

  let actionType = actionTypeOption
  if (!['encode', 'decode'].includes(actionType)) {
    actionType = await select({
      message: '執行操作',
      options: [
        { value: 'encode', label: '加密' },
        { value: 'decode', label: '解密' },
      ],
    }) as 'encode' | 'decode'
  }

  let message = messageOption
  if (!message) {
    const typedMessage = await text({
      message: `請輸入需要${actionType === 'encode' ? '加密' : '解密'}的文字`,
      validate(value) {
        if (value.length === 0) return '輸入框不能為空';
      },
    })
    if (typeof typedMessage !== 'string') return
    message = typedMessage
  }

  const encoder = new Strencoder({
    chars: ['日', '月', '火', '水', '木', '金', '土'],
    encrypt: flags.encrypt ?? true,
    compress: flags.compress ?? true,
  })

  if (actionType === 'encode') {
    // encode
    const result = await encoder.encode(message)

    if (isPlain) {
      console.log(result)
    } else {
      outro(`加密文字: ${result}`)
    }
  } else {
    // decode
    try {
      const result = await encoder.decode(message)

      if (isPlain) {
        console.log(result)
      } else {
        outro(`解密文字: ${result}`)
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('無效的字元: ')) {
        if (isPlain) {
          console.error(c.red('解密失敗! @@'))
        } else {
          log.error('解密失敗! @@')
        }
      } else {
        console.error(error)
      }
    }
  }
}

cli()
