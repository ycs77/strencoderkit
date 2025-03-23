import aes from 'js-crypto-aes'
import hash from 'js-crypto-hash'

export async function encryptAES(buffer: Uint8Array, key: string): Promise<Uint8Array> {
  const encoder = new TextEncoder()
  const hashedkey = await hash.compute(encoder.encode(key), 'SHA-256')
  const keyBuffer = hashedkey.subarray(0, 16)
  const iv = hashedkey.subarray(16)
  return aes.encrypt(buffer, keyBuffer, { name: 'AES-CTR', iv })
}

export async function decryptAES(buffer: Uint8Array, key: string): Promise<Uint8Array> {
  const encoder = new TextEncoder()
  const hashedkey = await hash.compute(encoder.encode(key), 'SHA-256')
  const keyBuffer = hashedkey.subarray(0, 16)
  const iv = hashedkey.subarray(16)
  return aes.decrypt(buffer, keyBuffer, { name: 'AES-CTR', iv })
}
