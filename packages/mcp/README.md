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
    - `key` (string, optional, default: 'strencoderkit'): Encryption key

- **decode_string**
  - Decodes a string
  - Inputs:
    - `input` (string): The string to decode
    - `chars` (string): Character set available for decode
    - `key` (string, optional, default: 'strencoderkit'): Encryption key

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
