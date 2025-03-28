declare module 'unishox2.siara.cc' {
  const USX_HCODES_DFLT: Uint8Array
  const USX_HCODE_LENS_DFLT: Uint8Array
  const USX_FREQ_SEQ_DFLT: string[]
  const USX_TEMPLATES: (string | number)[]
  const magic: {
    byt: number
    bits: number
  }

  function unishox2_compress(
    input: string,
    len: number,
    out: Uint8Array,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): number
  function unishox2_compress(
    input: Uint8Array,
    len: number,
    out: Uint8Array,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): number
  function unishox2_compress(
    input: string[],
    len: number,
    out: Uint8Array,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): number
  function unishox2_compress(
    input: Uint8Array[],
    len: number,
    out: Uint8Array,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): number

  function unishox2_compress_simple(
    input: string,
    len: number,
    out: Uint8Array
  ): number
  function unishox2_compress_simple(
    input: Uint8Array,
    len: number,
    out: Uint8Array
  ): number
  function unishox2_compress_simple(
    input: string[],
    len: number,
    out: Uint8Array
  ): number
  function unishox2_compress_simple(
    input: Uint8Array[],
    len: number,
    out: Uint8Array
  ): number

  function unishox2_decompress(
    input: Uint8Array,
    len: number,
    out_arr: null,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): string
  function unishox2_decompress(
    input: Uint8Array,
    len: number,
    out_arr: Uint8Array,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): number
  function unishox2_decompress(
    input: Uint8Array[],
    len: number,
    out_arr: null,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): string
  function unishox2_decompress(
    input: Uint8Array[],
    len: number,
    out_arr: Uint8Array,
    usx_hcodes: Uint8Array,
    usx_hcode_lens: Uint8Array,
    usx_freq_seq: string[],
    usx_templates: (string | number)[]
  ): number

  function unishox2_decompress_simple(
    input: Uint8Array,
    len: number,
    out_arr: null
  ): string
  function unishox2_decompress_simple(
    input: Uint8Array,
    len: number,
    out_arr: Uint8Array
  ): number
  function unishox2_decompress_simple(
    input: Uint8Array[],
    len: number,
    out_arr: null
  ): string
  function unishox2_decompress_simple(
    input: Uint8Array[],
    len: number,
    out_arr: Uint8Array
  ): number
}
