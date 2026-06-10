import request from '@/utils/request'
import type { Comment, CommentQueryParams, ApiResponse } from '@/types'

/**
 * 公开评论API - 用于外部Nuxt.js静态博客站点调用
 */
export const publicCommentAPI = {
  // 获取文章评论（仅显示已审核的评论）
  getByArticle: (articleId: number, params?: CommentQueryParams) => {
    return request.get<any, ApiResponse<Comment[]>>(`/public/comments/article/${articleId}`, { params })
  },

  // 获取最新评论
  getLatest: (limit: number = 10) => {
    return request.get<any, ApiResponse<Comment[]>>('/public/comments/latest', {
      params: { limit }
    })
  },
}
