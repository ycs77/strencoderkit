import { describe, it, expect } from 'vitest'
import { Strencoder } from '../src/strencoder'

describe('2位字元', () => {
  const chars = ['*', '-']

  it('2位字元編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({ chars })
    const encoded = encoder.encode(str)
    expect(encoded).toBe(
      '*-**-***' + '*--**-*-' +
      '*--*--**' + '*--*--**' +
      '*--*----' + '**-*****' +
      '*-*-*---' + '*--*----' +
      '*---**-*' + '*--*--**' +
      '*--**-**'
    )
  })

  it('2位字元解碼', () => {
    const str =
      '*-**-***' + '*--**-*-' +
      '*--*--**' + '*--*--**' +
      '*--*----' + '**-*****' +
      '*-*-*---' + '*--*----' +
      '*---**-*' + '*--*--**' +
      '*--**-**'
    const encoder = new Strencoder({ chars })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})

describe('7位字元', () => {
  const chars = ['日', '月', '火', '水', '木', '金', '土']

  it('7位字元編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({ chars })
    const encoded = encoder.encode(str)
    expect(encoded).toBe('月水火火日水火月水火月水火月土日木木月金水火月土火火火火月水火日火')
  })

  it('7位字元解碼', () => {
    const str = '月水火火日水火月水火月水火月土日木木月金水火月土火火火火月水火日火'
    const encoder = new Strencoder({ chars })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})

describe('8位字元', () => {
  const chars = ['水', '金', '地', '火', '木', '土', '天', '海']

  it('8位字元編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({ chars })
    const encoded = encoder.encode(str)
    expect(encoded).toBe('金金水金木土金土木金土木金土海水木水金地海金土海金天地金土木金木木')
  })

  it('8位字元解碼', () => {
    const str = '金金水金木土金土木金土木金土海水木水金地海金土海金天地金土木金木木'
    const encoder = new Strencoder({ chars })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})

describe('10位字元', () => {
  const chars = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

  it('10位字元編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({ prefix: '天干：', chars })
    const encoded = encoder.encode(str)
    expect(encoded).toBe('天干：甲辛丙乙甲乙乙甲壬乙甲壬乙乙乙甲丁丙甲壬辛乙乙乙乙乙戊乙甲壬乙甲甲')
  })

  it('10位字元解碼', () => {
    const str = '天干：甲辛丙乙甲乙乙甲壬乙甲壬乙乙乙甲丁丙甲壬辛乙乙乙乙乙戊乙甲壬乙甲甲'
    const encoder = new Strencoder({ prefix: '天干：', chars })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})

describe('12位字元', () => {
  const chars = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

  it('12位字元編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({ prefix: '地支：', chars })
    const encoded = encoder.encode(str)
    expect(encoded).toBe('地支：子午子子申巳子酉子子酉子子酉卯子寅申子未卯子酉卯子酉午子酉子子申辰')
  })

  it('12位字元解碼', () => {
    const str = '地支：子午子子申巳子酉子子酉子子酉卯子寅申子未卯子酉卯子酉午子酉子子申辰'
    const encoder = new Strencoder({ prefix: '地支：', chars })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})

describe('256位字元', () => {
  const chars = [
    '力', '卜', '十', '土', '工', '女', '子', '寸', '小', '山', '巾', '戈', '弓', '心', '戶', '手',
    '文', '支', '斗', '斤', '方', '日', '月', '木', '止', '比', '水', '火', '爪', '父', '牙', '牛',
    '犬', '玄', '玉', '瓜', '瓦', '甘', '生', '用', '田', '白', '皮', '目', '矛', '矢', '石', '示',
    '禾', '立', '竹', '米', '糸', '缶', '网', '羊', '羽', '老', '而', '耳', '聿', '臣', '自', '至',
    '舟', '行', '衣', '見', '角', '言', '谷', '豆', '貝', '赤', '走', '足', '身', '車', '辛', '辰',
    '里', '金', '長', '門', '雨', '青', '非', '面', '革', '韋', '音', '頁', '風', '飛', '食', '首',
    '香', '馬', '高', '鬥', '魚', '鳥', '鹿', '麥', '麻', '黃', '黍', '黑', '鼎', '鼓', '鼠', '齊',
    '龍', '龜', '太', '充', '電', '過', '後', '為', '冬', '草', '哭', '陽', '機', '顏', '色', '問',
    '綠', '看', '藍', '空', '句', '彩', '中', '虹', '蜻', '蜓', '樂', '會', '坡', '忙', '布', '場',
    '入', '口', '河', '林', '間', '跑', '書', '打', '跳', '陪', '維', '險', '海', '找', '歡', '神',
    '奇', '猜', '次', '誰', '跟', '喜', '帶', '氣', '球', '始', '吹', '突', '然', '得', '樹', '給',
    '可', '理', '只', '居', '孩', '常', '躲', '發', '現', '就', '頭', '回', '想', '但', '怎', '知',
    '道', '先', '畫', '愛', '送', '寫', '祝', '張', '臉', '感', '謝', '師', '啊', '還', '漂', '亮',
    '卡', '片', '秋', '採', '果', '吃', '飽', '埋', '進', '很', '久', '嗎', '敬', '奶', '早', '校',
    '園', '作', '她', '邊', '汗', '學', '您', '樣', '當', '成', '星', '許', '池', '圈', '波', '紋',
    '快', '告', '訴', '光', '拉', '怪', '呀', '半', '再', '苗', '苦', '油', '能', '收', '甜', '井',
  ]

  it('256位字元編碼', () => {
    const str = 'Hello World'
    const encoder = new Strencoder({ chars })
    const encoded = encoder.encode(str)
    expect(encoded).toBe('貝鳥鼎鼎齊犬面齊太鼎魚')
  })

  it('256位字元解碼', () => {
    const str = '貝鳥鼎鼎齊犬面齊太鼎魚'
    const encoder = new Strencoder({ chars })
    const decoded = encoder.decode(str)
    expect(decoded).toBe('Hello World')
  })
})
