import request from '@/utils/request'
import type { Comment, CommentRequest, CommentQueryParams, ApiResponse } from '@/types'

export const commentAPI = {
  // 获取文章评论
  getByArticle: (articleId: number, params?: CommentQueryParams): Promise<ApiResponse<Comment[]>> => {
    return request.get(`/comments/article/${articleId}`, { params })
  },

  // 创建评论
  create: (articleId: number, data: CommentRequest): Promise<ApiResponse<Comment>> => {
    return request.post(`/comments/article/${articleId}`, data)
  },

  // 删除评论
  delete: (id: number): Promise<ApiResponse<void>> => {
    return request.delete(`/comments/${id}`)
  },

  // 获取我的评论
  getMyComments: (params?: CommentQueryParams): Promise<ApiResponse<Comment[]>> => {
    return request.get('/comments/my', { params })
  },
}
