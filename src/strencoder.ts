import { Base64 } from 'js-base64'

export interface StrencoderOptions {
  chars: string[]
  prefix?: string
}

export class Strencoder {
  // 編碼後的字元集合
  #chars: string[]
  // 編碼後的前綴
  #prefix: string
  // 編碼後的每個字元的位元數
  encodedBytesCount: number

  constructor(options: StrencoderOptions) {
    if (options.chars.length < 2 || options.chars.length > 256) {
      throw new Error('chars 長度必須介於 2 到 256 之間')
    }
    if (Math.log2(options.chars.length) % 1 !== 0) {
      throw new Error(`chars 長度必須是 2 的冪次方`)
    }

    this.#chars = options.chars
    this.#prefix = options.prefix || ''
    this.encodedBytesCount = Math.log2(this.#chars.length)
  }

  encode(input: string): string {
    const buffer = Base64.toUint8Array(Base64.encode(input))

    let binary = ''
    for (const byte of buffer) {
      binary += byte.toString(2).padStart(8, '0')
    }

    const binarySegments: string[] = Array.from({
      length: Math.ceil(binary.length / this.encodedBytesCount),
    }).map((_, i) =>
      binary.slice(
        i * this.encodedBytesCount,
        (i + 1) * this.encodedBytesCount
      )
    )

    let encoded = binarySegments
      .map(segment => this.#chars[parseInt(segment, 2)])
      .join('')

    encoded = this.#prefix + encoded

    return encoded
  }

  decode(input: string): string {
    let cleanInput = input.slice(this.#prefix.length)

    let binary = ''
    for (let i = 0; i < cleanInput.length; i ++) {
      const index = this.#chars.indexOf(cleanInput[i])
      binary += index.toString(2).padStart(this.encodedBytesCount, '0')
    }

    const binarySegments: string[] = Array.from({ length: binary.length / 8 })
      .map((_, i) => binary.slice(i * 8, (i + 1) * 8))

    const bytes = binarySegments.map(segment => parseInt(segment, 2))

    const buffer = new Uint8Array(bytes)
    const decoded = Base64.decode(Base64.fromUint8Array(buffer))

    return decoded
  }
}
