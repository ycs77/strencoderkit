import { encodeBaseConversionBuffer, decodeBaseConversionBuffer } from './baseConversionBuffer'
import { compress, decompress } from './compression'
import { strToUint8Array, uint8ArrayToStr } from './utils'

export interface StrencoderOptions {
  /**
   * 字元陣列，用於定義編碼時可用的字元集合。
   */
  chars: string[]
  /**
   * 字串前綴，會加在編碼結果的開頭。
   */
  prefix?: string
  /**
   * 是否啟用壓縮功能，預設為 true。
   * @default true
   */
  compress?: boolean
}

export class Strencoder {
  // 編碼後的字元集合
  #chars: string[]
  // 編碼後的前綴
  #prefix: string
  // 是否啟用壓縮功能
  #compress: boolean

  constructor(options: StrencoderOptions) {
    if (options.chars.length < 2 ** 1 || options.chars.length > 2 ** 8) {
      throw new Error('chars 長度必須介於 2 到 256 之間')
    }

    this.#chars = options.chars
    this.#prefix = options.prefix || ''
    this.#compress = options.compress ?? true
  }

  /**
   * 使用提供的字元集合和前綴，將輸入字串編碼為自定義編碼字串。
   */
  encode(input: string): string {
    // 將輸入字串轉換為二進位陣列
    let buffer = strToUint8Array(input)

    // 壓縮 buffer
    if (this.#compress) {
      buffer = compress(buffer)
    }

    // 將 buffer 編碼為對應自定義編碼字串
    let encoded = encodeBaseConversionBuffer(buffer, this.#chars)

    // 加上前綴
    encoded = this.#prefix + encoded

    return encoded
  }

  /**
   * 解碼給定的字串，將其轉換回原始的字串內容。
   */
  decode(input: string): string {
    // 移除前綴
    const baseInput = input.slice(this.#prefix.length)

    // 解碼轉換回原本的 buffer
    let buffer = decodeBaseConversionBuffer(baseInput, this.#chars)

    // 解壓縮 buffer
    if (this.#compress) {
      buffer = decompress(buffer)
    }

    // 將 buffer 轉換為字串
    const decoded = uint8ArrayToStr(buffer)

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
