import { AES, enc } from 'crypto-js'
import { AES_KEY } from '~/shared/config'

export function encrypt(message: string) {
  return AES.encrypt(message, AES_KEY)
}

export function decrypt(cipherText: string) {
  return AES.decrypt(cipherText, AES_KEY).toString(enc.Utf8)
}
