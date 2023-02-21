// 泛型
/**
 * 泛型(Generics)是指在定义 函数、接口或类 的时候，不预先指定具体的类型，而在使用的时候再指定类型的类型的一种特性
 * 泛型 作用域只限于函数内部使用
 * 泛型 不能计算 + - * /
 * <T> 泛型里面的字母随意起，没有固定值
 * 泛型放在那里即约束那里
 */
namespace a {
    // 函数泛型
    function createArray<T>(length: number, value: T): Array<T> {
        let result: Array<T> = []
        for (let i = 0; i < length; i++) {
            result[i] = value
        }
        return result
    }
    let result = createArray<number>(3, 1)
    console.log(result);
    let result2 = createArray<string>(3, '1')   // 相当于一个参数
    console.log(result2);

    // 类数组 ArrayLike arguments
    function sum(...arg: any[]) {
        let args: IArguments = arguments
        for (let i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }
    sum(1, 2, 3, '无奈')

    /* let root: HTMLElement | null = document.getElementById('root')
    let children: HTMLCollection = root!.children
    let childNodes: NodeListOf<ChildNode> = root!.childNodes */

    // 类泛型
    class MyArray<T>{
        private list: T[] = []
        add(value: T) {
            this.list.push(value)
        }
        getMax(): T {
            let result: T = this.list[0]
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i] > result) {
                    result = this.list[i]
                }
            }
            return result
        }
    }
    let arr = new MyArray<number>()
    arr.add(1)
    arr.add(2)
    arr.add(3)
    let result3: number = arr.getMax()
    console.log(result3);

    // 接口泛型
    interface Calculate {
        <T>(a: T, b: T): T
    }
    let add: Calculate = function <T>(a: T, b: T): T {
        return a
    }
    let result4 = add<number>(10, 100)
    console.log(result4);

    // 接口泛型 这个也是
    interface Cart<T> {
        list: T[]
    }
    let cart: Cart<string> = {
        list: ['1', '2', '3']
    }

    // 多个类型参数 如何在不增加中间变量的情况下，交换两个变量的值
    function swap<A, B>(tuple: [A, B]): [B, A] {
        return [tuple[1], tuple[0]]
    }
    let result5 = swap<string, number>(['无奈', 1])
    console.log(result5);

    // 默认泛型类型
    function createArr<T = string>(length: number): T | null {
        let t: T | null = null
        return t
    }
    let result6 = createArr<boolean>(3)

    // 泛型的约束
    // 在函数中使用泛型的时候，由于预先并不知道具体的类型，所以不能访问相应类型的方法
    interface LengthWise {
        length: number
    }
    function logger<T extends LengthWise>(value: T) {
        console.log(value.length);
    }
    logger('wunai')

    // 泛型类型别名
    type Cart2<T> = { list: T[] } | T[]
    let c1: Cart2<string> = { list: ['1'] }
    let c2: Cart2<string> = ['1']
    // interface 定义一个实实在在的接口，它是一个真正的类型
    // type 一般用来定义别名，并不是一个真正的类型
    /**
     * 泛型接口 VS 泛型类型别名
     * 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
     * 类型别名不能被 extends 和 implements，这时我们应该尽量使用接口代替类型别名
     * 当我们需要使用联合类型或者元组类型的时候，类型别名会更合适
     */
}