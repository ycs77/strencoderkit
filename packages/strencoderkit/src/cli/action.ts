import { intro, log, outro, select, text } from '@clack/prompts'
import c from 'picocolors'
import { Strencoder } from '../strencoder'
import type { Options } from './options'

export async function executeAction(userOptions: Partial<Options>) {
  const options = { ...userOptions }

  options.plain = options.plain
    && ['encode', 'decode'].includes(options.actionType || '')
    && !!options.message

  if (!options.plain) {
    intro('StrEncoderKit')
  }

  if (!['encode', 'decode'].includes(options.actionType || '')) {
    const selected = await select({
      message: '執行操作',
      options: [
        { value: 'encode', label: '加密' },
        { value: 'decode', label: '解密' },
      ],
    }) as 'encode' | 'decode'
    if (typeof selected !== 'string') return
    options.actionType = selected
  }

  if (!options.message) {
    const typedText = await text({
      message: `請輸入需要${options.actionType === 'encode' ? '加密' : '解密'}的文字`,
      validate(value) {
        if (value.length === 0) return '輸入框不能為空';
      },
    })
    if (typeof typedText !== 'string') return
    options.message = typedText
  }

  const resolvedOptions = options as Options

  const encoder = new Strencoder({
    chars: ['日', '月', '火', '水', '木', '金', '土'],
    encrypt: resolvedOptions.encrypt,
    compress: resolvedOptions.compress,
  })

  if (resolvedOptions.actionType === 'encode') {
    // encode
    const result = await encoder.encode(resolvedOptions.message)

    if (resolvedOptions.plain) {
      console.log(result)
    } else {
      outro(`加密文字: ${result}`)
    }
  } else {
    // decode
    try {
      const result = await encoder.decode(resolvedOptions.message)

      if (resolvedOptions.plain) {
        console.log(result)
      } else {
        outro(`解密文字: ${result}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        // validation error
        if (error.message.startsWith('無效的字元: ')) {
          if (resolvedOptions.plain) {
            console.error(c.red(error.message))
          } else {
            log.error(error.message)
          }
          return
        }

        // handle error
        if (resolvedOptions.debug) {
          console.error(error)
          return
        }

        // show decode error message
        if (resolvedOptions.plain) {
          console.error(c.red('解密失敗! @@'))
        } else {
          log.error('解密失敗! @@')
        }
      }
    }
  }
}
