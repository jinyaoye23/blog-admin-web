import request from '@/utils/request'
import type { Tag, TagRequest, ApiResponse } from '@/types'

export const tagAPI = {
  // 获取标签列表
  getList: (): Promise<ApiResponse<Tag[]>> => {
    return request.get('/tags')
  },

  // 获取标签详情
  getById: (id: number): Promise<ApiResponse<Tag>> => {
    return request.get(`/tags/${id}`)
  },

  // 创建标签
  create: (data: TagRequest): Promise<ApiResponse<Tag>> => {
    return request.post('/tags', data)
  },

  // 更新标签
  update: (id: number, data: TagRequest): Promise<ApiResponse<Tag>> => {
    return request.put(`/tags/${id}`, data)
  },

  // 删除标签
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/tags/${id}`)
  },
}
