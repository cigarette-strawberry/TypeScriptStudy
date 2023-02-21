/**
 * 访问控制修饰符      private  protected  public
 * 只读属性           readonly
 * 静态属性           static
 * 抽象类、抽象方法    abstract
 */

namespace a {
    // 抽象类   abstract
    /**
     * 抽象描述一种抽象的概念，无法被实例化，只能被继承
     * 无法创建抽象类的实例
     * 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
     */
    abstract class Animal {
        name: string = '猫'
        abstract getName(): string
    }
    class Cat extends Animal {
        getName(): string {
            return this.name
        }
    }
    let cat = new Cat()
    console.log(cat.getName());


    // 接口   interface中可以用分号或者逗号分割每一项，也可什么都不加
    /**
     * 接口一方面可以在面向对象编程中表示为 行为的抽象，另外可以用来描述 对象的形状
     * 接口就是把一些类中共有的属性和方法抽象，可以用来约束实现此接口的类
     * 一个类可以继承另一个类并实现多个接口
     * 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
     * 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类可以有多个子类，但只能有一个父类
     */
    // 1、可以用来描述对象的形状，指的是对象有哪些属性，属性是什么类型
    interface Point {
        x: number
        y: number
    }
    let point: Point = { x: 0, y: 0 }

    // 2、还可以用来描述行为的抽象
    interface Speakable {
        speak(): void   // 因为接口里所不能放实现，只能放定义，所有的方法都是抽象的
    }
    interface Eatable {
        eat(): void
    }

    // 类可以实现多个接口，但只能继承一个父类
    class Person implements Point, Speakable, Eatable {
        x: number = 1
        y: number = 1
        speak() {
            console.log('说');
        }
        eat() {
            console.log('吃');
        }
    }
    let p = new Person()
    p.speak()
    p.eat()

    // 3、任意属性
    interface PlainObject {
        // x: number,
        // y: number
        [propName: string]: number
    }
    let obj: PlainObject = {
        x: 1,
        y: 2,
        z: 3
    }

    // 4、接口的继承
    interface Speakable {
        speak(): void
    }
    interface SpeakChinese extends Speakable {
        speakChinese(): void
    }
    class Person1 implements SpeakChinese {
        speak() { }
        speakChinese() { }
    }

    // 接口的readonly
    interface Circle {
        readonly PI: number
        radius: number
    }
    let circle: Circle = {
        PI: 3.14,
        radius: 10
    }
    // circle.PI = 3.15

    // 接口还可以用来约束函数
    interface Discount {
        (price: number): number
    }
    let cost: Discount = function (price: number): number {
        return price * .8
    }

    // 可索引接口
    // 是用来对数组和对象进行约束
    interface UserInterface {
        [index: number]: string
    }
    let arr: UserInterface = ['1', '2', '3']
    console.log(arr);
    let obj2: UserInterface = {
        1: '1',
        2: '2'
    }
    console.log(obj2);

    // 新的命名空间和上面代码单独开不冲突
    namespace a1 {
        // 类的接口 可以用接口来装饰类 学TS的核心 要学会的两个重要点 接口+泛型
        interface Speakable {
            name: string
            speak(words: string): void
        }
        class Dog implements Speakable {
            name: string
            speak() { }
        }
        class Animal {
            constructor(public name: string) { }
        }
        // 约束构造函数类型 使用new来约束
        interface WithNameClass {
            new(name: string): Animal
        }
        function createAnimal(clazz: WithNameClass, name: string) {
            return new clazz(name)
        }
        let a = createAnimal(Animal, 'wunai')
    }


    // 抽象类 VS 接口
    /**
     * 不同类之间公有的属性或方法，可以抽象成一个接口(Interfaces)
     * 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
     * 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述，既不提供方法的实现，也不为属性进行初始化
     * 一个类可以继承一个类或抽象类，但可以实现(implements)多个接口
     * 抽象类也可以实现接口
     */
}

namespace b {
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
            super.speak()   // super代表父类的原型
            // class 中的 super，有两种指向，在静态方法和构造函数中；指向父类，在普通函数中，指向父类的prototype
        }
    }
    let g = new Green()
    g.speak();
    class Blue extends Color {
        speak() {
            console.log('蓝');
        }
    }
    let b = new Blue()
    b.speak();
}

// 继承 VS 多态
/**
 * 继承(Inheritance)子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性，子类并不能继承的父类的静态方法
 * 多态(Polymorphism)由继承而产生了相关的不同的类，对同一个方法可以有不同的行为(重写)
 */