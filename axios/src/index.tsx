import axios, { AxiosResponse, AxiosRequestConfig } from './axios/index'
// import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
const baseURL = 'http://localhost:8080'
// 它指的是服务器返回的对象
interface User {
    name: string,
    password: string
}
let user: User = {
    name: 'xiaowu',
    password: '123456'
}

const CancelToken = axios.cancelToken
const isCancel = axios.isCancel
const source = CancelToken.source()

console.time('cost')
/* 
    interceptors = {
        onFufilled: (val:any) => any
        onRejected: (error) => error
    }

    axios.interceptors = {
        request: [interceptors1,interceptors2,interceptors3],
        response: [interceptors1,interceptors2,interceptors3]
    }
*/
// 请求拦截器先加的后执行
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers && (config.headers.name += '1')
    console.timeEnd('cost')
    return config
}, (error: any): any => Promise.reject(error))

let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers && (config.headers.name += '2')
    return config
}, (error: any): any => Promise.reject(error))

axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    return new Promise(function (resolve) {
        setTimeout(() => {
            config.headers && (config.headers.name += '3')
            resolve(config)
        }, 3000);
    })
    // return config
    // return Promise.reject('请求失败')
}, (error: any): any => Promise.reject(error))
axios.interceptors.request.eject(request)


// 响应拦截器
axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '1'
    return response
})

let response = axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '2'
    return response
})

axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '3'
    return response
})
axios.interceptors.response.eject(response)


// get请求
axios({
    method: 'get',   // 方法名
    url: baseURL + '/get',   // 访问路径
    params: user   // 查询参数对象，它会转成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
    console.log('get请求', response);
    return response.data   // (property) AxiosResponse<User>.data: User
}).catch((error: any) => {
    console.log(error);
})


// post请求
axios({
    method: 'post',   // 方法名
    url: baseURL + '/post',   // 访问路径
    headers: {
        'content-type': 'application/json',
        'name': 'xiaowu'
    },
    cancelToken: source.token,
    data: user   // 查询参数对象，它会转成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
    console.log('post请求', response);
    return response.data   // (property) AxiosResponse<User>.data: User
}).catch((error: any) => {
    if (isCancel(error)) {
        console.log('isCancel用户取消了请求', error);
    } else {
        console.log(error);
    }

})
source.cancel('用户取消了请求')


// 超时请求
/* axios<User>({
    method: 'post',   // 方法名
    url: baseURL + '/post_timeout?timeout=3000',   // 访问路径
    headers: {
        'content-type': 'application/json'
    },
    timeout: 1000,
    data: user   // 查询参数对象，它会转成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
    console.log('超时请求', response);
    return response.data   // (property) AxiosResponse<User>.data: User
}).catch((error: any) => {
    console.log(error);
}) */


// 状态码错误请求
/* axios<User>({
    method: 'post',   // 方法名
    url: baseURL + '/post_status?code=400',   // 访问路径
    headers: {
        'content-type': 'application/json'
    },
    data: user   // 查询参数对象，它会转成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
    console.log('状态码错误请求', response);
    return response.data   // (property) AxiosResponse<User>.data: User
}).catch((error: any) => {
    console.log(error);
}) */