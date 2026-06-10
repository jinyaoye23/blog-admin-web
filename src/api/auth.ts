import request from '@/utils/request'
import type { LoginRequest, RegisterRequest, AuthResponse, User, ApiResponse } from '@/types'

export const authAPI = {
  // 用户注册
  register: (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    return request.post('/auth/register', data)
  },

  // 用户登录
  login: (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    return request.post('/auth/login', data)
  },

  // 获取当前用户信息
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return request.get('/auth/me')
  },
}
