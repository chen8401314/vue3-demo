import http from '../axios.js'

export const testList = (params) => {
    return http.post(`/user/test/findPage`,params)
}
export const findById = (params) => {
    return http.get(`/user/test/findById`,params)
}
export const delById = (params) => {
    return http.delete(`/user/test/delById`,params)
}
export const save = (data) => {
    return http.post(`/user/test/save`,data)
}
export const update = (data) => {
    return http.put(`/user/test/update`,data)
}
