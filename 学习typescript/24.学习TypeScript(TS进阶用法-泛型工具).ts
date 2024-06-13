// 泛型工具是一组预定义的泛型类型的操作符，用于操作和转换类型。
// Partial<T> 用于将一个类型的所有属性变为可选
// Required<T> 用于将一个类型的所有属性变为必选
// Pick<T, K> 用于从一个类型中选取指定的属性
// Exclude<T, U> 用于从一个类型的属性集合中排除指定的属性
// Omit<T, K> 用于创建一个新类型，该新类型从原始类型中排除指定的属性

namespace twentyFour {
  interface User {
    name?: string
    age?: number
    address: string
    sex: boolean
  }

  // ---------------------Partial---------------------
  // Partial实现原理
  type CustomPartial<T> = {
    [key in keyof T]?: T[key]
  }

  type partial = Partial<User>
  type customPartial = CustomPartial<User>

  // ---------------------Required---------------------
  // Required实现原理
  type CustomRequired<T> = {
    [key in keyof T]-?: T[key]
  }

  type required = Required<User>
  type customRequired = CustomRequired<User>

  // ---------------------Pick---------------------
  // Pick实现原理
  type CustomPick<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  type pick = Pick<User, 'name' | 'age'> // 只选取name和age属性
  type customPick = CustomPick<User, 'name' | 'age'> // 只选取name和age属性

  // ---------------------Exclude---------------------
  // Exclude实现原理
  type CustomExclude<T, U> = T extends U ? never : T
  // never在联合类型中会被排除掉

  type excludeInterface = Exclude<keyof User, 'address'>
  type exclude = Exclude<1 | 2 | 3, 1>
  type customExclude = CustomExclude<1 | 2 | 3, 2 | 3>

  // ---------------------Omit---------------------
  // Omit实现原理
  // type CustomOmit<T, K> = { [P in Exclude<keyof T, K>]: T[P] }
  type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

  type omit = Omit<User, 'name'>
  type customOmit = CustomOmit<User, 'age' | 'sex'>
}
