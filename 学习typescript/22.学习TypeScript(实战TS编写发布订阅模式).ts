/**
 * 1.发布订阅模式 是设计模式中的一种
 * 2.面试中经常问 其次让手写 他的思想被人们广泛使用
 * 3.有谁在用 vue2 eventBus $on监听 $emit触发
 * 4.electron ipcMain ipcRenderer 通讯
 * 5.DOM2 addEventListener removeEventListener
 * 监听器
 */

namespace twenty_two {
  // 用法
  /* const cb = () => {
  console.log('触发了')
}

document.addEventListener('asdad', cb, {
  once: true // 触发一次
})

document.removeEventListener('asdad', cb) // 支持删除监听器函数 加上这段代码 就不会继续向下执行了

const e = new Event('asdad') // 订阅中心

document.dispatchEvent(e)
document.dispatchEvent(e)
document.dispatchEvent(e)
document.dispatchEvent(e)
document.dispatchEvent(e) */

  // 手写 发布订阅模式
  interface I {
    events: Map<string, Function[]>
    once: (event: string, callback: Function) => void // 触发一次订阅器
    on: (event: string, fn: Function) => void // 订阅
    emit: (event: string, ...args: any[]) => void // 派发
    off: (event: string, callback: Function) => void // 删除
  }
  // 实现 once on emit off 订阅中心Map<事件的名称,[Function]订阅者集合>
  class Emitter implements I {
    events: Map<string, Function[]>
    constructor() {
      this.events = new Map()
    }
    once(event: string, callback: Function) {
      // 先创建一个自定义函数 通过On 触发 触发完成后立马通过Off 回收
      const fn = (...args: any[]) => {
        callback(...args)
        this.off(event, fn)
      }
      this.on(event, fn)
    }
    on(event: string, callback: Function) {
      if (this.events.has(event)) {
        const callbackList = this.events.get(event)
        callbackList && callbackList.push(callback)
      } else {
        this.events.set(event, [callback])
      }
    }
    emit(event: string, ...args: any[]) {
      const callbackList = this.events.get(event)
      if (callbackList) {
        callbackList.forEach(cb => {
          cb(...args)
        })
      }
    }
    off(event: string, callback: Function) {
      const callbackList = this.events.get(event)
      if (callbackList) {
        const index = callbackList.findIndex(cb => cb === callback)
        if (index > -1) {
          callbackList.splice(index, 1)
        }
      }
    }
  }

  const bus = new Emitter()

  const fn = (a: boolean, b: string) => {
    console.log(a, b)
  }

  // bus.on('asdad', fn)

  // bus.off('asdad', fn)

  bus.once('asdad', fn)

  bus.emit('asdad', true, '123')
  bus.emit('asdad', true, '123')
  bus.emit('asdad', true, '123')

  console.log(bus)
}
