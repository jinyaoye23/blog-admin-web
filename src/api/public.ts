/**
 * 公开API统一导出
 * 用于外部Nuxt.js静态博客站点调用
 * 
 * 所有接口无需认证，仅提供已发布内容的查询功能
 */

export { publicArticleAPI } from './public-articles'
export { publicCategoryAPI } from './public-categories'
export { publicTagAPI } from './public-tags'
export { publicCommentAPI } from './public-comments'

// 便捷导出
export const publicAPI = {
  articles: {} as typeof import('./public-articles').publicArticleAPI,
  categories: {} as typeof import('./public-categories').publicCategoryAPI,
  tags: {} as typeof import('./public-tags').publicTagAPI,
  comments: {} as typeof import('./public-comments').publicCommentAPI,
}
