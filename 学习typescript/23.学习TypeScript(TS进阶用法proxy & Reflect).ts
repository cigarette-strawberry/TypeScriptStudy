// Proxy    代理 13个方法 参数一模一样
// Reflect  反射 13个方法 参数一模一样

namespace twentyThree {
  let person = { name: 'zx', age: 17 }
  // Proxy 支持对象 数组 函数 set map (引用类型)
  person.name // 取值
  person.name = 'qw' // 赋值

  let proxyPerson = new Proxy(person, {
    // 取值
    get(target, key, receiver) {
      if (target.age === 18) return Reflect.get(target, key, receiver)
      else return '年龄不符合'
    },
    // 赋值
    // person   name   qw   person:保证上下文一致
    set(target, key, value, receiver) {
      return true
    },
    // 拦截函数调用
    apply() {},
    // 拦截 in 操作符
    has() {
      return true
    },
    // 拦截 for in
    ownKeys() {
      return ['1', '2', '3']
    },
    // 拦截new操作符
    // constructor() {},
    // 拦截删除操作
    deleteProperty() {
      return true
    }
  })

  console.log(proxyPerson.age)

  // -------------------------------------------------------------

  let person1 = { name: 'zx', age: 17 }
  console.log(Reflect.get(person1, 'name', person1))
  console.log(Reflect.set(person1, 'name', 'qw', person1))
  console.log(person1.name)

  // -------------------------------------------------------------

  // mobx observable
  const list: Set<Function> = new Set()
  const autoRun = (cb: Function) => {
    if (!list.has(cb)) list.add(cb)
  }

  const observable = <T extends object>(params: T) => {
    return new Proxy(params, {
      set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver)
        list.forEach(cb => cb())
        return result
      }
    })
  }

  const personProxy = observable({ name: 'xiaoyu', age: 18 })

  autoRun(() => console.log(personProxy.name, 666))

  personProxy.name = 'zx'
}
