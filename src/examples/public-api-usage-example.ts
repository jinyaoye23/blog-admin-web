/**
 * 公开API使用示例
 * 
 * 演示如何在前端项目中使用公开API
 */

import { publicArticleAPI, publicCategoryAPI, publicTagAPI, publicCommentAPI } from '@/api/public'

// ==================== 文章相关示例 ====================

/**
 * 示例1: 获取文章列表（带分页）
 */
export async function getArticlesExample() {
  try {
    const response = await publicArticleAPI.getList({
      page: 1,
      limit: 10,
      categoryId: 1,  // 可选：按分类筛选
      tagId: 2,       // 可选：按标签筛选
      keyword: 'Vue'  // 可选：搜索关键词
    })
    
    if (response.success) {
      console.log('文章列表:', response.data)
      console.log('分页信息:', response.pagination)
      return response.data
    }
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

/**
 * 示例2: 获取最新文章
 */
export async function getLatestArticlesExample() {
  try {
    const response = await publicArticleAPI.getLatest(10)
    
    if (response.success) {
      console.log('最新文章:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取最新文章失败:', error)
  }
}

/**
 * 示例3: 获取热门文章
 */
export async function getPopularArticlesExample() {
  try {
    const response = await publicArticleAPI.getPopular(10)
    
    if (response.success) {
      console.log('热门文章:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取热门文章失败:', error)
  }
}

/**
 * 示例4: 通过ID获取文章详情
 */
export async function getArticleByIdExample(id: number) {
  try {
    const response = await publicArticleAPI.getById(id)
    
    if (response.success) {
      console.log('文章详情:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

/**
 * 示例5: 通过Slug获取文章详情（推荐用于SEO）
 */
export async function getArticleBySlugExample(slug: string) {
  try {
    const response = await publicArticleAPI.getBySlug(slug)
    
    if (response.success) {
      console.log('文章详情:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

/**
 * 示例6: 根据分类获取文章
 */
export async function getArticlesByCategoryExample(categoryId: number) {
  try {
    const response = await publicArticleAPI.getByCategory(categoryId, {
      page: 1,
      limit: 10
    })
    
    if (response.success) {
      console.log('分类文章:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取分类文章失败:', error)
  }
}

/**
 * 示例7: 根据标签获取文章
 */
export async function getArticlesByTagExample(tagId: number) {
  try {
    const response = await publicArticleAPI.getByTag(tagId, {
      page: 1,
      limit: 10
    })
    
    if (response.success) {
      console.log('标签文章:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取标签文章失败:', error)
  }
}

/**
 * 示例8: 搜索文章
 */
export async function searchArticlesExample(keyword: string) {
  try {
    const response = await publicArticleAPI.search(keyword, {
      page: 1,
      limit: 10
    })
    
    if (response.success) {
      console.log('搜索结果:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('搜索文章失败:', error)
  }
}

/**
 * 示例9: 获取归档信息
 */
export async function getArchivesExample() {
  try {
    const response = await publicArticleAPI.getArchives()
    
    if (response.success) {
      console.log('归档信息:', response.data)
      // 输出格式: [{ year: 2024, month: 1, count: 15 }, ...]
      return response.data
    }
  } catch (error) {
    console.error('获取归档信息失败:', error)
  }
}

// ==================== 分类相关示例 ====================

/**
 * 示例10: 获取所有分类
 */
export async function getCategoriesExample() {
  try {
    const response = await publicCategoryAPI.getList()
    
    if (response.success) {
      console.log('分类列表:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

/**
 * 示例11: 通过ID获取分类详情
 */
export async function getCategoryByIdExample(id: number) {
  try {
    const response = await publicCategoryAPI.getById(id)
    
    if (response.success) {
      console.log('分类详情:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取分类详情失败:', error)
  }
}

/**
 * 示例12: 通过Slug获取分类详情
 */
export async function getCategoryBySlugExample(slug: string) {
  try {
    const response = await publicCategoryAPI.getBySlug(slug)
    
    if (response.success) {
      console.log('分类详情:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取分类详情失败:', error)
  }
}

// ==================== 标签相关示例 ====================

/**
 * 示例13: 获取所有标签
 */
export async function getTagsExample() {
  try {
    const response = await publicTagAPI.getList()
    
    if (response.success) {
      console.log('标签列表:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取标签列表失败:', error)
  }
}

/**
 * 示例14: 通过ID获取标签详情
 */
export async function getTagByIdExample(id: number) {
  try {
    const response = await publicTagAPI.getById(id)
    
    if (response.success) {
      console.log('标签详情:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取标签详情失败:', error)
  }
}

/**
 * 示例15: 通过Slug获取标签详情
 */
export async function getTagBySlugExample(slug: string) {
  try {
    const response = await publicTagAPI.getBySlug(slug)
    
    if (response.success) {
      console.log('标签详情:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取标签详情失败:', error)
  }
}

// ==================== 评论相关示例 ====================

/**
 * 示例16: 获取文章评论
 */
export async function getArticleCommentsExample(articleId: number) {
  try {
    const response = await publicCommentAPI.getByArticle(articleId, {
      page: 1,
      limit: 10
    })
    
    if (response.success) {
      console.log('文章评论:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取评论失败:', error)
  }
}

/**
 * 示例17: 获取最新评论
 */
export async function getLatestCommentsExample() {
  try {
    const response = await publicCommentAPI.getLatest(10)
    
    if (response.success) {
      console.log('最新评论:', response.data)
      return response.data
    }
  } catch (error) {
    console.error('获取最新评论失败:', error)
  }
}

// ==================== Vue组件中使用示例 ====================

/**
 * 示例18: 在Vue组件中使用（Composition API）
 * 
 * <script setup lang="ts">
 * import { ref, onMounted } from 'vue'
 * import { getArticlesExample } from '@/examples/public-api-usage-example'
 * 
 * const articles = ref([])
 * const loading = ref(false)
 * 
 * onMounted(async () => {
 *   loading.value = true
 *   articles.value = await getArticlesExample()
 *   loading.value = false
 * })
 * </script>
 * 
 * <template>
 *   <div v-if="loading">加载中...</div>
 *   <div v-else>
 *     <article v-for="article in articles" :key="article.id">
 *       <h2>{{ article.title }}</h2>
 *       <p>{{ article.excerpt }}</p>
 *     </article>
 *   </div>
 * </template>
 */

// ==================== 组合使用示例 ====================

/**
 * 示例19: 同时获取多个数据（首页场景）
 */
export async function getHomePageData() {
  try {
    // 并行请求，提升性能
    const [latestArticles, popularArticles, categories, tags] = await Promise.all([
      publicArticleAPI.getLatest(10),
      publicArticleAPI.getPopular(5),
      publicCategoryAPI.getList(),
      publicTagAPI.getList()
    ])
    
    return {
      latestArticles: latestArticles.success ? latestArticles.data : [],
      popularArticles: popularArticles.success ? popularArticles.data : [],
      categories: categories.success ? categories.data : [],
      tags: tags.success ? tags.data : []
    }
  } catch (error) {
    console.error('获取首页数据失败:', error)
    return {
      latestArticles: [],
      popularArticles: [],
      categories: [],
      tags: []
    }
  }
}

/**
 * 示例20: 文章详情页数据获取
 */
export async function getArticlePageData(slug: string) {
  try {
    // 获取文章详情
    const articleResponse = await publicArticleAPI.getBySlug(slug)
    
    if (!articleResponse.success || !articleResponse.data) {
      throw new Error('文章不存在')
    }
    
    const article = articleResponse.data
    
    // 并行获取相关文章和评论
    const [relatedArticles, comments] = await Promise.all([
      // 获取同分类的文章
      article.categoryId 
        ? publicArticleAPI.getByCategory(article.categoryId, { page: 1, limit: 5 })
        : Promise.resolve({ success: true, data: [] }),
      // 获取评论
      publicCommentAPI.getByArticle(article.id, { page: 1, limit: 20 })
    ])
    
    return {
      article,
      relatedArticles: relatedArticles.success ? relatedArticles.data : [],
      comments: comments.success ? comments.data : []
    }
  } catch (error) {
    console.error('获取文章页数据失败:', error)
    return {
      article: null,
      relatedArticles: [],
      comments: []
    }
  }
}

// ==================== 工具函数示例 ====================

/**
 * 工具函数1: 格式化日期
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * 工具函数2: 格式化相对时间
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 30) {
    return formatDate(dateString)
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '刚刚'
  }
}

/**
 * 工具函数3: 截断文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * 工具函数4: 生成摘要
 */
export function generateExcerpt(content: string, maxLength: number = 200): string {
  // 移除Markdown标记
  const plainText = content
    .replace(/#+\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`([^`]+)`/g, '$1')
  
  return truncateText(plainText, maxLength)
}
