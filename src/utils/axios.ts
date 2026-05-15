/* 
*author Xu
*date 2026-05-13
*QQ 897438918
* * */
const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import router from './../router'
import Api from './../api'

// console.log('router=>', router)
// console.log('config=>', config)

//1.实例
const service = axios.create({
    baseURL: config.baseApi || config.mockApi,
    timeout: 6 * 1000
})
//2.拦截器
// 添加请求拦截器
service.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    let data = window.sessionStorage.getItem('userinfo') || '{}'
    let { token = '' } = JSON.parse(data)
    let header = config.headers
    if (!header.Authorization) header.Authorization = 'Bearer ' + token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
let isRefreshing = false
service.interceptors.response.use((res: any) => {
    if (!res.data.code) {
        return res.data
    }
    console.log('res',res)
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { data, msg, code } = res.data
    if (code == 200) {
        return data
    } else if (code == 501) {
        ElMessage({
            message: TOKEN_INVALID,
            type: 'error'
        })
        router.push('./login')
        return Promise.reject(TOKEN_INVALID)
    } else if (code == 401) {
        if (!isRefreshing) {
            isRefreshing = true
            ElMessage({
                message: msg,
                type: 'error',
            })
            // 获取本地缓存中的RefreshToken
            const { refreshToken } = JSON.parse(sessionStorage.getItem('userinfo') || '{}')
            // 请求新的token
            console.log('refreshToken', typeof refreshToken);
            // let ress = await Api.refreshToken({ refreshToken })
            console.log(Api);
            
            isRefreshing = false
        }
        // 请求成功，开启刷新标识
        // localStorage.setItem('AccessToken', res.accessToken)
        // localStorage.setItem('RefreshToken', res.refreshToken)
        // // 已经刷新了token，将所有队列中的请求进行重试
        // requests.forEach((item) => item(res?.accessToken))
        // requests = []
        // router.push('/login')
        return Promise.reject(msg)
    } else {
        ElMessage({
            message: msg,
            type: 'error'
        })
        return Promise.reject(msg)
    } 
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

//3.封装函数
// console.log('config',config)
// console.log(service.defaults)
function request(options: any) {
    //判断是post还是get
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    //判断是否是mock
    let isMock: boolean = true
    isMock = options.mock && config.mock
    if (config.ENV == 'pro') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}
export default request
