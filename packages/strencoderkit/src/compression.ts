import { USX_FREQ_SEQ_DFLT, USX_HCODES_DFLT, USX_HCODE_LENS_DFLT, USX_TEMPLATES, unishox2_compress_simple, unishox2_decompress } from 'unishox2.siara.cc'
import pako from 'pako'

export function compress(buffer: Uint8Array): Uint8Array {
  let tempBuffer = buffer

  if (tempBuffer.byteLength <= 1024) {
    const originalSize = tempBuffer.byteLength
    tempBuffer = unishoxCompress(tempBuffer)

    if (tempBuffer.byteLength === originalSize) {
      tempBuffer = gzipCompress(tempBuffer)
    }
  } else {
    tempBuffer = gzipCompress(tempBuffer)
  }

  return tempBuffer
}

export function decompress(buffer: Uint8Array): Uint8Array {
  let tempBuffer = buffer

  tempBuffer = gzipDecompress(tempBuffer)
  tempBuffer = unishoxDecompress(tempBuffer)

  return tempBuffer
}

export function gzipCompress(buffer: Uint8Array): Uint8Array {
  const result = pako.gzip(buffer)

  if (result.byteLength >= buffer.byteLength) {
    return buffer
  }

  return result
}

export function gzipDecompress(buffer: Uint8Array): Uint8Array {
  const gzipHeadBytes = buffer.subarray(0, 2)

  if (gzipHeadBytes[0] === 0x1F && gzipHeadBytes[1] === 0x8B) {
    return pako.ungzip(buffer)
  }

  return buffer
}

export function unishoxCompress(buffer: Uint8Array): Uint8Array {
  const compressedBuffer = new Uint8Array(2048)
  const libmark = 255

  const length = unishox2_compress_simple(
    buffer,
    buffer.byteLength,
    compressedBuffer
  )

  const encodedBuffer = compressedBuffer.subarray(0, length)
  if (encodedBuffer.byteLength >= buffer.byteLength) {
    return buffer
  }

  const resBuffer = new Uint8Array(encodedBuffer.byteLength + 2)
  resBuffer.set(encodedBuffer, 0)
  resBuffer.set([libmark, 255], encodedBuffer.byteLength)

  return resBuffer
}

export function unishoxDecompress(buffer: Uint8Array): Uint8Array {
  const lastByte = buffer[buffer.byteLength - 1]
  const secondLastByte = buffer[buffer.byteLength - 2]

  if (lastByte !== 255 ||
      secondLastByte < 244 ||
      secondLastByte > 255
  ) {
    return buffer
  }

  const libmark = secondLastByte
  const newBuffer = buffer.subarray(0, buffer.byteLength - 2)
  const decompressedBuffer = new Uint8Array(2048)

  let length = 0
  switch (libmark) {
    case 255:
      length = unishox2_decompress(
        newBuffer,
        newBuffer.byteLength,
        decompressedBuffer,
        USX_HCODES_DFLT,
        USX_HCODE_LENS_DFLT,
        USX_FREQ_SEQ_DFLT,
        USX_TEMPLATES
      )
      break
  }

  return decompressedBuffer.subarray(0, length)
}
