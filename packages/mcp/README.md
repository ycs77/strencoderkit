# StrEncoderKit MCP Server

[![NPM version][ico-version]][link-npm]
[![Software License][ico-license]](LICENSE)
[![Total Downloads][ico-downloads]][link-downloads]

A Model Context Protocol server for StrEncoderKit.

## Features

- Encode and decode text
- Customizable encoded characters

## API

### Tools

- **encode_string**
  - Encodes a string
  - Inputs:
    - `input` (string): The string to encode
    - `chars` (string): Character set available for encode
    - `prefix` (string): Prefix for the encoded string
    - `suffix` (string): Suffix for the encoded string
    - `encrypt` (boolean): Whether to enable encryption
    - `key` (string): Encryption key, default is "strencoderkit"
    - `compress` (boolean): Whether to enable compression

- **decode_string**
  - Decodes a string
  - Inputs:
    - `input` (string): The string to decode
    - `chars` (string): Character set available for decode
    - `prefix` (string): Prefix for the encoded string
    - `suffix` (string): Suffix for the encoded string
    - `encrypt` (boolean): Whether to enable encryption
    - `key` (string): Encryption key, default is "strencoderkit"
    - `compress` (boolean): Whether to enable compression

## Usage with Claude Desktop

Add the configuration into your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "strencoderkit": {
      "command": "npx",
      "args": [
        "-y",
        "strencoderkit-mcp"
      ]
    }
  }
}
```

## LICENSE

Under the [GPL-3.0](LICENSE)

[ico-version]: https://img.shields.io/npm/v/strencoderkit-mcp?style=flat-square
[ico-license]: https://img.shields.io/badge/license-GPL--3.0-brightgreen?style=flat-square
[ico-downloads]: https://img.shields.io/npm/dt/strencoderkit-mcp?style=flat-square

[link-npm]: https://www.npmjs.com/package/strencoderkit-mcp
[link-downloads]: https://www.npmjs.com/package/strencoderkit-mcp
