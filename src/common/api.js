import axiosHttp from './axios.js'

export const baseFileUrl = 'http://192.168.5.78:9000/test/';
export const baseApiUrl = 'http://localhost:8069/';
export const successMsg = '操作成功';
export const login = (data) => {
    return axiosHttp({
        method: 'POST',
        url: 'user/anon/login',
        data
    });
}

export const getUserInfo = () => {
    return  axiosHttp({
        method: 'GET',
        url: 'user/getUserInfo'
    });
}
export const logout = () => {
    return axiosHttp({
        method: 'GET',
        url: 'user/logout'
    });
}
export const testList = (params) => {
    return axiosHttp({
        method: 'GET',
        url: '/test/findPageDTO',
        params: params
    });
}
export const findById = (params) => {
    return axiosHttp({
        method: 'GET',
        url: '/test/findById',
        params: params
    });
}
export const delById = (params) => {
    return axiosHttp({
        method: 'DELETE',
        url: '/test/delById',
        params: params
    });
}
export const save = (data) => {
    return axiosHttp({
        method: 'POST',
        url: '/test/save',
        data
    });
}
