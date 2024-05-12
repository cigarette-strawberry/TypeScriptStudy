// any 任意类型 unknown 未知类型
// 1.top type 顶级类型 any unknown
// 2.Object
// 3.Number String Boolean
// 4.number string boolean
// 5.   1   '1'   true
// 6.never
// unknown 只能赋值给自身 或者是any

let names: unknown = '123'
console.log(names)
