import yargs from 'yargs-parser'
import { intro, log, outro, select, text } from '@clack/prompts'
import { Strencoder } from './strencoder'

async function cli() {
  const flags = yargs(process.argv.slice(2))
  const encoder = new Strencoder({
    chars: ['日', '月', '火', '水', '木', '金', '土'],
  })

  intro('StrEncoderKit')

  const actionType = await select({
    message: '執行操作',
    options: [
      { value: 'encode', label: '加密' },
      { value: 'decode', label: '解密' },
    ],
  })

  if (actionType === 'encode') {
    // encode
    const message = await text({
      message: '請輸入需要加密的文字',
      validate(value) {
        if (value.length === 0) return '輸入框不能為空';
      },
    })
    if (typeof message !== 'string') return

    const result = await encoder.encode(String(message))

    outro(`加密文字: ${result}`)
  } else {
    // decode
    const message = await text({
      message: '請輸入需要解密的文字',
      validate(value) {
        if (value.length === 0) return '輸入框不能為空';
      },
    })
    if (typeof message !== 'string') return

    try {
      const result = await encoder.decode(String(message))

      outro(`解密文字: ${result}`)
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('無效的字元: ')) {
        log.error('解密失敗! @@')
      } else {
        console.error(error)
      }
    }
  }
}

cli()
