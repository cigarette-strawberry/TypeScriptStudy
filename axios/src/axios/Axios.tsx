
import { AxiosRequestConfig, AxiosResponse } from './types'
import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager'
import qs from 'qs'
import parseHeaders from 'parse-headers'
let defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: { // 请求头
        common: { // 针对所有方法的请求生效
            name: 'ceshi',
            accept: 'application/json' // 指定告诉服务器返回JSON格式的数据
        }
    },
    transformRequest: (data: any, headers: any) => {
        headers['common']['content-type'] = 'application/json'
        return JSON.stringify(data)
    },
    transformResponse: (response: any) => {
        return response.data
    }
}
let getStyleMethods = ['get', 'head', 'delete', 'options'] // get风格的请求
getStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {

    }
})
let postStyleMethods = ['post', 'put', 'patch'] // post风格的请求
postStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {
        'content-type': 'application/json'
    }
})
let allMethods = [...getStyleMethods, ...postStyleMethods]
export default class Axios<T> {
    // T 用来限制响应对象 response 里的 data 的类型
    public defaults: AxiosRequestConfig = defaults
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    request(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        // return this.dispatchRequest(config)
        config.headers = Object.assign(this.defaults.headers, config.headers)
        if (config.transformRequest && config.data) {
            config.data = config.transformRequest(config.data, config.headers)
        }
        // const chain: Interceptor<AxiosRequestConfig | AxiosResponse<T>>[] = [
        const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> = [
            {
                onFulfilled: this.dispatchRequest,
                onRejected: (error: any) => error
            }
        ]
        // [request1,request]   [request2,request1,request]   [request3,request2,request1,request]
        this.interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
            // 向数组的左侧 头部 添加一个元素
            interceptor && chain.unshift(interceptor)
        })
        // [request3,request2,request1,request,request1,request2,request3]
        this.interceptors.response.interceptors.forEach((interceptor: Interceptor<AxiosResponse<T>> | null) => {
            // 向数组的有侧 尾部 添加一个元素
            interceptor && chain.push(interceptor)
        })
        let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> = Promise.resolve(config)
        while (chain.length) { // 如果长度大于0
            const { onFulfilled, onRejected } = chain.shift()! // unshift向数组的头部添加元素   shift从数组的头部删除元素并返回这个元素
            promise = promise.then(onFulfilled, onRejected)
        }
        return promise
    }
    // 定义一个派发请求的方法
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>(function (resolve, reject) {
            let { method, url, params, headers, data, timeout } = config
            let request = new XMLHttpRequest()
            if (params) {
                params = qs.stringify(params)
                url += ((url!.indexOf('?') === -1 ? '?' : '&') + params)
            }
            request.open(method!, url!, true)
            request.responseType = 'json'
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status !== 0) {
                    if (request.status >= 200 && request.status < 300) {
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        if (config.transformResponse) {
                            response = config.transformResponse(response)
                        }
                        resolve(response)
                    } else {
                        reject(`Error: Request failed with status code ${request.status}`)
                    }
                }
            }
            /* if (headers) {
                for (const key in headers) {
                    request.setRequestHeader(key, headers[key])
                }
            } */
            if (headers) {
                for (const key in headers) {
                    /* 
                        headers:{
                            common:{accept: 'application/json'},
                            post:{'content-type': 'application/json'}
                        }
                    */
                    if (key === 'common' || allMethods.includes(key)) {
                        if (key === 'common' || key === config.method) {
                            for (const key2 in headers[key]) {
                                request.setRequestHeader(key2, headers[key][key2])
                            }
                        }
                    } else {
                        request.setRequestHeader(key, headers[key])
                    }
                }
            }

            let body: string | null = null
            if (data) body = JSON.stringify(data)

            request.onerror = function () {
                reject('net:ERR_INTERNET_DISCONNECTED')
            }

            if (timeout) {
                request.timeout = timeout
                request.ontimeout = function () {
                    reject(`Error: timeout of ${timeout}ms exceeded`)
                }
            }

            if (config.cancelToken) {
                config.cancelToken.then((message: string) => {
                    request.abort()
                    reject(message)
                })
            }

            request.send(body)
        })
    }
}