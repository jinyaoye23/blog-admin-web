import request from '@/utils/request'
import type { Category, ApiResponse } from '@/types'

/**
 * 公开分类API - 用于外部Nuxt.js静态博客站点调用
 */
export const publicCategoryAPI = {
  // 获取所有分类列表
  getList: (): Promise<ApiResponse<Category[]>> => {
    return request.get('/public/categories')
  },

  // 获取分类详情（通过ID）
  getById: (id: number): Promise<ApiResponse<Category>> => {
    return request.get(`/public/categories/${id}`)
  },

  // 获取分类详情（通过slug）
  getBySlug: (slug: string): Promise<ApiResponse<Category>> => {
    return request.get(`/public/categories/slug/${slug}`)
  },
}

