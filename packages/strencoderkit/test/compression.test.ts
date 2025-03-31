import { describe, expect, it } from 'vitest'
import { compress, decompress } from '../src/compression'

const encoder = new TextEncoder()

describe('compression', () => {
  it('使用 gzip 壓縮和解壓縮長位元組', () => {
    const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi officiis veritatis tenetur, odio deserunt quos ad ipsa excepturi dolore eaque unde qui mollitia rerum voluptates provident recusandae pariatur illo dolor! Nihil dolor aperiam sit accusamus corrupti temporibus, id pariatur quibusdam saepe eius beatae, velit obcaecati ea assumenda laudantium at veritatis provident doloribus numquam amet inventore qui sint? Natus commodi sit non soluta eaque rerum pariatur quam neque, numquam quidem fuga magnam aut ullam tempora veniam voluptatibus! Temporibus, suscipit tempora dicta vel deserunt amet fugiat inventore doloremque. Voluptas necessitatibus tempore impedit deserunt fuga laborum dolore labore nam dignissimos excepturi, nesciunt odit atque animi maiores ea, cumque doloribus quos reiciendis rem minus? Corporis repellendus quasi ea, harum officia necessitatibus in aut voluptatem, voluptatibus fuga perspiciatis minus vel eum maiores magnam eos. Debitis repellat quae veritatis nobis voluptatem reprehenderit similique ut porro, et enim aperiam ad dicta itaque natus! Expedita vel tenetur deserunt incidunt aut, ea optio maxime doloribus aperiam modi sint quidem unde, quaerat quas. Minima aut, veritatis perspiciatis voluptatum a recusandae!'

    const buffer = encoder.encode(text)

    const compressedBuffer = compress(buffer)
    expect(compressedBuffer[0]).toBe(0x1F)
    expect(compressedBuffer[1]).toBe(0x8B)
    expect(compressedBuffer[compressedBuffer.length - 1]).not.toBe(255)
    expect(compressedBuffer[compressedBuffer.length - 2]).not.toBe(255)
    expect(compressedBuffer.byteLength).toBeLessThanOrEqual(buffer.byteLength)

    const decompressedBuffer = decompress(compressedBuffer)
    expect(decompressedBuffer).toEqual(buffer)
  })

  it('使用 unishox 壓縮和解壓縮短位元組', () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, illum.'

    const buffer = encoder.encode(text)

    const compressedBuffer = compress(buffer)
    expect(compressedBuffer[0]).not.toBe(0x1F)
    expect(compressedBuffer[1]).not.toBe(0x8B)
    expect(compressedBuffer[compressedBuffer.length - 1]).toBe(255)
    expect(compressedBuffer[compressedBuffer.length - 2]).toBe(255)
    expect(compressedBuffer.byteLength).toBeLessThanOrEqual(buffer.byteLength)

    const decompressedBuffer = decompress(compressedBuffer)
    expect(decompressedBuffer).toEqual(buffer)
  })
})
