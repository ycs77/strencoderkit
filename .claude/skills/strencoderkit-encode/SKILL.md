---
name: strencoderkit-encode
description: Encode text using custom character sets (like 日月火水木金土) with optional encryption
allowed-tools: Bash(npx strencoderkit encode *)
---

# Encode Text with StrEncoderKit

## When to Use
Use when the user asks to:
- Encode text
- Convert text to custom characters
- Encrypt and encode strings

## Instructions

1. Get the text to encode from the user
2. Run the command: `npx strencoderkit encode "<text>"`
3. Return the result

## Common Options

Basic encode:
```bash
npx strencoderkit encode "Hello World"
```

With custom characters:
```bash
npx strencoderkit encode "Hello" --chars "甲乙丙丁戊己庚辛壬癸"
```

With encryption key:
```bash
npx strencoderkit encode "Secret" --key "mykey"
```

Plain output:
```bash
npx strencoderkit encode "Hello" --plain
```
