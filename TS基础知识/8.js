"use strict";
/**
 * 类型保护
 * 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
 * 类型保护就是能够通过关键字判断出分支中的类型
 */
function double(input) {
    if (typeof input === 'string') {
        input.toLocaleLowerCase();
    }
    else if (typeof input === 'number') {
        input.toFixed(2);
    }
    else {
        input;
    }
}
class Animal {
    constructor() {
        this.name = 'tiantian';
    }
}
class Bird extends Animal {
    constructor() {
        super(...arguments);
        this.swing = 2;
    }
}
function getName(a) {
    if (a instanceof Bird) {
        a.swing;
    }
    else {
        a.name;
    }
}
/* null保护 */
function getFirstLetter(s) {
    /* 一  if (s === null) {
         s = ''
     } */
    /* 二  s = s || '' */
    // 下面是三
    function ensure() {
        s = s || '';
    }
    ensure();
    return s.charAt(0);
}
/**
 * 链式判断运算符
 * 链式判断运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?.
 * 如果运算符左侧的操作数 ?. 计算为 null 或 undefined，则表达式求值为 undefined。否则，正常触发目标属性访问，方法或函数调用
 *    a?.b   // 如果a是 null/undefined ,那么返回undefined，否则返回 a?.b 的值
 */
let aa = { bb: 5 };
console.log(aa === null || aa === void 0 ? void 0 : aa.bb);
function getButton(button) {
    if (button.class === 'warning') {
        button.text1;
    }
    else {
        button.text2;
    }
}
function getNumber(x) {
    if ('swing' in x) {
        x.swing;
    }
    else {
        x.leg;
    }
}
function isRed(x) {
    return x.color == 'blue';
}
function getColor(x) {
    if (isRed(x)) {
        console.log(x.name1);
    }
    else {
        console.log(x.name2);
    }
}
let x = { name1: 'red', color: 'blue' };
getColor(x);
