//  类   如何定义类

// namespace   定义一个命名空间 确保类名不会重复
namespace a {
    class Person {
        name: string = '清欢';
        age: number
        constructor() {
            this.age = 12
        }
    }
    let P1 = new Person()
    console.log(P1.name);
    console.log(P1.age);
}

namespace b {
    // 存取器 getter setter   通过存取器可以改变一个类中属性的读取和赋值行为
    class Person {
        myName: string
        constructor(name: string) {
            this.myName = name
        }
        get name() {
            return this.myName
        }
        set name(newVal: string) {
            this.myName = newVal
        }
    }
    let P1 = new Person('清欢')
    console.log(P1.name);   // 清欢
    P1.name = '小雪'
    console.log(P1.name);   // 小雪
}

namespace c {
    class Person {
        // public 相当于把 name属性 自动赋值到当前这个类的实例上
        // readonly 只读属性 不能赋值
        constructor(public readonly name: string) {

        }
    }
    let p = new Person('大学')
    p.name
    // p.name = 123
}

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

namespace d {
    class Person {
        name: string
        age: number
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }
        getName() {
            return this.name + this.age
        }
        setAge(newAge: number) {
            return this.age = newAge
        }
    }
    class Student extends Person {
        static type = '静态'
        // school: string
        constructor(name: string, age: number, public school: string) {
            super(name, age)
            // this.school = school
        }
        static getType() {
            return Student.type
        }
        getSchool() {
            return this.school
        }
        setSchool(newSchool: string) {
            return this.school = newSchool
        }
    }
    let s = new Student('小天', 10, '家里蹲')
    console.log(s.getSchool());
    console.log(s.setSchool('物理系'));
    console.log(Student.type);
    console.log(Student.getType());

}