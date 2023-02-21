"use strict";
//  类   如何定义类
// namespace   定义一个命名空间 确保类名不会重复
var a;
(function (a) {
    class Person {
        constructor() {
            this.name = '清欢';
            this.age = 12;
        }
    }
    let P1 = new Person();
    console.log(P1.name);
    console.log(P1.age);
})(a || (a = {}));
var b;
(function (b) {
    // 存取器 getter setter   通过存取器可以改变一个类中属性的读取和赋值行为
    class Person {
        constructor(name) {
            this.myName = name;
        }
        get name() {
            return this.myName;
        }
        set name(newVal) {
            this.myName = newVal;
        }
    }
    let P1 = new Person('清欢');
    console.log(P1.name); // 清欢
    P1.name = '小雪';
    console.log(P1.name); // 小雪
})(b || (b = {}));
var c;
(function (c) {
    class Person {
        // public 相当于把 name属性 自动赋值到当前这个类的实例上
        // readonly 只读属性 不能赋值
        constructor(name) {
            this.name = name;
        }
    }
    let p = new Person('大学');
    p.name;
    // p.name = 123
})(c || (c = {}));
// 继承
/**
 * 子类继承父类后子类的实例上就拥有了父类中的属性和方法
 * strictPropertyInitialization   强制属性初始化(在tsconfig.json中)
 *
 *
 * 访问修饰符 public:公开的   protected:受保护的   private:私有的
 * public      自己 自己的子类 和 其它类都能访问到
 * protected   受保护的 自己 和 自己的子类都能访问 其它类不能访问
 * private     私有的 只能自己访问 自己的子类不能访问 其它类更不能访问
 *
 *
 * 静态属性 静态方法    不需要实例化 类本身的实例和方法
 */
var d;
(function (d) {
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        getName() {
            return this.name + this.age;
        }
        setAge(newAge) {
            return this.age = newAge;
        }
    }
    class Student extends Person {
        // school: string
        constructor(name, age, school) {
            super(name, age);
            this.school = school;
            // this.school = school
        }
        static getType() {
            return Student.type;
        }
        getSchool() {
            return this.school;
        }
        setSchool(newSchool) {
            return this.school = newSchool;
        }
    }
    Student.type = '静态';
    let s = new Student('小天', 10, '家里蹲');
    console.log(s.getSchool());
    console.log(s.setSchool('物理系'));
    console.log(Student.type);
    console.log(Student.getType());
})(d || (d = {}));
