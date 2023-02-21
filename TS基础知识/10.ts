/* 模块 VS 命名空间 */
export let a = 1
export let b = 2
export default 3

// import { a, b } from './10'

/* namespace 第一个作用是封装类似的代码 第二个作用是防止命名冲突 */
namespace zoo {
    export class Dog {

    }
}
namespace home {
    class Dog {

    }
}
let dog = new zoo.Dog()
// let dog1 = new home.Dog()

/* 声明文件   declare */
declare const $: (selector: string) => {
    click(): void
    width(length: number): void
}
// ----------------------------------

/* $('#root').click()
$('#root').width(100) */

declare let name: string
declare let age: number
declare function getName(): string
declare class Animal { name: string }

interface Person6 {
    name: string
}
type Student = Person6 | string

declare const enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}
let seasons: Seasons[] = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]
console.log(seasons);

// 定义一个复杂的对象
declare namespace jQuery {
    function ajax(url: string, config: any): void
    let name: string
    namespace fn {
        function extend(object: any): void
    }
}
jQuery.ajax('/api/users', {})
jQuery.name
jQuery.fn.extend({})