import http from '../axios.js'

export const testList = (params) => {
    return http.get(`/test/selectPage`,params)
}
export const findById = (params) => {
    return http.get(`/test/findById`,params)
}
export const delById = (params) => {
    return http.delete(`/test/delById`,params)
}
export const save = (data) => {
    return http.post(`/test/save`,data)
}
