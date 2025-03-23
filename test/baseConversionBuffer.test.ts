import { describe, it, expect } from 'vitest'
import { encodeBaseConversionBuffer, decodeBaseConversionBuffer } from '../src/baseConversionBuffer'

describe('encodeBaseConversionBuffer', () => {
  it('應正確編碼數字為指定進制的 Uint8Array', () => {
    expect(encodeBaseConversionBuffer(10, 2)).toEqual(new Uint8Array([1, 0, 1, 0]))
    expect(encodeBaseConversionBuffer(32, 2)).toEqual(new Uint8Array([1, 0, 0, 0, 0, 0]))
    expect(encodeBaseConversionBuffer(13, 7)).toEqual(new Uint8Array([1, 6]))
    expect(encodeBaseConversionBuffer(67, 7)).toEqual(new Uint8Array([1, 2, 4]))
    expect(encodeBaseConversionBuffer(255, 16)).toEqual(new Uint8Array([15, 15]))
    expect(encodeBaseConversionBuffer(238, 37)).toEqual(new Uint8Array([6, 16]))
    expect(encodeBaseConversionBuffer(0, 10)).toEqual(new Uint8Array([]))
  })

  it('應拋出錯誤當 base 不在有效範圍內', () => {
    expect(() => encodeBaseConversionBuffer(10, 1)).toThrow('base 必須介於 2 到 256 之間')
    expect(() => encodeBaseConversionBuffer(10, 257)).toThrow('base 必須介於 2 到 256 之間')
  })
})

describe('decodeBaseConversionBuffer', () => {
  it('應正確解碼 Uint8Array 為指定進制的數字', () => {
    expect(decodeBaseConversionBuffer(new Uint8Array([1, 0, 1, 0]), 2)).toBe(10)
    expect(decodeBaseConversionBuffer(new Uint8Array([1, 0, 0, 0, 0, 0]), 2)).toBe(32)
    expect(decodeBaseConversionBuffer(new Uint8Array([1, 6]), 7)).toBe(13)
    expect(decodeBaseConversionBuffer(new Uint8Array([1, 2, 4]), 7)).toBe(67)
    expect(decodeBaseConversionBuffer(new Uint8Array([4, 1]), 9)).toBe(37)
    expect(decodeBaseConversionBuffer(new Uint8Array([15, 15]), 16)).toBe(255)
    expect(decodeBaseConversionBuffer(new Uint8Array([6, 16]), 37)).toBe(238)
    expect(decodeBaseConversionBuffer(new Uint8Array([]), 10)).toBe(0)
  })
})
