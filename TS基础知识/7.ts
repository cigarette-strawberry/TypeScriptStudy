// 结构类型系统
/**
 * 接口的兼容性
 * 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
 * 原理是 Duck-Check，就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
 */
// 接口的兼容性 ts跟类型无关 只和属性有关 属性里面必须有想要的才可以
namespace a {
    interface Animal {
        name: string
        age: number
    }
    interface Person {
        name: string
        age: number
        speak: (words: string) => void
    }
    function getName(animal: Animal): string {
        return animal.name
    }
    let p: Animal = {
        name: 'tiantian',
        age: 10
    }
    let p1: Person = {
        name: 'hehe',
        age: 10,
        speak() { }
    }
    console.log(getName(p));
    console.log(getName(p1));
}
namespace b {
    /* 基本类型的兼容性 */
    let num: string | number = 1
    let str: string = 'hello'
    num = str

    let num2: {
        toString(): string
    }
    let str2: string = '天天'
    num2 = str2

    /* 类的兼容性 跟 类型无关 */
    class Animal {
        name: string
    }
    class Bird extends Animal {
        // swing: number
    }
    let a: Animal
    a = new Bird()

    let b: Bird
    b = new Animal()
    b = { name: 'tiantian' }  // 不管这个对象的具体类型，只要属性有就可以
}
namespace c {
    /* 函数的兼容性
     比较参数 */
    type sumFunction = (a: number, b: number) => number
    let sum: sumFunction
    function f1(a: number, b: number): number {
        return a
    }
    sum = f1
    function f2(a: number): number {
        return a
    }
    sum = f2
    function f3(): number {
        return 1
    }
    sum = f3
    function f4(a: number, b: number, c: number): number {
        return a
    }
    // sum = f4 // 参数可以少 但是不能多

    /* 比较返回值 */
    type GetPerson = () => { name: string, age: number }
    let getperson: GetPerson
    function g1() {
        return { name: 'tiantian', age: 10 }
    }
    getperson = g1

    function g2() {
        return { name: 'tiantian' }
    }
    // getperson = g2 // 不能少返回值

    function g3() {
        return { name: 'tiantian', age: 10, home: 'shanghai' }
    }
    getperson = g3

    /* interface T {
        name: string
    }
    let t: T = { name: 'tiantian', age: 10 } */   // 直接赋值不考虑其兼容性

    /* 函数参数的协变 */
    type logFunc = (a: number | string) => void
    let log: logFunc
    function log1(a: number | string | boolean) {
        console.log(a);
    }
    log = log1
    function log2(a: number) {
        console.log(a);
    }
    // log = log2 // 只能多 不能少

    /* 判断兼容性的时候先判断具体的类型再进行兼容性判断 */
    interface Empty<T> {
        // data: T
    }
    let x!: Empty<string> // {data:string}
    let y!: Empty<number> // {data:string}
    x = y

    interface NotEmptyString<T> {
        data: string
    }
    interface NotEmptyNumber<T> {
        data: number
    }

    /**
     * 枚举的兼容性
     * 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
     * 不同枚举类型之间是不兼容的
     */
    enum Colors {
        Red, Yellow
    }
    let c: Colors
    c = Colors.Red //=>0
    c = 1
    let d: number
    d = Colors.Yellow //=>1
}