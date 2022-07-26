import axiosHttp from './axios.js'

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
