namespace thirteen {
  const a: symbol = Symbol('a')
  const b: symbol = Symbol('a')

  console.log(a, b)
  console.log(a === b)

  console.log(Symbol.for('a') === Symbol.for('b')) // true

  // 生成器
  function* generator() {
    yield Promise.resolve('0')
    yield '1'
    yield '2'
    yield '3'
  }

  const gen = generator()
  console.log(gen.next())
  console.log(gen.next())
  console.log(gen.next())
  console.log(gen.next())
  console.log(gen.next())

  const obj = {
    max: 5,
    current: 0,
    [Symbol.iterator]() {
      return {
        max: this.max,
        current: this.current,
        next() {
          if (this.current == this.max) {
            return {
              value: undefined,
              done: true
            }
          } else {
            return {
              value: this.current++,
              done: false
            }
          }
        }
      }
    }
  }
  console.log([...obj], { ...obj })

  for (let val of obj) {
    console.log(val)
  }

  let d = {
    a: 1,
    b: 2,
    c: 3
  }
  console.log({ ...d })
}
