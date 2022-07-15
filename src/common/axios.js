import axios from 'axios'
import { ElMessage } from 'element-plus';
const requests =  axios.create({
    // 配置基础路径
    baseURL:'http://localhost:8069/',
    timeout:30000,
})

// 配置拦截器
requests.interceptors.request.use(config => {
    // 请求带token
    console.log("test6=",window.localStorage.authorization)
   if (window.localStorage.authorization) {
        config.headers['Authorization'] = window.localStorage.authorization; // 让每个请求携带自定义token 请        根据实际情况自行修改
    }
    return config
})

// 对应拦截器
requests.interceptors.response.use((res) => {
    console.log("test111",res.headers.authorization)
    if (res.headers.authorization) {
        window.localStorage.authorization = res.headers.authorization;
    }
    // 请求成功的回调函数
    if (res.data.code === 200) {

        return  res.data.data;
    }else{
        ElMessage(res.data.message);
        return Promise.reject(new Error(res.data.message));
    }

},() => {
    // 请求失败的回调函数
    return Promise.reject('fail');
})
// 对外暴露
export default requests;
