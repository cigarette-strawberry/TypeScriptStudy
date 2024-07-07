import { Dictionaries } from '../enum'

export type Key = string
export type Expire = Dictionaries.permanent | number // 时间戳 或者 Dictionaries.permanent永久存储

export interface Result<T> {
  message: string
  value: T | null
}
export interface Data<T> {
  value: T
  [Dictionaries.expire]: Expire
}

export interface StorageClass {
  get: <T>(key: Key) => Result<T>
  set: <T>(key: Key, value: T, expire: Expire) => void
  remove: (key: Key) => void
  clear: () => void
}
