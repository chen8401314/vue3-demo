import axiosHttp from './axios.js'

export const login = (data) => {
    return axiosHttp({
        method: 'POST',
        url: 'user/anon/login',
        data
    });
}
    export const testList = (params) => {
        return axiosHttp({
            method: 'GET',
            url: '/test/findPage',
            params:params
        });
    }
