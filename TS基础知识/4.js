"use strict";
/**
 * 装饰器
 * 装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
 * 常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
 * 装饰器的写法分为普通装饰器(无需传递参数)和装饰器工厂(需要传递参数)
 * */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//  1、类装饰器   类装饰器在类声明之前声明，用来监视、修改或替换类定义
var a;
(function (a) {
    function enhancer(target) {
        target.prototype.xx = 'x';
        target.prototype.yy = 'y';
    }
    let Person = class Person {
        constructor() { }
    };
    Person = __decorate([
        enhancer
    ], Person);
    let p = new Person();
    console.log(p.xx);
    console.log(p.yy);
})(a || (a = {}));
// 把 类 整个替换
var b;
(function (b) {
    function enhancer(target) {
        return class {
            constructor() {
                this.name = '小天';
                this.age = 10;
            }
        };
    }
    let Person = class Person {
        constructor() {
            this.name = '小天';
        }
    };
    Person = __decorate([
        enhancer
    ], Person);
    let p = new Person();
    console.log(p.age);
})(b || (b = {}));
// 把 类 整个替换(用继承的方法) 新类和旧类相差不能太大 旧类有的新类也要有
(function (b) {
    function enhancer() {
        return function (target) {
            return class extends Person {
                constructor(name, age) {
                    super(name, age);
                }
            };
        };
    }
    let Person = class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    };
    Person = __decorate([
        enhancer()
    ], Person);
    let p = new Person('小天', 10);
    console.log(p.name);
})(b || (b = {}));
// 2、属性装饰器   装饰属性
/**
 * 属性装饰器表达式会在运行时当作函数调用，传入下列2个参数
 * 属性装饰器用来装饰属性
 * 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * 第二个参数是属性的名称
 */
/**
 * 方法装饰器用来装饰方法
 * 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * 第二个参数是方法的名称
 * 第三个方法是方法的描述符
 */
var c;
(function (c) {
    // target 如果装饰的是个普通属性 和 方法，那么这个target指向类的原型，Person.prototype
    // target 装饰的是一个类的属性static，那么这个target指向类的定义
    function upperCase(target, propertyName) {
        let value = target[propertyName]; // value:'tiantian'
        const getter = () => value;
        const setter = (newVal) => {
            value = newVal.toUpperCase();
        };
        delete target[propertyName]; // 删除 在下面添加新的
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
    function propertyEnumerable(flag) {
        return function (target, methodName) {
        };
    }
    function methodEnumerable(flag) {
        return function (target, methodName, propertyDescriptor) {
            propertyDescriptor.enumerable = flag; // 不可枚举   // propertyDescriptor 原来老的属性描述器
        };
    }
    function setAge(age) {
        return function (target, methodName, propertyDescriptor) {
            target.age = age;
        };
    }
    function toNumber(target, methodName, propertyDescriptor) {
        let oldMethod = propertyDescriptor.value; // propertyDescriptor.value 代表老的值老的方法sum()
        propertyDescriptor.value = function (...args) {
            args = args.map(item => parseFloat(item));
            return oldMethod.apply(this, args);
        };
    }
    class Person {
        constructor() {
            this.name = 'tiantian';
        }
        getName() {
            console.log('getname');
        }
        static getAge() {
        }
        sum(...args) {
            return args.reduce((accu, item) => accu + item, 0);
        }
    }
    __decorate([
        upperCase,
        propertyEnumerable(false) // 不可枚举
    ], Person.prototype, "name", void 0);
    __decorate([
        methodEnumerable(true) // 可枚举
    ], Person.prototype, "getName", null);
    __decorate([
        toNumber
    ], Person.prototype, "sum", null);
    __decorate([
        setAge(100)
    ], Person, "getAge", null);
    let p = new Person();
    p.name = 'gan';
    console.log(p.name);
    for (let item in p) {
        console.log('item=' + item);
    }
    console.log(Person.age);
    console.log(p.sum(1, '2', '3'));
})(c || (c = {}));
var d;
(function (d) {
    // 三个参数 当前类的原型:Person.prototype   方法名:login   索引:1
    function addAge(target, methodName, paramsIndex) {
        console.log('三个参数', target, methodName, paramsIndex);
        target.age = 10; // target加一个属性 age
    }
    // 参数装饰器 方法参数
    class Person {
        login(username, password) {
            console.log(this.age, username, password);
        }
    }
    __decorate([
        __param(1, addAge)
    ], Person.prototype, "login", null);
    let p = new Person();
    p.login('tiantian', '123');
})(d || (d = {}));
// 属性方法先执行，谁先写先执行谁
// 方法的时候，先参数再方法，而且 他们一定会在一起
// 最后是类
// 如果是同类型的，先执行后写的
