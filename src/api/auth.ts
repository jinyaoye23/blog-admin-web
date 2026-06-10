import request from '@/utils/request'
import type { LoginRequest, RegisterRequest, AuthResponse, User, ApiResponse } from '@/types'

export const authAPI = {
  // 用户注册
  register: (data: RegisterRequest) => {
    return request.post<any, ApiResponse<AuthResponse>>('/auth/register', data)
  },

  // 用户登录
  login: (data: LoginRequest) => {
    return request.post<any, ApiResponse<AuthResponse>>('/auth/login', data)
  },

  // 获取当前用户信息
  getCurrentUser: () => {
    return request.get<any, ApiResponse<User>>('/auth/me')
  },
}