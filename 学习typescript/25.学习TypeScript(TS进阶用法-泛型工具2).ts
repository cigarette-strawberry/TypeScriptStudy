// Record<K, T> 用于创建动态的键值对对象
// ReturnType<T> 用于获取函数返回值的类型信息

namespace twentyFive {
  // ---------------------Record---------------------
  type Key = 'a' | 'b' | 'c' // Key 不能少

  type Value = '唱' | '跳' | 'rap' // Value 随意

  // 对象的Key只能是 string | number | symbol
  // Record实现原理
  type objKey = keyof any
  type CustomRecord<K extends objKey, T> = { [P in K]: T }
  //   type CustomRecord<K extends string | number | symbol, T> = { [P in K]: T }

  let obj: CustomRecord<Key, Value> = {
    a: '唱',
    b: '跳',
    c: '跳'
  }

  // 还可进行嵌套写法
  let obj2: Record<Key, Record<Key, Value>> = {
    a: {
      a: '唱',
      b: '跳',
      c: '跳'
    },
    b: {
      a: '唱',
      b: '跳',
      c: '跳'
    },
    c: {
      a: '唱',
      b: '跳',
      c: '跳'
    }
  }

  console.log(obj, obj2)

  // ---------------------ReturnType---------------------
  // ReturnType 实现原理
  type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  const fn = () => [1, 2, 3, '4', true]
  type fnReturnType = CustomReturnType<typeof fn>
}
