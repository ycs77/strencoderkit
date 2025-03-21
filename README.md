# Strencoderkit

產生類似於熊曰、魔曰之類的自訂文字編碼工具，目前做出來是為了好玩，並無考慮實際用途。

## 使用方式

編碼文字：

```bash
npx strencoderkit encode "hello world"
# aGVsbG8gd29ybGQ=
```

解碼文字：

```bash
npx strencoderkit decode "aGVsbG8gd29ybGQ="
# hello world
```

## 程序化使用方式

在專案中安裝套件：

```bash
npm install strencoderkit
# 或使用 yarn
yarn add strencoderkit
# 或使用 pnpm
pnpm add strencoderkit
```

```ts
import { Strencoder } from 'strencoderkit'

const strencoder = new Strencoder({
  chars: ['*', '-'],
})
strencoder.encode('hello world') // 'aGVsbG8gd29ybGQ='
strencoder.decode('aGVsbG8gd29ybGQ=') // 'hello world'
```

```ts
import { Strencoder } from 'strencoderkit'

const strencoder = new Strencoder({
  prefix: '天干：',
  chars: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
})

encoder.encode('Hello, World!') // 天干：甲乙丙丁戊己庚辛壬癸...
encoder.decode(encoded) // Hello, World!
```

## LICENSE

基於 [MIT LICENSE](LICENSE.md) 釋出
