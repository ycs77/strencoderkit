---
name: strencoderkit-decode
description: Decode encoded strings back to original text with optional decryption
allowed-tools: Bash(npx strencoderkit decode *)
---

# Decode Text with StrEncoderKit

## When to Use
Use when the user asks to:
- Decode encoded text
- Convert custom characters back to normal text
- Decrypt encoded strings

## Instructions

1. Get the encoded text from the user
2. Run the command: `npx strencoderkit decode "<encoded-text>"`
3. Return the result

## Common Options

Basic decode:
```bash
npx strencoderkit decode "日水土水日火木金火日木土月日月水金日木火土水月土木土金火日火火火金"
```

With custom characters:
```bash
npx strencoderkit decode "甲乙丙..." --chars "甲乙丙丁戊己庚辛壬癸"
```

With decryption key:
```bash
npx strencoderkit decode "水金火日..." --key "mykey"
```

Plain output:
```bash
npx strencoderkit decode "日水土..." --plain
```
