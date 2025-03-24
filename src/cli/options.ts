export interface Options {
  message: string
  actionType: 'encode' | 'decode'
  encrypt: boolean
  compress: boolean
  plain: boolean
  debug: boolean
}

export function resolveOptions(options: any) {
  return <Partial<Options>>{
    message: options.message,
    actionType: options.actionType,
    encrypt: options.encrypt,
    compress: options.compress,
    plain: options.plain,
    debug: options.debug,
  }
}
