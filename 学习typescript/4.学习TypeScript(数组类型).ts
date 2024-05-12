let arr: number[] = [1, 2, 3, 4]
let arr1: string[] = ['1', '2', '3', '4']
let arr3: Array<number> = [1, 2, 3, 4]
let arr4: Array<string> = ['1', '2', '3', '4']

interface NumberArray {
  [index: number]: string
}
let fibonacci: NumberArray = ['1', '1', '2', '3', '5']

console.log(fibonacci)

interface ObjectArray {
  name: string
  age?: number
}

const objArr: ObjectArray[] = [{ name: '1', age: 1 }, { name: '2' }]

let data: number[][] = [
  [1, 2],
  [3, 4]
]

let data1: string[][] = [
  ['1', '2'],
  ['3', '4']
]

let data2: Array<Array<boolean>> = [
  [true, false],
  [false, true]
]

let data3: ObjectArray[][] = [
  [{ name: '1', age: 1 }, { name: '2' }],
  [{ name: '1', age: 1 }, { name: '2' }]
]
console.log(data2)
