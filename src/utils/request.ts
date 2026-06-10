import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types'

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 直接返回 ApiResponse，而不是 AxiosResponse
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const apiResponse = response.data
    if (apiResponse.success) {
      // 直接返回 ApiResponse 对象（使用类型断言绕过 Axios 的类型检查）
      return apiResponse as any
    } else {
      ElMessage.error(apiResponse.message || '请求失败')
      return Promise.reject(new Error(apiResponse.message))
    }
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElMessage.error('未授权，请重新登录')
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          ElMessage.error('禁止访问')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 500:
          ElMessage.error('服务器错误')
          break
        default:
          ElMessage.error(error.response.data?.message || '请求失败')
      }
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

export default request