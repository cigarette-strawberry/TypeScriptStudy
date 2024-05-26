/**
 * 装饰器
 * 1.类装饰器 ClassDecorator target 构造函数
 * 2.属性装饰器
 * 3.参数装饰器
 * 4.方法装饰器 PropertyDescriptor
 * 5.装饰器工厂
 * 6.import 'reflect-metadata'
 * 7.axios/fetch
 */
import 'reflect-metadata'

const Base = (name: string) => {
  const fn: ClassDecorator = target => {
    // console.log(target)
    target.prototype.name = name
    target.prototype.age = 18
    target.prototype.fn = (): void => {
      // console.log('ClassDecorator')
    }
  }
  return fn
}

const Get = (url: string) => {
  const fn: MethodDecorator = (target, propertyKey, descriptor: PropertyDescriptor) => {
    // console.log(target, propertyKey, descriptor)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data.result)
        const key = Reflect.getMetadata('key', target)
        // console.log(key)

        descriptor.value(key ? data.result[key] : data.result)
      })
  }
  return fn
}

const Result = () => {
  const fn: ParameterDecorator = (target, propertyKey, parameterIndex) => {
    // console.log(target, propertyKey, parameterIndex)
    Reflect.defineMetadata('key', 'list', target)
  }
  return fn
}

const Name = () => {
  const fn: PropertyDecorator = (target, propertyKey) => {
    console.log(target, propertyKey)
  }
  return fn
}

// 传递参数就使用函数柯里化
@Base('zxc')
// @Base()
class Http {
  @Name()
  name: string
  constructor() {
    this.name = 'zxc'
  }
  // 方法装饰器
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=1&size=10')
  // 参数装饰器   tips：参数装饰器优先于方法装饰器
  getData(@Result() data: any) {
    // console.log(data)
  }
  add() {}
}
// Base(Http) // 等同于 @Base

const http: any = new Http()

http.fn()

// console.log(http.name, http.age)

// ---------------------------------------------------------------------------
