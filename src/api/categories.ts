import request from '@/utils/request'
import type { Category, CategoryRequest, ApiResponse } from '@/types'

export const categoryAPI = {
  // 获取分类列表
  getList: (): Promise<ApiResponse<Category[]>> => {
    return request.get('/categories')
  },

  // 获取分类详情
  getById: (id: number): Promise<ApiResponse<Category>> => {
    return request.get(`/categories/${id}`)
  },

  // 创建分类
  create: (data: CategoryRequest): Promise<ApiResponse<Category>> => {
    return request.post('/categories', data)
  },

  // 更新分类
  update: (id: number, data: CategoryRequest): Promise<ApiResponse<Category>> => {
    return request.put(`/categories/${id}`, data)
  },

  // 删除分类
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/categories/${id}`)
  },
}
