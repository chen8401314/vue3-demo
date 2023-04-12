import axios from 'axios'
import {ElMessage} from 'element-plus';
import router from '@/router'
import './config.js'
import {API_URL} from "@/common/config";

const requests = axios.create({
    // 配置基础路径
    baseURL: API_URL,
    timeout: 30000,
    withCredentials: true
})

// 配置拦截器
/*requests.interceptors.request.use(config => {
    // 请求带token
    console.log("test6=",window.localStorage.authorization)
   if (window.localStorage.authorization) {
        config.headers['Authorization'] = window.localStorage.authorization; // 让每个请求携带自定义token 请        根据实际情况自行修改
    }
    return config
})*/

// 对应拦截器
requests.interceptors.response.use((res) => {
    /*    console.log("test111",res.headers.authorization)
        if (res.headers.authorization) {
            window.localStorage.authorization = res.headers.authorization;
        }*/
    // 请求成功的回调函数
    if (res.data.code === 200) {
        return res.data.data;
    } else {
        ElMessage(res.data.message);
        return Promise.reject(new Error(res.data.message));
    }

}, error => {
    if (error.response.data.code === 401) {
        router.push({
            name: 'Login'
        })
    }
    // 请求失败的回调函数
    return Promise.reject('fail');
})
/**
 * http请求工具
 */
const http = {
    request (opts) {
        return requests(opts)
    },

    get (url, params, opts) {
        opts = opts || {}
        opts.method = 'get'
        opts.url = url
        opts.params = params
        return requests(opts)
    },

    delete (url, params, opts) {
        opts = opts || {}
        opts.method = 'delete'
        opts.url = url
        opts.params = params
        return requests(opts)
    },

    post (url, data, opts) {
        opts = opts || {}
        opts.method = 'post'
        opts.url = url
        opts.data = data
        return requests(opts)
    },

    put (url, data, opts) {
        opts = opts || {}
        opts.method = 'put'
        opts.url = url
        opts.data = data
        return requests(opts)
    },

    patch (url, data, opts) {
        opts = opts || {}
        opts.method = 'patch'
        opts.url = url
        opts.data = data
        return requests(opts)
    }
}

export default http;
