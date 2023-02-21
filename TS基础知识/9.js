"use strict";
var a;
(function (a) {
    let p = {
        name: 'tiantian',
        fly() { },
        eat() { }
    };
})(a || (a = {}));
var b;
(function (b) {
    /* typeof 可以获取一个变量的类型 */
    let p = {
        name: "tiantian",
        age: 12
    };
    let p2 = {
        name: 'didi',
        age: 20
    };
    let myname = 'tiantian';
    let mylevel = 10;
    console.log(myname, mylevel);
    function getValueByKey(val, key) {
        return val[key];
    }
    let Person3 = {
        name: 'didi',
        age: 10,
        gender: 'male',
    };
    let name = getValueByKey(Person3, 'name');
    console.log('name', name);
    let p4 = {
        name: 'tiantian',
        age: 10,
        gender: 'female',
    };
    let p5 = {
        name: "tiantian",
        age: 123,
        gender: 'female'
    };
    let p6 = {
        name: "tiantian",
        age: 123,
        gender: 'female'
    };
    let x = {
        name: 'name'
    };
    /**
     * class 和 enum 既可以作为类型使用也可以作为值使用
     * interface type 只能作为类型使用
     * function var let const 只能做为值使用
     */
    /**
     * 元组的长度和类型是固定的
     *
     * interface 是定义接口类型 它是真实的类型 也可能会被导入导出
     * type 只是临时用的别名 并不会产生真正的类型
     * class 定义类 new xxx()
     *
     * 映射既适用interface也适用于class
     */
})(b || (b = {}));
var c;
(function (c) {
    let condition = {
        name2: 'tiantian'
    };
    // Condition2 < Fish | Bird > = Water | Sky
    let c1 = { name2: '水' };
    let c2 = { name4: '天空' };
    let c3 = { name2: '水' };
    let c4 = { name4: '天空' };
})(c || (c = {}));
var d;
(function (d) {
    let e = 10;
    let e2 = 'hello';
    let e3 = 'hello';
    let e4 = 10;
    // redux 会用到的ReturnType   返回值的类型
    function getUserInfo() {
        return { name: 'tiantian', age: 10 };
    }
    let user = { name: 'didi', age: 12 };
    // InstanceType 获取构造函数的实例类型
    class Person5 {
        constructor(name) {
            this.name = name;
        }
    }
    let p = new Person5('tiantian');
})(d || (d = {}));
