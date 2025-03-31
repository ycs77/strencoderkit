import { describe, expect, it } from 'vitest'
import { Strencoder } from '../src/strencoder'

describe('Strencoder', () => {
  const chars = ['*', '-']

  it('編碼成功', async () => {
    const str = 'Hello World'
    const strencoder = new Strencoder({ chars })
    const encoded = await strencoder.encode(str)
    expect(encoded).toBe('*-***-----***-*--*-*****---*---*--***---*---**-***-**-**-*--*----*--***--**-*----**--***')
  })

  it('解碼成功', async () => {
    const str = '*-***-----***-*--*-*****---*---*--***---*---**-***-**-**-*--*----*--***--**-*----**--***'
    const strencoder = new Strencoder({ chars })
    const decoded = await strencoder.decode(str)
    expect(decoded).toBe('Hello World')
  })

  it('解碼失敗並拋出錯誤', async () => {
    const str = '?'
    const strencoder = new Strencoder({ chars })
    await expect(strencoder.decode(str)).rejects.toThrow('無效的字元: ?')
  })

  it('解碼失敗並回傳空字串', async () => {
    const str = '?'
    const strencoder = new Strencoder({ chars })
    const decoded = await strencoder.decodeSilent(str)
    expect(decoded).toBe('')
  })
})
