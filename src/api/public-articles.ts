import request from '@/utils/request'
import type { 
  Article, 
  ArticleQueryParams, 
  ApiResponse
} from '@/types'

/**
 * 公开API - 用于外部Nuxt.js静态博客站点调用
 * 所有接口无需认证，仅提供已发布文章的查询功能
 */
export const publicArticleAPI = {
  // 获取已发布的文章列表（支持分页、搜索、分类/标签筛选）
  getList: (params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
    return request.get('/public/articles', { 
      params: {
        ...params,
        status: 'published' // 强制只返回已发布的文章
      }
    })
  },

  // 获取文章详情（通过ID）
  getById: (id: number): Promise<ApiResponse<Article>> => {
    return request.get(`/public/articles/${id}`)
  },

  // 获取文章详情（通过slug）
  getBySlug: (slug: string): Promise<ApiResponse<Article>> => {
    return request.get(`/public/articles/slug/${slug}`)
  },

  // 获取最新文章（限制数量）
  getLatest: (limit: number = 10): Promise<ApiResponse<Article[]>> => {
    return request.get('/public/articles/latest', {
      params: { limit }
    })
  },

  // 获取热门文章（按浏览量排序）
  getPopular: (limit: number = 10): Promise<ApiResponse<Article[]>> => {
    return request.get('/public/articles/popular', {
      params: { limit }
    })
  },

  // 根据分类获取文章
  getByCategory: (categoryId: number, params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
    return request.get(`/public/articles/category/${categoryId}`, {
      params: {
        ...params,
        status: 'published'
      }
    })
  },

  // 根据标签获取文章
  getByTag: (tagId: number, params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
    return request.get(`/public/articles/tag/${tagId}`, {
      params: {
        ...params,
        status: 'published'
      }
    })
  },

  // 搜索文章
  search: (keyword: string, params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
    return request.get('/public/articles/search', {
      params: {
        ...params,
        keyword,
        status: 'published'
      }
    })
  },

  // 获取归档（按年份月份分组）
  getArchives: (): Promise<ApiResponse<Array<{ year: number; month: number; count: number }>>> => {
    return request.get('/public/articles/archives')
  },
}

