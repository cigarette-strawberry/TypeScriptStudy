namespace a {
    /* 交叉类型 */
    interface Bird {
        name: string
        fly(): void
    }
    interface Person {
        name: string
        eat(): void
    }
    // 交叉类型其实就是两个接口类型的属性的并集
    type BirdMan = Bird & Person
    let p: BirdMan = {
        name: 'tiantian',
        fly() { },
        eat() { }
    }
}

namespace b {
    /* typeof 可以获取一个变量的类型 */
    let p = {
        name: "tiantian",
        age: 12
    }
    /* type 用来定义类型   let var 只能定义值 */
    type Person = typeof p
    let p2: Person = {
        name: 'didi',
        age: 20
    }
    /* 我们可以通过[]来获取一个类型的子类型 */
    interface Person2 {
        name: string
        age: number
        job: {
            name: string
        }
        interests: { name: 'string', level: number }[]
    }
    let myname: Person2['job']['name'] = 'tiantian'
    let mylevel: Person2['interests'][0]['level'] = 10
    console.log(myname, mylevel);
    /* keyof 索引类型查询操作符 */
    interface Person3 {
        name: string,
        age: number,
        gender: 'male' | 'female',
    }
    type Person3Keys = keyof Person3   // => 返回一个接口的key集合
    function getValueByKey(val: Person3, key: Person3Keys): any {
        return val[key]
    }
    let Person3: Person3 = {
        name: 'didi',
        age: 10,
        gender: 'male',
    }
    let name = getValueByKey(Person3, 'name')
    console.log('name', name);
    /* 在定义的时候用in操作符去批量定义 */
    interface Person4 {
        name: string
        age: number
        gender: 'male' | 'female'
    }
    /* type PartialPerson = {
        [key in keyof Person4]?: Person4[key]
    } */

    // 实现原理   Partial
    /* type Partial<T> = {
        [key in keyof T]?: T[key]
    } */
    type PartialPerson = Partial<Person4>   //Partial 可选
    let p4: PartialPerson = {
        name: 'tiantian',
        age: 10,
        gender: 'female',
    }

    // 实现原理   Required
    /* type Required<T> = {
        [key in keyof T]-?: T[key]
    } */
    type RequiredPerson = Required<Person4>   //Required 不可选 必填
    let p5: RequiredPerson = {
        name: "tiantian",
        age: 123,
        gender: 'female'
    }

    // 实现原理   Readonly
    /* type Readonly<T> = {
        readonly [key in keyof T]: T[key]
    } */
    type ReadOnlyPerson = Readonly<Person4>   // Readonly 只读
    let p6: ReadOnlyPerson = {
        name: "tiantian",
        age: 123,
        gender: 'female'
    }
    // p6.name = 'didi'

    // 实现原理   Pick
    /* type Pick<T, K extends keyof T> = {
        [key in K]: T[key]
    } */
    type PickPerson = Pick<Person4, 'name'>   // Pick 从大类型中挑选一个小类型
    let x: PickPerson = {
        name: 'name'
    }
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
}
namespace c {
    /* 条件类型 */
    interface Fish {
        name1: string
    }
    interface Fish2 {
        name1: string,
        age: number
    }
    interface Water {
        name2: string
    }
    interface Bird {
        name3: string
    }
    interface Sky {
        name4: string
    }
    type Condition<T> = T extends Fish ? Water : Sky
    let condition: Condition<Fish2> = {
        name2: 'tiantian'
    }

    /* 条件类型的分发 */
    type Condition2<T> = T extends Fish ? Water : Sky
    // Condition2 < Fish | Bird > = Water | Sky
    let c1: Condition2<Fish | Bird> = { name2: '水' }
    let c2: Condition2<Fish | Bird> = { name4: '天空' }
    let c3: Water | Sky = { name2: '水' }
    let c4: Water | Sky = { name4: '天空' }
}

namespace d {
    type E = Exclude<string | number, string>
    let e: E = 10

    type E2 = Extract<string | number | null, string>
    let e2: E2 = 'hello'

    type E3 = NonNullable<string | number | undefined | null>
    let e3: E3 = 'hello'
    let e4: E3 = 10

    // redux 会用到的ReturnType   返回值的类型
    function getUserInfo() {
        return { name: 'tiantian', age: 10 }
    }
    type UserInfo = ReturnType<typeof getUserInfo>
    let user: UserInfo = { name: 'didi', age: 12 }

    // InstanceType 获取构造函数的实例类型
    class Person5 {
        name: string
        constructor(name: string) {
            this.name = name
        }
    }
    type P = InstanceType<typeof Person5>
    let p: P = new Person5('tiantian')
}