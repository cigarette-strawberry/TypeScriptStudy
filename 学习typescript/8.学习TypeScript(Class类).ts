namespace eight {
  class Person {
    public name: string
    private age: number
    readonly sex: number
    protected height: number
    constructor(name: string, age: number, sex: number, height: number) {
      // 1、在TypeScript是不允许直接在constructor 定义变量的 需要在constructor上面先声明
      // 2、定义了变量不用 也会报错 通常是给个默认值 或者 进行赋值
      this.name = name
      this.age = age
      this.sex = sex
      this.height = height
    }
  }

  const person = new Person('张三', 18, 1, 180)

  // ------------------------------------------------

  interface Person1 {
    name: string
    age: number
    sex: boolean
  }

  class A {
    name: string
    constructor(name: string) {
      this.name = name
    }
  }

  class B extends A implements Person1 {
    age: number
    sex: boolean
    constructor(age: number, sex: boolean) {
      super('张三') // 父类的 prototype.constructor.call()
      this.age = age
      this.sex = sex
    }
  }

  new B(12, true)

  // ------------------------------------------------

  class Person2 {
    name: string
    static age: number
    sex: boolean
    constructor(name: string, age: number, sex: boolean) {
      this.name = name
      //   this.age = age
      this.sex = sex
    }

    static init() {
      this.age = 18
      console.log(this.age)
      console.log(666)
    }
  }

  Person2.age = 18
  Person2.init()

  // ------------------------------------------------

  interface Options {
    el: string | HTMLElement
  }

  interface VNode {
    tag: string // div span p
    text?: string // 文本
    children?: VNode[]
  }

  interface VUECli {
    options: Options
    init: () => void
  }

  class DOM {
    // 创建节点
    createElement(el: string): HTMLElement {
      return document.createElement(el)
    }
    // 填充文本
    setText(el: HTMLElement, text: string | null) {
      el.textContent = text
    }
    // 渲染节点
    render(data: VNode) {
      const root = this.createElement(data.tag)
      // 递归操作
      if (data.children && Array.isArray(data.children)) {
        data.children?.forEach(item => {
          const child = this.render(item)
          root.appendChild(child)
        })
      } else {
        this.setText(root, data.text ?? null)
      }

      return root
    }
  }

  class Vue extends DOM implements VUECli {
    options: Options
    constructor(options: Options) {
      super() // 父类的 prototype.constructor.call()
      this.options = options
      this.init()
    }
    init(): void {
      const data: VNode = {
        tag: 'div',
        children: [
          {
            tag: 'span',
            text: 'hello world',
            children: [
              {
                tag: 'h1',
                text: 'hello world'
              }
            ]
          },
          {
            tag: 'p',
            text: 'hello world'
          },
          {
            tag: 'i',
            text: 'hello world'
          }
        ]
      }
      const app = typeof this.options.el === 'string' ? document.querySelector(this.options.el)! : this.options.el
      app.appendChild(this.render(data))
    }
  }

  new Vue({
    el: '#app'
  })

  // -----------------------------------------

  class Person3 {
    name: string
    constructor(name: string) {
      this.name = name
    }

    get getName() {
      return this.name + '-男'
    }
    set setName(value: string) {
      this.name = value + '-12'
    }
  }

  const person3 = new Person3('张三')
  person3.setName = '李四'
  console.log(person3.getName)

  // ----------------------------------------------

  abstract class C {
    abstract name: string
    constructor(name: string) {}

    abstract init(name: string): string
  }

  class D extends C {
    name: string
    constructor(name: string) {
      super('张三')
      this.name = name
    }

    init(name: string) {
      return '123'
    }
  }
}
