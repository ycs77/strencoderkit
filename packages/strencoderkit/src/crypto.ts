import aes from 'js-crypto-aes'
import hash from 'js-crypto-hash'

export async function encryptAES(buffer: Uint8Array, key: string, iv: string): Promise<Uint8Array> {
  const encoder = new TextEncoder()
  const hashedkey = await hash.compute(encoder.encode(key), 'SHA-256')
  const hashedIv = await hash.compute(encoder.encode(iv), 'SHA-256')
  return aes.encrypt(buffer, hashedkey, {
    name: 'AES-CTR',
    iv: hashedIv.subarray(16),
  })
}

export async function decryptAES(buffer: Uint8Array, key: string, iv: string): Promise<Uint8Array> {
  const encoder = new TextEncoder()
  const hashedkey = await hash.compute(encoder.encode(key), 'SHA-256')
  const hashedIv = await hash.compute(encoder.encode(iv), 'SHA-256')
  return aes.decrypt(buffer, hashedkey, {
    name: 'AES-CTR',
    iv: hashedIv.subarray(16),
  })
}
