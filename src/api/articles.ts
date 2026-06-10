import request from '@/utils/request'
import type { 
  Article, 
  ArticleRequest, 
  ArticleQueryParams, 
  ApiResponse
} from '@/types'

export const articleAPI = {
  // 获取文章列表
  getList: (params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
    return request.get('/articles', { params })
  },

  // 获取文章详情
  getById: (id: number): Promise<ApiResponse<Article>> => {
    return request.get(`/articles/${id}`)
  },

  // 创建文章
  create: (data: ArticleRequest): Promise<ApiResponse<Article>> => {
    return request.post('/articles', data)
  },

  // 更新文章
  update: (id: number, data: ArticleRequest): Promise<ApiResponse<Article>> => {
    return request.put(`/articles/${id}`, data)
  },

  // 删除文章
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/articles/${id}`)
  },

  // 获取我的文章
  getMyArticles: (params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
    return request.get('/articles/my', { params })
  },
}
