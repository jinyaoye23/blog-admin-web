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

// 便捷导出 - 使用正确的类型引用
import { publicArticleAPI as _articleAPI } from './public-articles'
import { publicCategoryAPI as _categoryAPI } from './public-categories'
import { publicTagAPI as _tagAPI } from './public-tags'
import { publicCommentAPI as _commentAPI } from './public-comments'

export const publicAPI = {
  articles: _articleAPI,
  categories: _categoryAPI,
  tags: _tagAPI,
  comments: _commentAPI,
}

