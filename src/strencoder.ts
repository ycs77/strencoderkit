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
    let encoded = ''

    for (let i = 0; i < input.length; i++) {
      const char = input[i]
      const index = char.charCodeAt(0)
      const binary = index.toString(2).padStart(8, '0')
      const encodedChar = binary
        .split('')
        .map((bit) => this.#chars[parseInt(bit, 10)])
        .join('')
      encoded += encodedChar
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
