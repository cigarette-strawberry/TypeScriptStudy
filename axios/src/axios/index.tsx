import Axios from './Axios';
import { AxiosInstance } from './types'
import { CancelToken, isCancel } from './cancel'
// 可以创建一个axios的实例 axios其实就是一个函数
// 定义一个类的时候，一个是类的原型，Axios.prototype 一个是类的实例
function createInstance(): AxiosInstance {
    let context: Axios<any> = new Axios() // this指针上下文
    // 让 request 方法里的 this 永远指向 context 也就是 new Axios()
    let instance = Axios.prototype.request.bind(context)
    // 把 Axios 的类的实例和类的原型上的方法都拷贝到 instance 上，也就是 request 方法上
    instance = Object.assign(instance, Axios.prototype, context)
    return instance as AxiosInstance
}
let axios = createInstance()

axios.cancelToken = new CancelToken()
axios.isCancel = isCancel

export default axios

export * from './types'