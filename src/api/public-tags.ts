import request from '@/utils/request'
import type { Tag, ApiResponse } from '@/types'

/**
 * 公开标签API - 用于外部Nuxt.js静态博客站点调用
 */
export const publicTagAPI = {
  // 获取所有标签列表
  getList: () => {
    return request.get<any, ApiResponse<Tag[]>>('/public/tags')
  },

  // 获取标签详情（通过ID）
  getById: (id: number) => {
    return request.get<any, ApiResponse<Tag>>(`/public/tags/${id}`)
  },

  // 获取标签详情（通过slug）
  getBySlug: (slug: string) => {
    return request.get<any, ApiResponse<Tag>>(`/public/tags/slug/${slug}`)
  },
}
