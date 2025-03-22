import { Base64 } from 'js-base64'

export interface StrencoderOptions {
  chars: string[]
  prefix?: string
}

const bytesNumbers = [2, 4, 16, 256]
// const bytesNumbers = [2, 4, 8, 16, 32, 64, 128, 256]

export class Strencoder {
  // 編碼後的字元集合
  #chars: string[]
  // 編碼後的前綴
  #prefix: string
  // 編碼後的每個字元的位元數
  encodedBytesCount: number
  // 每組8bit的字元數
  #totalByteLength: number

  constructor(options: StrencoderOptions) {
    if (!bytesNumbers.includes(options.chars.length)) {
      throw new Error(`chars 長度必須是 ${bytesNumbers.join('、')} 中的一個`)
    }
    if (options.chars.length < 2 || options.chars.length > 256) {
      throw new Error('chars 長度必須介於 2 到 256 之間')
    }

    this.#chars = options.chars
    this.#prefix = options.prefix || ''
    this.encodedBytesCount = Math.log2(this.#chars.length)
    this.#totalByteLength = 8 / this.encodedBytesCount
  }

  encode(input: string): string {
    const buffer = Base64.toUint8Array(Base64.encode(input))

    let encoded = ''

    for (const byte of buffer) {
      const binary = byte.toString(2).padStart(8, '0')
      const binarySegments: string[] = Array.from({ length: this.#totalByteLength })
        .map((_, i) =>
          binary.slice(
            i * this.encodedBytesCount,
            (i + 1) * this.encodedBytesCount
          )
        )

      encoded += binarySegments
        .map(segment => this.#chars[parseInt(segment, 2)])
        .join('')
    }

    encoded = this.#prefix + encoded

    return encoded
  }

  decode(input: string): string {
    let cleanInput = input.slice(this.#prefix.length)

    const bytes: number[] = []

    for (let i = 0; i < cleanInput.length; i += this.#totalByteLength) {
      let binary = ''

      for (let j = 0; j < this.#totalByteLength; j++) {
        const char = cleanInput[i + j]
        const index = this.#chars.indexOf(char)
        binary += index.toString(2).padStart(this.encodedBytesCount, '0')
      }

      const charCode = parseInt(binary, 2)

      bytes.push(charCode)
    }

    const buffer = new Uint8Array(bytes)
    const decoded = Base64.decode(Base64.fromUint8Array(buffer))

    return decoded
  }
}
