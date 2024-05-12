//定义参数 num 和 num2  ：后面定义返回值的类型
interface Add {
  (num: number, num2: number): number
}

const fn: Add = (num: number, num2: number) => {
  return num + num2
}
console.log(fn(5, 5))

interface User {
  name: string
  age: number
}
function getUserInfo(user: User): void {
  return
}

console.log(getUserInfo({ name: 'zs', age: 18 }))

const fn1 = (array: number[], ...items: any[]): any[] => {
  console.log(array, items)
  return items
}

let a: number[] = [1, 2, 3]

fn1(a, '4', '5', '6')

interface Obj {
  arr: number[]
  add: () => void
}

const obj: Obj = {
  arr: [1, 2, 3],
  add() {
    this.arr.push(4)
  }
}

obj.add()
console.log(obj)

function fn2(params: number): void

function fn2(params: string, params2: number): void

function fn2(params: any, params2?: any): void {
  console.log(params)
  console.log(params2)
}

fn2(123)
fn2('123', 456)

let user: number[] = [1, 2, 3]
function fn3(add: number[]): number[]
function fn3(id: number): number[]
function fn3(): number[]
function fn3(ids?: number | number[]): number[] {
  if (typeof ids === 'number') {
    return user.filter(item => item === ids)
  } else if (Array.isArray(ids)) {
    user.push(...ids)
    return user
  } else {
    return user
  }
}
console.log(fn3([4]))
console.log(fn3([4, 5, 6]))
