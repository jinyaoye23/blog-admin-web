import request from '@/utils/request'
import type { User, ApiResponse, PaginationInfo } from '@/types'

export interface UserQueryParams {
  page?: number
  limit?: number
  keyword?: string
}

export const userAPI = {
  // 获取用户列表
  getList: (params?: UserQueryParams) => {
    return request.get<any, ApiResponse<User[]>>('/users', { params })
  },

  // 获取用户详情
  getById: (id: number) => {
    return request.get<any, ApiResponse<User>>(`/users/${id}`)
  },

  // 更新用户
  update: (id: number, data: Partial<User>) => {
    return request.put<any, ApiResponse<User>>(`/users/${id}`, data)
  },

  // 删除用户
  delete: (id: number) => {
    return request.delete<any, ApiResponse<void>>(`/users/${id}`)
  },
}