import request from '@/utils/request'
import type { Tag, TagRequest, ApiResponse } from '@/types'

export const tagAPI = {
  // 获取标签列表
  getList: () => {
    return request.get<any, ApiResponse<Tag[]>>('/tags')
  },

  // 获取标签详情
  getById: (id: number) => {
    return request.get<any, ApiResponse<Tag>>(`/tags/${id}`)
  },

  // 创建标签
  create: (data: TagRequest) => {
    return request.post<any, ApiResponse<Tag>>('/tags', data)
  },

  // 更新标签
  update: (id: number, data: TagRequest) => {
    return request.put<any, ApiResponse<Tag>>(`/tags/${id}`, data)
  },

  // 删除标签
  delete: (id: number) => {
    return request.delete<any, ApiResponse<void>>(`/tags/${id}`)
  },
}