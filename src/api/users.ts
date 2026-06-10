import request from '@/utils/request'
import type { User, ApiResponse } from '@/types'

export interface UserQueryParams {
  page?: number
  limit?: number
  keyword?: string
}

export const userAPI = {
  // 获取用户列表
  getList: (params?: UserQueryParams): Promise<ApiResponse<User[]>> => {
    return request.get('/users', { params })
  },

  // 获取用户详情
  getById: (id: number): Promise<ApiResponse<User>> => {
    return request.get(`/users/${id}`)
  },

  // 更新用户
  update: (id: number, data: Partial<User>): Promise<ApiResponse<User>> => {
    return request.put(`/users/${id}`, data)
  },

  // 删除用户
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/users/${id}`)
  },
}
