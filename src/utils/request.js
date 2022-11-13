// 封装网络请求
import axios from "axios";
const http = axios.create({
    // 通用请求地址/前缀
    baseURL: '/api',
    // 超时
    timeout: 60 * 1000,
})

// 请求拦截器
http.interceptors.request.use(function (config) {
    return config
}, function (error) {
    console.log(error)
    return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error)
    return Promise.reject(error)
})

export default http