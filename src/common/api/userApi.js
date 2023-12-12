import http from '../axios.js'

export const login = (data) => {
    return http.post(`/user/user/anon/login`,data)
}
export const getUserInfo = () => {
    return http.get(`/user/user/getUserInfo`)
}
export const logout = () => {
    return http.get(`/user/user/logout`)
}
