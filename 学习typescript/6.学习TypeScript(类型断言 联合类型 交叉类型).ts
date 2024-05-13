namespace A {
  // 联合类型 |
  const f1 = function (type: number | boolean): boolean {
    return !!type
  }

  console.log(f1(0))

  // -------------------------------------------------------
  // 交叉类型 & 与extends类似
  interface I1 {
    name: string
    age: number
  }
  interface I2 {
    sex: boolean
  }

  const people: I1 & I2 = {
    name: 'zs',
    age: 12,
    sex: true
  }

  console.log(people)

  // -------------------------------------------------------
  // 类型断言 as
  interface A {
    name: string
  }

  interface B {
    run: number
  }

  let fn = (type: A | B): void => {
    console.log((<A>type).name)
    console.log((type as A).name)
  }
  fn({ name: 'zs' })
}
