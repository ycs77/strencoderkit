/**
 * 將數字轉換為指定進制的 byte 陣列
 * @param input 需要進行編碼的數字
 * @param base 進制，範圍從 2 到 256
 */
export function encodeBaseConversionByte(input: number, base: number): Uint8Array {
  if (base < 2 || base > 256) {
    throw new Error('base 必須介於 2 到 256 之間')
  }

  const length = Math.floor(Math.log(input) / Math.log(base)) + 1
  const buffer = Array.from<number>({ length })
  let num = input

  for (let i = length - 1; i >= 0; i--) {
    buffer[i] = num % base
    num = Math.floor(num / base)
  }

  return new Uint8Array(buffer)
}

/**
 * 將 base conversion 編碼的 byte 陣列轉換回數字
 * @param buffer 需要進行解碼的 byte 陣列
 * @param base 進制，範圍從 2 到 256
 */
export function decodeBaseConversionByte(buffer: Uint8Array | number[], base: number): number {
  if (base < 2 || base > 256) {
    throw new Error('base 必須介於 2 到 256 之間')
  }

  let result = 0
  let multiplier = 1

  for (let i = buffer.length - 1; i >= 0; i--) {
    result += buffer[i] * multiplier
    multiplier *= base
  }

  return result
}
