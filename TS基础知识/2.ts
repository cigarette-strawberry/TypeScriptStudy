// 函数定义
function hello(name: string): void {
    console.log('hello ' + name);
}
hello('xiao')

// type用来定义一个类型 或者 类型别名   => 代表一个分隔符 把参数 和 返回值 分开
type GetUserNameType = (firstName: string, lastName: string) => void
// 函数表达式
let getUserName: GetUserNameType = function (firstName: string, lastName: string): void {
    console.log(firstName + lastName);
}
getUserName('xiao', 'tian')

// 可选参数   ？代表可传可不传
function print(name: string, age?: number, sex?: string) {

}
print()
print('xiao')
print('xiao', 10)
print('xiao', 10, '男')

// 默认参数
function ajax(url: string, methods: string = 'GET') {
    console.log(url, methods);
}
ajax('/user')
ajax('/user', 'POSt')

// 剩余参数
function sum(...numbers: Array<number>) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5));

// 函数重载   重载的定义和函数的声明要紧紧挨在一起 中间不能有别的东西
// 重载 根据函数形参的个数和数据类型 去定义调用方法时传递的实参
// No overload(重载) expects 1 arguments
let obj: any = {}
function attr(val: string): void
function attr(val: number): void
function attr(val: boolean): void
// console.log(111);
function attr(val: any): void {
    if (typeof val === 'string') {
        obj.name = val
    } else if (typeof val === 'number') {
        obj.age = val
    }
}
attr('xiao')
attr(12)
attr(true)
console.log(obj);

function sumnumber(a: string, b: string): void
function sumnumber(a: number, b: number): void
function sumnumber(a: any, b: any): void {

}
// sumnumber(1, '1')
sumnumber(1, 1)
sumnumber('1', '1')