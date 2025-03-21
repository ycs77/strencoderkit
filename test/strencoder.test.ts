import { it, expect } from 'vitest'
import { Strencoder } from '../src/strencoder'

it('基本編碼', () => {
  const str = 'Hello World'
  const encoder = new Strencoder({
    chars: ['*', '-'],
  })
  const encoded = encoder.encode(str)
  expect(encoded).toBe('*-**-****--**-*-*--*--***--*--***--*----**-******-*-*---*--*----*---**-**--*--***--**-**')
})

it('基本解碼', () => {
  const str = '*-**-****--**-*-*--*--***--*--***--*----**-******-*-*---*--*----*---**-**--*--***--**-**'
  const encoder = new Strencoder({
    chars: ['*', '-'],
  })
  const decoded = encoder.decode(str)
  expect(decoded).toBe('Hello World')
})
