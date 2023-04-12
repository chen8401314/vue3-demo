// API_URL: process.env.API_URL ||'"http://dev-api.hjbim.com"',
/**
 * 全局配置
 * 测试环境：http://test-api.huaguisystems.com
 * OA环境：http://oa-api.huaguisystems.com
 * 六号线：http://bimline6-api.hjbim.coms
 * 青岛： http://bim-api.hjbim.com
 * 苏州demo： http://demoline-api.hjbim.com
 * */
export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8069/' : process.env.API_URL
export const BASE_FILE_URL = 'http://192.168.5.78:9000/test/';
export const BASE_UPLOAD_URL = API_URL+'minio/anon/uploadFile';
export const SUCCESS_MSG = '操作成功';
