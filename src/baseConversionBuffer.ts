export function encodeBaseConversionBuffer(input: number, base: number): Uint8Array {
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

export function decodeBaseConversionBuffer(buffer: Uint8Array | number[], base: number): number {
  let result = 0
  let multiplier = 1

  for (let i = buffer.length - 1; i >= 0; i--) {
    result += buffer[i] * multiplier
    multiplier *= base
  }

  return result
}
