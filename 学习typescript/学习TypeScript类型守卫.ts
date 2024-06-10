namespace TypeGuard {
  // 类型守卫

  // 1.类型收缩 | 类型收窄
  // typeof 是由缺陷的 比如说 数组 对象 null 它返回的都是object; 函数 返回的是function
  const isString = (val: any): val is string => typeof val === 'string'

  const isArr = (arr: any): arr is number[] => arr instanceof Array

  // 2.类型谓词 | 自定义守卫
  // 实现一个函数,该函数可以传入任意类型
  // 如果是object 就检查里面的属性,如果里面的属性是number就取两位小数
  // 如果是string就去除左右空格
  // 如果是函数就执行

  // 发现没有任何代码提示 原因是any类型
  // 自定义守卫 它只能接受布尔值
  // 语法规则 参数 is 类型
  // 这个函数如果返回true 那么这个参数就是我们想要的类型

  const isObj = (obj: any) => ({}.toString.call(obj) === '[object Object]')
  const isNum = (num: any): num is number => typeof num === 'number'
  const isFn = (fn: any): fn is Function => typeof fn === 'function'

  const format = (data: any) => {
    let val
    Object.keys(data).forEach(key => {
      val = data[key]
      if (isObj(data)) {
        if (isNum(val)) {
          data[key] = val.toFixed(2)
        }
      }
      if (isString(val)) {
        data[key] = val.trim()
      }
      if (isArr(val)) {
        val.push(4, 5)
      }
      if (isFn(val)) {
        data[key]()
      }
    })
  }

  const obj = {
    name: '   123  ',
    age: 123.666,
    arr: [1, 2, 3],
    fn: () => {
      console.log(obj)
    }
  }

  format(obj)
}
