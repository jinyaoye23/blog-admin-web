import request from '@/utils/request'
import type { 
  Article, 
  ArticleRequest, 
  ArticleQueryParams, 
  ApiResponse,
  PaginationInfo 
} from '@/types'

export const articleAPI = {
  // 获取文章列表
  getList: (params?: ArticleQueryParams) => {
    return request.get<any, ApiResponse<Article[]>>('/articles', { params })
  },

  // 获取文章详情
  getById: (id: number) => {
    return request.get<any, ApiResponse<Article>>(`/articles/${id}`)
  },

  // 创建文章
  create: (data: ArticleRequest) => {
    return request.post<any, ApiResponse<Article>>('/articles', data)
  },

  // 更新文章
  update: (id: number, data: ArticleRequest) => {
    return request.put<any, ApiResponse<Article>>(`/articles/${id}`, data)
  },

  // 删除文章
  delete: (id: number) => {
    return request.delete<any, ApiResponse<void>>(`/articles/${id}`)
  },

  // 获取我的文章
  getMyArticles: (params?: ArticleQueryParams) => {
    return request.get<any, ApiResponse<Article[]>>('/articles/my', { params })
  },
}