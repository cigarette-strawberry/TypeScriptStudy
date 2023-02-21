"use strict";
// 结构类型系统
/**
 * 接口的兼容性
 * 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
 * 原理是 Duck-Check，就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
 */
// 接口的兼容性 ts跟类型无关 只和属性有关 属性里面必须有想要的才可以
var a;
(function (a) {
    function getName(animal) {
        return animal.name;
    }
    let p = {
        name: 'tiantian',
        age: 10
    };
    let p1 = {
        name: 'hehe',
        age: 10,
        speak() { }
    };
    console.log(getName(p));
    console.log(getName(p1));
})(a || (a = {}));
var b;
(function (b_1) {
    /* 基本类型的兼容性 */
    let num = 1;
    let str = 'hello';
    num = str;
    let num2;
    let str2 = '天天';
    num2 = str2;
    /* 类的兼容性 跟 类型无关 */
    class Animal {
    }
    class Bird extends Animal {
    }
    let a;
    a = new Bird();
    let b;
    b = new Animal();
    b = { name: 'tiantian' }; // 不管这个对象的具体类型，只要属性有就可以
})(b || (b = {}));
var c;
(function (c_1) {
    let sum;
    function f1(a, b) {
        return a;
    }
    sum = f1;
    function f2(a) {
        return a;
    }
    sum = f2;
    function f3() {
        return 1;
    }
    sum = f3;
    function f4(a, b, c) {
        return a;
    }
    let getperson;
    function g1() {
        return { name: 'tiantian', age: 10 };
    }
    getperson = g1;
    function g2() {
        return { name: 'tiantian' };
    }
    // getperson = g2 // 不能少返回值
    function g3() {
        return { name: 'tiantian', age: 10, home: 'shanghai' };
    }
    getperson = g3;
    let log;
    function log1(a) {
        console.log(a);
    }
    log = log1;
    function log2(a) {
        console.log(a);
    }
    let x; // {data:string}
    let y; // {data:string}
    x = y;
    /**
     * 枚举的兼容性
     * 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
     * 不同枚举类型之间是不兼容的
     */
    let Colors;
    (function (Colors) {
        Colors[Colors["Red"] = 0] = "Red";
        Colors[Colors["Yellow"] = 1] = "Yellow";
    })(Colors || (Colors = {}));
    let c;
    c = Colors.Red; //=>0
    c = 1;
    let d;
    d = Colors.Yellow; //=>1
})(c || (c = {}));
