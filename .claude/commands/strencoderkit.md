---
description: Encode or decode strings using customizable character sets with optional encryption
argument-hint: [encode|decode] [text] [options]
allowed-tools: Skill
---

# String Encoding/Decoding Tool

Encode or decode text using custom character sets with encryption support.

**Execution steps:**
1. Determine the operation type based on user request (encode or decode)
2. Use Skill tool to invoke the corresponding skill:
   - **Encoding operation**: Invoke `strencoderkit-encode` skill
   - **Decoding operation**: Invoke `strencoderkit-decode` skill
3. The skill will execute the corresponding `npx strencoderkit encode/decode` command
4. Return the result to the user

**User request:** $ARGUMENTS

**Important: Must invoke the corresponding skill through the Skill tool. Do not execute bash commands directly.**
