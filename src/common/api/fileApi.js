import http from '../axios.js'


export const getUploadConfig = (params) => {
    return http.get(`/user/file/getUploadConfig`, params)
}

export const getDownloadUrl = async (params) => {
    return await http.get(`/user/file/getDownloadUrl`, {path: params})
}

