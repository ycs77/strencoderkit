import { Base64 } from 'js-base64'
import { encodeBaseConversionByte, decodeBaseConversionByte } from './baseConversionByte'

export interface StrencoderOptions {
  /**
   * 字元陣列，用於定義編碼時可用的字元集合。
   */
  chars: string[]
  /**
   * 字串前綴，會加在編碼結果的開頭。
   */
  prefix?: string
}

export class Strencoder {
  // 編碼後的字元集合
  #chars: string[]
  // 編碼後的前綴
  #prefix: string
  // 編碼後每個 byte 的長度
  #totalByteLength: number

  constructor(options: StrencoderOptions) {
    if (options.chars.length < 2 ** 1 || options.chars.length > 2 ** 8) {
      throw new Error('chars 長度必須介於 2 到 256 之間')
    }

    this.#chars = options.chars
    this.#prefix = options.prefix || ''
    this.#totalByteLength = Math.ceil(Math.log(2 ** 8) / Math.log(this.#chars.length))
  }

  /**
   * 使用提供的字元集合和前綴，將輸入字串編碼為自定義編碼字串。
   */
  encode(input: string): string {
    // 將輸入字串轉換為二進位陣列
    const buffer = Base64.toUint8Array(Base64.encode(input))

    // 將每個 byte 轉換為編碼後的字元索引數字
    const encodedBuffer = Array.from(buffer).flatMap(byte => {
      // 將每個字元轉換為編碼後的字元索引數字，讓每個 byte 最高上限為 #chars 的長度
      const bytesBuffer = encodeBaseConversionByte(byte, this.#chars.length)

      // 將每個 byte 補齊至 #totalByteLength
      const arrBuffer = new ArrayBuffer(this.#totalByteLength)
      const fullBytesBuffer = new Uint8Array(arrBuffer)
      fullBytesBuffer.set(bytesBuffer, this.#totalByteLength - bytesBuffer.length)

      return Array.from(fullBytesBuffer)
    })

    // 將字元索引數字轉換為 #chars 中對應字元
    let encoded = encodedBuffer
      .map(index => this.#chars[index])
      .join('')

    // 加上前綴
    encoded = this.#prefix + encoded

    return encoded
  }

  /**
   * 解碼給定的字串，將其轉換回原始的字串內容。
   */
  decode(input: string): string {
    // 移除前綴
    let baseInput = input.slice(this.#prefix.length)

    // 將每個字元轉換為編碼字元對應的索引數字
    const encodedBuffer = Array.from(baseInput).map(char => {
      const index = this.#chars.indexOf(char)
      if (index === -1) {
        throw new Error(`無效的字元: ${char}`)
      }
      return index
    })

    // 將每個字元索引數字轉換為二進位陣列，陣列元素對應每個 byte
    const buffer = Array.from({ length: Math.ceil(encodedBuffer.length / this.#totalByteLength) })
      .map((_, i) =>
        new Uint8Array(
          encodedBuffer.slice(
            i * this.#totalByteLength,
            (i + 1) * this.#totalByteLength
          )
        )
      )

    // 將每個 byte 解碼轉換回原本的 byte
    const decodedBuffer = new Uint8Array(
      buffer.map(byteBuffer => decodeBaseConversionByte(byteBuffer, this.#chars.length))
    )

    // 將二進位陣列轉換為字串
    const decoded = Base64.decode(Base64.fromUint8Array(decodedBuffer))

    return decoded
  }

  /**
   * 嘗試解碼輸入字串，若發生錯誤則回傳空字串。
   */
  decodeSilent(input: string): string {
    try {
      return this.decode(input)
    } catch (error) {
      return ''
    }
  }
}
