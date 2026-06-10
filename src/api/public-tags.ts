import request from '@/utils/request'
import type { Tag, ApiResponse } from '@/types'

/**
 * 公开标签API - 用于外部Nuxt.js静态博客站点调用
 */
export const publicTagAPI = {
  // 获取所有标签列表
  getList: (): Promise<ApiResponse<Tag[]>> => {
    return request.get('/public/tags')
  },

  // 获取标签详情（通过ID）
  getById: (id: number): Promise<ApiResponse<Tag>> => {
    return request.get(`/public/tags/${id}`)
  },

  // 获取标签详情（通过slug）
  getBySlug: (slug: string): Promise<ApiResponse<Tag>> => {
    return request.get(`/public/tags/slug/${slug}`)
  },
}

