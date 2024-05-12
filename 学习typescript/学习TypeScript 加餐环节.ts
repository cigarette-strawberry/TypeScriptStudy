// object、Object 以及{}(字面量模式) 这三个类型区别？
// Object

/* let O: Object = '' //正确
let O1: Object = 123 //正确
let O2: Object = true //正确
let O3: Object = [] //正确
let O4: Object = () => 123 //正确
let O5: Object = {} //正确 */

/* let o: object = '' //错误
let o1: object = 123 //错误
let o2: object = true //错误
let o3: object = [] //正确
let o4: object = () => 123 //正确
let o5: object = {} //正确 */

let O: {} = '' //正确
let O1: {} = 123 //正确
let O2: {} = true //正确
let O3: {} = [] //正确
let O4: {} = () => 123 //正确
let O5: {} = { name: '123' } //正确
O5 = 123
console.log(O5)
