export interface Options {
  message: string
  actionType: 'encode' | 'decode'
  chars: string
  charfile: string | undefined
  prefix: string | undefined
  suffix: string | undefined
  encrypt: boolean
  key: string | undefined
  compress: boolean
  plain: boolean
  debug: boolean
}

export interface UserOptions extends Omit<Options, 'message' | 'actionType'> {
  message?: string
  actionType?: 'encode' | 'decode'
}

export function resolveOptions(options: any) {
  return <UserOptions>{
    message: options.message,
    actionType: options.actionType,
    chars: options.chars,
    charfile: options.charfile,
    prefix: options.prefix,
    suffix: options.suffix,
    encrypt: options.encrypt,
    key: options.key,
    compress: options.compress,
    plain: options.plain,
    debug: options.debug,
  }
}
