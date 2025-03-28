import { encodeBaseConversionByte, decodeBaseConversionByte } from './baseConversionByte'

/**
 * 計算每個 byte 需要多少個字元來表示
 * @param charsLength 字元的長度
 */
export function calculateLengthPerByte(charsLength: number): number {
  return Math.ceil(Math.log(2 ** 8) / Math.log(charsLength))
}

/**
 * 將 buffer 轉換為 base conversion 編碼的字串
 * @param buffer 需要進行編碼的 buffer
 * @param chars 編碼所使用的字元
 */
export function encodeBaseConversionBuffer(buffer: Uint8Array, chars: string[]): string {
  const lengthPerByte = calculateLengthPerByte(chars.length)

  // 將每個 byte 轉換為編碼後的字元索引數字
  const encodedBuffer = Array.from(buffer).flatMap(byte => {
    // 將每個字元轉換為編碼後的字元索引數字，讓每個 byte 最高上限為 #chars 的長度
    const bytesBuffer = encodeBaseConversionByte(byte, chars.length)

    // 將每個 byte 補齊
    const arrBuffer = new ArrayBuffer(lengthPerByte)
    const fullBytesBuffer = new Uint8Array(arrBuffer)
    fullBytesBuffer.set(bytesBuffer, lengthPerByte - bytesBuffer.length)

    return Array.from(fullBytesBuffer)
  })

  // 將字元索引數字轉換為 #chars 中對應字元
  const encoded = encodedBuffer
    .map(index => chars[index])
    .join('')

  return encoded
}

/**
 * 將 base conversion 編碼的字串轉換回 buffer
 * @param input 需要進行解碼的字串
 * @param chars 編碼所使用的字元
 */
export function decodeBaseConversionBuffer(input: string, chars: string[]): Uint8Array {
  const lengthPerByte = calculateLengthPerByte(chars.length)

  // 將每個字元轉換為編碼字元對應的索引數字
  const encodedBuffer = Array.from(input).map(char => {
    const index = chars.indexOf(char)
    if (index === -1) {
      throw new Error(`無效的字元: ${char}`)
    }
    return index
  })

  // 將每個字元索引數字轉換為二進位陣列，陣列元素對應每個 byte
  const buffer = Array.from({ length: Math.ceil(encodedBuffer.length / lengthPerByte) })
    .map((_, i) =>
      new Uint8Array(
        encodedBuffer.slice(
          i * lengthPerByte,
          (i + 1) * lengthPerByte
        )
      )
    )

  // 將每個 byte 解碼轉換回原本的 byte
  const decodedBuffer = new Uint8Array(
    buffer.map(byteBuffer => decodeBaseConversionByte(byteBuffer, chars.length))
  )

  return decodedBuffer
}
