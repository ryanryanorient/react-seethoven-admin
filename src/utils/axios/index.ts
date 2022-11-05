
import { notification } from 'antd'
import storage from 'store'
import { ApiRequest } from './request'
import { ACCESS_TOKEN, ApiResult } from './types'

const APP_API_BASE_URL = '/api'
const TIME_OUT = 60000

const instance = new ApiRequest({
    baseURL: APP_API_BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            console.log('request', { url: config.url, method: config.method, data: config.data })
            const token = storage.get(ACCESS_TOKEN, '')
            if (config.headers) {
                config.headers[ACCESS_TOKEN] = token
            }
            return config 
        },
        responseInterceptor: (response) => {

            console.log('response:', response.data);
            return response.data
        },
        responseCatch: error => {
            console.log('error:', error?.response);

            if (error?.response?.status === 401) {
                notification.error({ message: '未登录', description: '登录过期，请重新登录' })

            } else if (error?.response?.status === 403) {
                notification.error({ message: '未授权', description: '你没有权限访问此资源' })
            } else {
                return Promise.resolve({ message: '连接服务器失败', success: false })
            }

        }
        //....详见拦截器接口
    }
})
export default instance


export function apiGet<T>(url: string, parameter?: any): Promise<ApiResult<T>> {
    return instance.get<ApiResult<T>>({
        url: url,
        params: parameter
    })
}

export function apiPost<T>(url: string, parameter?: any): Promise<ApiResult<T>> {
    return instance.post<ApiResult<T>>({
        url: url,
        data: parameter
    })
}

export function apiPut<T>(url: string, parameter?: any): Promise<ApiResult<T>> {
    return instance.put<ApiResult<T>>({
        url: url,
        data: parameter
    })
}

export function apiDelete<T>(url: string, parameter?: any): Promise<ApiResult<T>> {
    return instance.delete<ApiResult<T>>({
        url: url,
        data: parameter
    })
}