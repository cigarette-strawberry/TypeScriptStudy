namespace compatibility {
  interface A {
    name: string
    age: number
  }

  interface B {
    name: string
    age: number
    sex: boolean
  }

  let a: A = {
    name: 'a',
    age: 18
  }

  let b: B = {
    name: 'b',
    age: 20,
    sex: true
  }

  // 协变
  // A B 两个类型完全不同但是竟然可以赋值并无报错B类型充当A类型的子类型，当子类型里面的属性满足A类型就可以进行赋值，也就是说不能少可以多，这就是协变。
  a = b
  // b = a // 类型 "A" 中缺少属性 "sex"，但类型 "B" 中需要该属性。

  let fna = (a: A) => {}
  let fnb = (b: B) => {}

  // 逆变
  // fna 赋值 给 fnb 其实最后执行的还是fna 而 fnb的类型能够完全覆盖fna 所以这一定是安全的，相反fna的类型不能完全覆盖fnb少一个sex所以是不安全的。
  fnb = fna
  // fna = fnb // 参数“b”和“a” 的类型不兼容。 类型 "A" 中缺少属性 "sex"，但类型 "B" 中需要该属性。

  // 双向协变
  // tsconfig strictFunctionTypes 设置为false 支持双向协变 fna fnb 随便可以来回赋值
}
