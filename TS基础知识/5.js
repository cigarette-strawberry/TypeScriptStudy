"use strict";
/**
 * 访问控制修饰符      private  protected  public
 * 只读属性           readonly
 * 静态属性           static
 * 抽象类、抽象方法    abstract
 */
var a;
(function (a_1) {
    // 抽象类   abstract
    /**
     * 抽象描述一种抽象的概念，无法被实例化，只能被继承
     * 无法创建抽象类的实例
     * 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
     */
    class Animal {
        constructor() {
            this.name = '猫';
        }
    }
    class Cat extends Animal {
        getName() {
            return this.name;
        }
    }
    let cat = new Cat();
    console.log(cat.getName());
    let point = { x: 0, y: 0 };
    // 类可以实现多个接口，但只能继承一个父类
    class Person {
        constructor() {
            this.x = 1;
            this.y = 1;
        }
        speak() {
            console.log('说');
        }
        eat() {
            console.log('吃');
        }
    }
    let p = new Person();
    p.speak();
    p.eat();
    let obj = {
        x: 1,
        y: 2,
        z: 3
    };
    class Person1 {
        speak() { }
        speakChinese() { }
    }
    let circle = {
        PI: 3.14,
        radius: 10
    };
    let cost = function (price) {
        return price * .8;
    };
    let arr = ['1', '2', '3'];
    console.log(arr);
    let obj2 = {
        1: '1',
        2: '2'
    };
    console.log(obj2);
    // 新的命名空间和上面代码单独开不冲突
    let a1;
    (function (a1) {
        class Dog {
            speak() { }
        }
        class Animal {
            constructor(name) {
                this.name = name;
            }
        }
        function createAnimal(clazz, name) {
            return new clazz(name);
        }
        let a = createAnimal(Animal, 'wunai');
    })(a1 || (a1 = {}));
    // 抽象类 VS 接口
    /**
     * 不同类之间公有的属性或方法，可以抽象成一个接口(Interfaces)
     * 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
     * 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述，既不提供方法的实现，也不为属性进行初始化
     * 一个类可以继承一个类或抽象类，但可以实现(implements)多个接口
     * 抽象类也可以实现接口
     */
})(a || (a = {}));
var b;
(function (b_1) {
    // 重写(override) VS 重载(overload)
    /**
     * 重写是指子类重写继承自父类中的方法
     * 重载是指为同一个函数提供多个类型定义
     */
    // 重写
    class Color {
        speak() {
            console.log('红');
        }
    }
    class Green extends Color {
        speak() {
            console.log('绿');
            super.speak(); // super代表父类的原型
            // class 中的 super，有两种指向，在静态方法和构造函数中；指向父类，在普通函数中，指向父类的prototype
        }
    }
    let g = new Green();
    g.speak();
    class Blue extends Color {
        speak() {
            console.log('蓝');
        }
    }
    let b = new Blue();
    b.speak();
})(b || (b = {}));
// 继承 VS 多态
/**
 * 继承(Inheritance)子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性，子类并不能继承的父类的静态方法
 * 多态(Polymorphism)由继承而产生了相关的不同的类，对同一个方法可以有不同的行为(重写)
 */ 
