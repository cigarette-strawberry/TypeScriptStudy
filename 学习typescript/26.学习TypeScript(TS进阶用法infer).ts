// 言简意赅，infer就是推导泛型参数
// infer声明只能出现在extends子语句中
// infer后面跟一个变量名

namespace twentySix {
  // 获取Promise的返回值

  interface User {
    name: string
    age: number
  }

  /* type PromiseType = Promise<User>
  type GetPromiseType<T> = T extends Promise<infer U> ? U : T
  type T = GetPromiseType<PromiseType> */

  // 递归
  type PromiseType = Promise<Promise<Promise<User>>>
  type GetPromiseType<T> = T extends Promise<infer U> ? GetPromiseType<U> : T
  type T = GetPromiseType<PromiseType>

  //----------------------------------------------------------------------

  // infer 协变 一般出现在对象上面
  // 产生斜边返回联合类型
  let obj = {
    name: 'zs',
    age: 18
  }
  type Bar<T> = T extends { name: infer U; age: infer U } ? U : T

  type B = Bar<typeof obj>

  //----------------------------------------------------------------------

  // infer 逆变 一般出现在函数的参数上面
  // 产生逆变返回交叉类型

  // type a = string & number 因为没有交集(也就是说不可能既是string又是number)，所以交叉类型为never

  type Bar1<T> = T extends {
    a: (x: infer U) => void
    b: (x: infer U) => void
  }
    ? U
    : unknown

  type C = Bar1<{
    a: (x: string) => void
    b: (x: number) => void
  }>
}
