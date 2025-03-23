import { Base64 } from 'js-base64'

export function strToUint8Array(input: string): Uint8Array {
  return Base64.toUint8Array(Base64.encode(input))
}

export function uint8ArrayToStr(buffer: Uint8Array): string {
  return Base64.decode(Base64.fromUint8Array(buffer))
}
