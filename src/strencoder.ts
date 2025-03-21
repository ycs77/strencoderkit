import { Base64 } from 'js-base64'

export interface StrencoderOptions {
  chars: string[]
  prefix?: string
}

export class Strencoder {
  #chars: string[]
  #prefix: string

  constructor(options: StrencoderOptions) {
    if (options.chars.length !== 2) {
      throw new Error('chars must be an array with 2 elements')
    }

    this.#chars = options.chars
    this.#prefix = options.prefix || ''
  }

  encode(input: string): string {
    const buffer = Base64.toUint8Array(Base64.encode(input))

    let encoded = ''

    for (const byte of buffer) {
      const binary = byte.toString(2).padStart(8, '0')
      const encodedByte = binary
        .split('')
        .map(bit => this.#chars[parseInt(bit, 10)])
        .join('')
      encoded += encodedByte
    }

    return this.#prefix + encoded
  }

  decode(input: string): string {
    let decoded = ''

    for (let i = this.#prefix.length; i < input.length; i += 8) {
      const binary = input
        .slice(i, i + 8)
        .split('')
        .map((char) => {
          return this.#chars.indexOf(char).toString()
        })
        .join('')

      const charCode = parseInt(binary, 2)
      decoded += String.fromCharCode(charCode)
    }

    return decoded
  }
}
