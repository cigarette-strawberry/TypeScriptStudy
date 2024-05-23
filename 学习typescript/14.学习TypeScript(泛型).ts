namespace fourteen {
  const fn = (a: string, b: string): Array<string> => {
    return [a, b]
  }
  const fn1 = (a: number, b: number): Array<number> => {
    return [a, b]
  }
  fn('1', '2')
  fn1(1, 2)

  // -----------------------------------------------------------

  const fn3 = <T>(a: T, b: T): Array<T> => {
    return [a, b]
  }
  fn3('1', '2')
  fn3(1, 2)
  fn3(true, false)

  // -----------------------------------------------------------

  type A<T> = string | number | T
  const a: A<string> = '1'
  const b: A<number> = 1
  const c: A<null> = null

  interface B<T> {
    message: T
  }

  const a1: B<string> = { message: '1' }
  const b1: B<number> = { message: 1 }
  const c1: B<null> = { message: null }
  const d1: B<undefined> = { message: undefined }

  // -----------------------------------------------------------

  const fn4 = <T = number, K = string>(a: T, b: K): Array<T | K> => {
    return [a, b]
  }

  fn4(true, false)

  // -----------------------------------------------------------

  const axios = {
    get<T>(): Promise<T> {
      return new Promise((resolve, reject) => {
        const xhr: XMLHttpRequest = new XMLHttpRequest()
        xhr.open('GET', 'http://localhost:3000/api/getData')
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
          }
        }
        xhr.send('')
      })
    }
  }

  interface Response {
    message: string
    code: number
  }

  axios.get<Response>().then(res => {
    console.log(res)
  })

  // -----------------------------------------------------------

  const add = <T extends number>(a: T, b: T): number => {
    return a + b
  }
  add(1, 2)

  // -----------------------------------------------------------

  interface Len {
    length: number
  }
  const len = <T extends Len>(a: T): number => {
    return a.length
  }
  len('123')
  len([1, 2, 3])
  /* len(123123)
  len(true) */

  // -----------------------------------------------------------

  const obj = {
    name: '123',
    age: 18
  }

  type Key = keyof typeof obj

  const fn5 = <T extends object, K extends keyof T>(obj: T, attr: K): void => {
    obj[attr]
  }
  fn5(obj, 'name')

  // -----------------------------------------------------------

  interface Data {
    name: string
    age: number
    flag: boolean
  }

  type Options<T extends object> = {
    // [Key in keyof T]?: T[Key]
    readonly [Key in keyof T]?: T[Key]
  }

  type F = Options<Data>
}
