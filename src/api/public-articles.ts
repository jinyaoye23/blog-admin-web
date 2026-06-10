import request from '@/utils/request'
import type { 
  Article, 
  ArticleQueryParams, 
  ApiResponse,
  PaginationInfo 
} from '@/types'

/**
 * 公开API - 用于外部Nuxt.js静态博客站点调用
 * 所有接口无需认证，仅提供已发布文章的查询功能
 */
export const publicArticleAPI = {
  // 获取已发布的文章列表（支持分页、搜索、分类/标签筛选）
  getList: (params?: ArticleQueryParams) => {
    return request.get<any, ApiResponse<Article[]>>('/public/articles', { 
      params: {
        ...params,
        status: 'published' // 强制只返回已发布的文章
      }
    })
  },

  // 获取文章详情（通过ID）
  getById: (id: number) => {
    return request.get<any, ApiResponse<Article>>(`/public/articles/${id}`)
  },

  // 获取文章详情（通过slug）
  getBySlug: (slug: string) => {
    return request.get<any, ApiResponse<Article>>(`/public/articles/slug/${slug}`)
  },

  // 获取最新文章（限制数量）
  getLatest: (limit: number = 10) => {
    return request.get<any, ApiResponse<Article[]>>('/public/articles/latest', {
      params: { limit }
    })
  },

  // 获取热门文章（按浏览量排序）
  getPopular: (limit: number = 10) => {
    return request.get<any, ApiResponse<Article[]>>('/public/articles/popular', {
      params: { limit }
    })
  },

  // 根据分类获取文章
  getByCategory: (categoryId: number, params?: ArticleQueryParams) => {
    return request.get<any, ApiResponse<Article[]>>(`/public/articles/category/${categoryId}`, {
      params: {
        ...params,
        status: 'published'
      }
    })
  },

  // 根据标签获取文章
  getByTag: (tagId: number, params?: ArticleQueryParams) => {
    return request.get<any, ApiResponse<Article[]>>(`/public/articles/tag/${tagId}`, {
      params: {
        ...params,
        status: 'published'
      }
    })
  },

  // 搜索文章
  search: (keyword: string, params?: ArticleQueryParams) => {
    return request.get<any, ApiResponse<Article[]>>('/public/articles/search', {
      params: {
        ...params,
        keyword,
        status: 'published'
      }
    })
  },

  // 获取归档（按年份月份分组）
  getArchives: () => {
    return request.get<any, ApiResponse<Array<{ year: number; month: number; count: number }>>>('/public/articles/archives')
  },
}
