# StrEncoderKit

產生類似於熊曰、魔曰之類的編碼工具，但編碼文字可以自訂，目前做出來是為了好玩，並無考慮實際用途，不要用到生產環境中。

## 使用方式

編碼文字：

```bash
npx strencoderkit encode "Hello World"
# 日水土水日火木金火日木土月日月水金日木火土水月土木土金火日火火火金
```

解碼文字：

```bash
npx strencoderkit decode "日水土水日火木金火日木土月日月水金日木火土水月土木土金火日火火火金"
# Hello World
```

可以加上 `--plain` 來輸出純文字：

```bash
npx strencoderkit encode "Hello World" --plain
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
- [Whisperer](https://github.com/Borber/Whisperer)
- [Abracadabra 魔曰](https://github.com/SheepChef/Abracadabra)

## LICENSE

基於 [MIT LICENSE](LICENSE.md) 釋出
