import { describe, it, expect } from 'vitest'
import { Strencoder } from '../src/strencoder'

describe('Strencoder', () => {
  const chars = ['*', '-']

  it('編碼成功', () => {
    const str = 'Hello World'
    const strencoder = new Strencoder({ chars })
    const encoded = strencoder.encode(str)
    expect(encoded).toBe('-****---*--**-----***---***-*-**-*****----*----*-*--*-----***---*-***-*-----------------')
  })

  it('解碼成功', () => {
    const str = '-****---*--**-----***---***-*-**-*****----*----*-*--*-----***---*-***-*-----------------'
    const strencoder = new Strencoder({ chars })
    const decoded = strencoder.decode(str)
    expect(decoded).toBe('Hello World')
  })

  it('解碼失敗並拋出錯誤', () => {
    const str = '?'
    const strencoder = new Strencoder({ chars })
    expect(() => strencoder.decode(str)).toThrow('無效的字元: ?')
  })

  it('解碼失敗並回傳空字串', () => {
    const str = '?'
    const strencoder = new Strencoder({ chars })
    const decoded = strencoder.decodeSilent(str)
    expect(decoded).toBe('')
  })
})
