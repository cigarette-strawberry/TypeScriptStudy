/**
 * 类型保护
 * 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
 * 类型保护就是能够通过关键字判断出分支中的类型
 */
function double(input: string | number | boolean) {
    if (typeof input === 'string') {
        input.toLocaleLowerCase()
    } else if (typeof input === 'number') {
        input.toFixed(2)
    } else {
        input
    }
}

class Animal {
    public name: string = 'tiantian'
}
class Bird extends Animal {
    public swing: number = 2
}
function getName(a: Animal) {
    if (a instanceof Bird) {
        a.swing
    } else {
        a.name
    }
}

/* null保护 */
function getFirstLetter(s: string | null) {
    /* 一  if (s === null) {
         s = ''
     } */
    /* 二  s = s || '' */
    // 下面是三
    function ensure() {
        s = s || ''
    }
    ensure()
    return s.charAt(0)
}

/**
 * 链式判断运算符
 * 链式判断运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?.
 * 如果运算符左侧的操作数 ?. 计算为 null 或 undefined，则表达式求值为 undefined。否则，正常触发目标属性访问，方法或函数调用
 *    a?.b   // 如果a是 null/undefined ,那么返回undefined，否则返回 a?.b 的值
 */
let aa = { bb: 5 }
console.log(aa?.bb);

/**
 * 可辨识的联合类型
 * 就是利用联合类型中的共有字段进行类型保护的一种技巧
 * 相同字段的不同取值就是可辨识
 */
interface WarningButton {
    class: 'warning',
    text1: '警告'
}
interface DangerButton {
    class: 'danger',
    text2: '删除'
}
type Button = WarningButton | DangerButton
function getButton(button: Button) {
    if (button.class === 'warning') {
        button.text1
    } else {
        button.text2
    }
}

interface Bird {
    swing: number
}
interface Dog {
    leg: number
}
function getNumber(x: Bird | Dog) {
    if ('swing' in x) {
        x.swing
    } else {
        x.leg
    }
}

/**
 * 类型的自定义保护
 * TypeScript里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
 * 要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
 * 类型谓词的语法为 parameterName is Type 这种形式，其中，parameterName 必须是当前函数签名里的一个参数名
 * */
interface Red {
    name1: 'red'
    color: string
}
interface Green {
    name2: 'green'
    color: string
}
function isRed(x: Red | Green): x is Red {
    return x.color == 'blue'
}
function getColor(x: Red | Green) {
    if (isRed(x)) {
        console.log(x.name1);
    } else {
        console.log(x.name2);
    }
}
let x: Red = { name1: 'red', color: 'blue' }
getColor(x)
