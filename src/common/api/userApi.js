import http from '../axios.js'

export const login = (data) => {
    return http.post(`user/anon/login`,data)
}
export const getUserInfo = () => {
    return http.get(`user/getUserInfo`)
}
export const logout = () => {
    return http.get(`user/logout`)
}
