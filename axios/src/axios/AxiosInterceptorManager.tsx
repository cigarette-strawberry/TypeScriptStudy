
interface OnFulfilled<V> {
    (value: V): V | Promise<V>
}
interface OnRejected {
    (error: any): any
}

export interface Interceptor<V> {   // 某一个拦截器
    onFulfilled?: OnFulfilled<V>   // 成功的回调
    onRejected?: OnRejected   // 失败的回调
}

/* export interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
} */

// V 可能是 AxiosRequestConfig   也可能是 AxiosResponse
export default class AxiosInterceptorManager<V> {
    public interceptors: Array<Interceptor<V> | null> = []
    // 每当调用 use 的时候可以向拦截器管理器中添加一个拦截器
    use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
        this.interceptors.push({
            onFulfilled,
            onRejected
        })
        return this.interceptors.length - 1
    }
    eject(id: number) {
        if (this.interceptors[id]) this.interceptors[id] = null
    }
}