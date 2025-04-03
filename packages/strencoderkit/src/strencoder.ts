import { decodeBaseConversionBuffer, encodeBaseConversionBuffer } from './baseConversionBuffer'
import { compress, decompress } from './compression'
import { decryptAES, encryptAES } from './crypto'

export interface StrencoderOptions {
  /**
   * 字元陣列，用於定義編碼時可用的字元集合。
   */
  chars: string[]
  /**
   * 增加在編碼字串前的前綴。
   */
  prefix?: string
  /**
   * 增加在編碼字串後的後綴。
   */
  suffix?: string
  /**
   * 是否啟用加密功能。
   * @default true
   */
  encrypt?: boolean
  /**
   * 是否啟用壓縮功能。
   * @default true
   */
  compress?: boolean
}

const DEFAULT_KEY = 'strencoderkit'

export class Strencoder {
  #chars: string[]
  #prefix: string
  #suffix: string
  #encrypt: boolean
  #compress: boolean

  constructor(options: StrencoderOptions) {
    if (options.chars.length < 2 ** 1 || options.chars.length > 2 ** 8) {
      throw new Error('chars 長度必須介於 2 到 256 之間')
    }

    this.#chars = options.chars
    this.#prefix = options.prefix || ''
    this.#suffix = options.suffix || ''
    this.#encrypt = options.encrypt ?? true
    this.#compress = options.compress ?? true
  }

  /**
   * 使用提供的字元集合和前綴，將輸入字串編碼為自定義編碼字串。
   */
  async encode(input: string, key = DEFAULT_KEY): Promise<string> {
    // 將輸入字串轉換為二進位陣列
    let buffer = new TextEncoder().encode(input)

    // 壓縮 buffer
    if (this.#compress) {
      buffer = compress(buffer)
    }

    // 加密 buffer
    if (this.#encrypt) {
      buffer = await encryptAES(buffer, key, this.#chars.join(''))
    }

    // 將 buffer 編碼為對應自定義編碼字串
    let encoded = encodeBaseConversionBuffer(buffer, this.#chars)

    // 加上前綴和後綴
    encoded = this.#prefix + encoded + this.#suffix

    return encoded
  }

  /**
   * 解碼給定的字串，將其轉換回原始的字串內容。
   */
  async decode(input: string, key = DEFAULT_KEY): Promise<string> {
    // 移除前綴和後綴
    let baseInput = input.slice(this.#prefix.length)
    if (this.#suffix.length) {
      baseInput = baseInput.slice(0, -this.#suffix.length)
    }

    // 解碼轉換回原本的 buffer
    let buffer = decodeBaseConversionBuffer(baseInput, this.#chars)

    // 解密 buffer
    if (this.#encrypt) {
      buffer = await decryptAES(buffer, key, this.#chars.join(''))
    }

    // 解壓縮 buffer
    if (this.#compress) {
      buffer = decompress(buffer)
    }

    // 將 buffer 轉換為字串
    const decoded = new TextDecoder().decode(buffer)

    return decoded
  }

  /**
   * 嘗試解碼輸入字串，若發生錯誤則回傳空字串。
   */
  async decodeSilent(input: string): Promise<string> {
    try {
      return await this.decode(input)
    } catch (error) {
      return ''
    }
  }
}
