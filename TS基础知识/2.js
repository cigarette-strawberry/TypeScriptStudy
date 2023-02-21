"use strict";
// 函数定义
function hello(name) {
    console.log('hello ' + name);
}
hello('xiao');
// 函数表达式
let getUserName = function (firstName, lastName) {
    console.log(firstName + lastName);
};
getUserName('xiao', 'tian');
// 可选参数   ？代表可传可不传
function print(name, age, sex) {
}
print();
print('xiao');
print('xiao', 10);
print('xiao', 10, '男');
// 默认参数
function ajax(url, methods = 'GET') {
    console.log(url, methods);
}
ajax('/user');
ajax('/user', 'POSt');
// 剩余参数
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5));
// 函数重载   重载的定义和函数的声明要紧紧挨在一起 中间不能有别的东西
// 重载 根据函数形参的个数和数据类型 去定义调用方法时传递的实参
// No overload(重载) expects 1 arguments
let obj = {};
// console.log(111);
function attr(val) {
    if (typeof val === 'string') {
        obj.name = val;
    }
    else if (typeof val === 'number') {
        obj.age = val;
    }
}
attr('xiao');
attr(12);
attr(true);
console.log(obj);
function sumnumber(a, b) {
}
// sumnumber(1, '1')
sumnumber(1, 1);
sumnumber('1', '1');
