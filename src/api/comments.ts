import request from '@/utils/request'
import type { Comment, CommentRequest, CommentQueryParams, ApiResponse } from '@/types'

export const commentAPI = {
  // 获取文章评论
  getByArticle: (articleId: number, params?: CommentQueryParams) => {
    return request.get<any, ApiResponse<Comment[]>>(`/comments/article/${articleId}`, { params })
  },

  // 创建评论
  create: (articleId: number, data: CommentRequest) => {
    return request.post<any, ApiResponse<Comment>>(`/comments/article/${articleId}`, data)
  },

  // 删除评论
  delete: (id: number) => {
    return request.delete<any, ApiResponse<void>>(`/comments/${id}`)
  },

  // 获取我的评论
  getMyComments: (params?: CommentQueryParams) => {
    return request.get<any, ApiResponse<Comment[]>>('/comments/my', { params })
  },
}