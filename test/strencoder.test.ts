import { describe, it, expect } from 'vitest'
import { Strencoder } from '../src/strencoder'

describe('2進制', () => {
  it('2進制編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({
      chars: ['*', '-'],
    })
    const encoded = encoder.encode(str)
    expect(encoded).toBe('*-**-****--**-*-*--*--***--*--***--*----**-******-*-*---*--*----*---**-**--*--***--**-**')
  })

  it('2進制解碼', () => {
    const str = '*-**-****--**-*-*--*--***--*--***--*----**-******-*-*---*--*----*---**-**--*--***--**-**'
    const encoder = new Strencoder({
      chars: ['*', '-'],
    })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})
