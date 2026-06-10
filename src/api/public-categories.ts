import request from '@/utils/request'
import type { Category, ApiResponse } from '@/types'

/**
 * 公开分类API - 用于外部Nuxt.js静态博客站点调用
 */
export const publicCategoryAPI = {
  // 获取所有分类列表
  getList: () => {
    return request.get<any, ApiResponse<Category[]>>('/public/categories')
  },

  // 获取分类详情（通过ID）
  getById: (id: number) => {
    return request.get<any, ApiResponse<Category>>(`/public/categories/${id}`)
  },

  // 获取分类详情（通过slug）
  getBySlug: (slug: string) => {
    return request.get<any, ApiResponse<Category>>(`/public/categories/slug/${slug}`)
  },
}
