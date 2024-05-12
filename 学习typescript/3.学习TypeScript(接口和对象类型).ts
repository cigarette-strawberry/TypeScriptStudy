import { log } from 'console'

// 重名interface  可以合并
interface Person {
  name: string
}

interface Person {
  age: number
}

const person: Person = {
  name: 'Alice',
  age: 30
}

console.log(person)

// 继承interface
interface Person1 extends Person {
  age: number
}

const person1: Person1 = {
  name: 'Alice1',
  age: 31
}

console.log(person1)

// 任意属性
interface Person2 {
  name: string
  age?: number
  [propName: string]: any
}

const person2: Person2 = {
  name: 'Alice2',
  sex: 'female'
}

console.log(person2)

// 定义函数
interface Person3 {
  b?: string
  readonly a: string
  [propName: string]: any
  readonly id: number
  readonly cb: () => void
}

const person3: Person3 = {
  a: '213',
  c: '123',
  id: 1,
  cb: () => {
    console.log(123)
  }
}

person3.cb()
console.log(person3)

interface Fn {
  (name: number): number[]
}
const fn: Fn = (name: number) => {
  return [1, 2, 3]
}

console.log(fn(123))
