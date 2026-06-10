import request from '@/utils/request'
import type { Category, CategoryRequest, ApiResponse } from '@/types'

export const categoryAPI = {
  // 获取分类列表
  getList: () => {
    return request.get<any, ApiResponse<Category[]>>('/categories')
  },

  // 获取分类详情
  getById: (id: number) => {
    return request.get<any, ApiResponse<Category>>(`/categories/${id}`)
  },

  // 创建分类
  create: (data: CategoryRequest) => {
    return request.post<any, ApiResponse<Category>>('/categories', data)
  },

  // 更新分类
  update: (id: number, data: CategoryRequest) => {
    return request.put<any, ApiResponse<Category>>(`/categories/${id}`, data)
  },

  // 删除分类
  delete: (id: number) => {
    return request.delete<any, ApiResponse<void>>(`/categories/${id}`)
  },
}