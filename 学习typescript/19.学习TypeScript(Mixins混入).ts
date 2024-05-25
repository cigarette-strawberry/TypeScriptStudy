namespace nineteen {
  interface A {
    name: string
  }

  interface B {
    age: number
  }

  const a: A = { name: 'zs' }
  const b: B = { age: 18 }

  // 扩展运算符 浅拷贝 返回新的类型
  const c1 = { ...a, ...b }
  console.log(c1)

  // Object.assign 浅拷贝 交叉类型
  const c2 = Object.assign({}, a, b)
  console.log(c2)

  // 新的API 在高版本node 和 浏览器中可用
  const c3 = structuredClone(a)
  console.log(c3)

  // ----------------------------------------------

  class Log {
    log(msg: string) {
      console.log(msg)
    }
  }

  class Html {
    render() {
      console.log('render')
    }
  }

  class APP {
    run() {
      console.log('run')
    }
  }

  type Constructor<T> = new (...args: any[]) => T
  function pluginMixins<T extends Constructor<APP>>(Base: T) {
    return class extends Base {
      private Log = new Log()
      private Html = new Html()
      constructor(...args: any[]) {
        super(...args)
        this.Log = new Log()
        this.Html = new Html()
      }

      run(): void {
        this.Log.log('run')
      }

      render(): void {
        this.Html.render()
      }
    }
  }

  const mixins = pluginMixins(APP)

  const app = new mixins()

  // ----------------------------------------------

  class A1 {
    type: boolean = false
    changeType() {
      this.type = !this.type
    }
  }
  class B1 {
    name: string = '张三'
    getName(): string {
      return this.name
    }
  }
  class C1 implements A1, B1 {
    type: boolean
    changeType: () => void
    name: string
    getName: () => string
    constructor() {
      this.type = false
      this.changeType = (): void => {}
      this.name = 'zs'
      this.getName = (): string => {
        return 'zs'
      }
    }
  }

  function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
        curCls.prototype[name] = item.prototype[name]
      })
    })
  }
  Mixins(C1, [A1, B1])

  const cc = new C1()
  console.log(cc, Object.getOwnPropertyNames(cc))

  // ----------------------------------------------

  // Object.getOwnPropertyNames()可以获取对象自身的属性，除去他继承来的属性，对它所有的属性遍历，它是一个数组，遍历它所有的属性名

  /* const obj = {
    a: 1,
    b: 2,
    c: 3
  }
   
  Object.prototype.d = 4 // 添加一个继承属性

  console.log(Object.getOwnPropertyNames(obj)) // 输出: ['a', 'b', 'c'] */
}
