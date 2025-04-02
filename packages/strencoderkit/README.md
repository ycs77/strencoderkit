# StrEncoderKit

[![NPM version][ico-version]][link-npm]
[![Software License][ico-license]](LICENSE)
[![Total Downloads][ico-downloads]][link-downloads]

可自訂編碼文字的編碼工具，目前做出來只是為了好玩和研究學習，加密內容不保證安全，不建議用到實際情境中。

其中壓縮部分的程式碼參考自 [Abracadabra 魔曰](https://github.com/SheepChef/Abracadabra)。且加密內容強度並沒有到魔曰的程度，如果有這方面需求的話，建議使用魔曰。

## 全局安裝

全局安裝套件：

```bash
npm install -g strencoderkit
```

或是使用 `npx` 直接執行：

```bash
npx strencoderkit encode "Hello World"
```

## 使用方式

編碼文字：

```bash
strencoderkit encode "Hello World"
# 日水土水日火木金火日木土月日月水金日木火土水月土木土金火日火火火金
```

解碼文字：

```bash
strencoderkit decode "日水土水日火木金火日木土月日月水金日木火土水月土木土金火日火火火金"
# Hello World
```

如果想要自訂字元集，可以使用 `--chars`：

```bash
strencoderkit encode "Hello World" --chars "甲乙丙丁戊己庚辛壬癸"
```

如果需要定義較多的字元集，也可以使用 `--charfile` 來指定字元集文字檔：

```bash
strencoderkit encode "Hello World" --charfile "chars.txt"
```

可以加上 `--plain` 來輸出純文字：

```bash
strencoderkit encode "Hello World" --plain
```

如果想要設定加解密的金鑰，可以使用 `--key`：

```bash
strencoderkit encode "Hello World" --key "secret"
strencoderkit decode "水金火日金日月月土木日水日日日木水木木日火日木木水日火火月月日日火" --key "secret"
```

## 套件使用方式

在專案中安裝套件：

```bash
npm install strencoderkit
# 或使用 yarn
yarn add strencoderkit
# 或使用 pnpm
pnpm add strencoderkit
```

2位字元編碼範例：

```ts
import { Strencoder } from 'strencoderkit'

const strencoder = new Strencoder({
  chars: ['*', '-'],
})

strencoder.encode('Hello World')
// '***--*---**-*-*----*-**-**-***-***--**-*-*--*--*--*--***-*-*****----**--*--**-***---*-*-'

strencoder.decode('***--*---**-*-*----*-**-**-***-***--**-*-*--*--*--*--***-*-*****----**--*--**-***---*-*-')
// 'Hello World'
```

用天干編碼範例：

```ts
import { Strencoder } from 'strencoderkit'

const strencoder = new Strencoder({
  prefix: '天干：',
  chars: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
})

encoder.encode('Hello World')
// '天干：甲丙辛乙戊癸丙丁丁甲丁戊甲己甲乙壬丙丙乙庚乙庚甲丙戊丁乙甲甲乙乙辛'

encoder.decode('天干：甲丙辛乙戊癸丙丁丁甲丁戊甲己甲乙壬丙丙乙庚乙庚甲丙戊丁乙甲甲乙乙辛')
// 'Hello World'
```

## 參考

- [与熊论道](http://hi.pcmoe.net/)
- [TudouCode](https://github.com/lersh/TudouCode)
- [Abracadabra 魔曰](https://github.com/SheepChef/Abracadabra)

## LICENSE

基於 [GPL-3.0](LICENSE) 釋出

[ico-version]: https://img.shields.io/npm/v/strencoderkit?style=flat-square
[ico-license]: https://img.shields.io/badge/license-GPL--3.0-brightgreen?style=flat-square
[ico-downloads]: https://img.shields.io/npm/dt/strencoderkit?style=flat-square

[link-npm]: https://www.npmjs.com/package/strencoderkit
[link-downloads]: https://www.npmjs.com/package/strencoderkit
