# 公开 API 文档 - 用于外部 Nuxt.js 静态博客站点

> 本文档提供无需认证的公开API接口，专供外部Nuxt.js静态化博客站点调用，仅展示已发布的博客内容。

## 📋 基础信息

- **Base URL**: `http://localhost:3000/api/public` (开发环境)
- **生产环境**: `https://your-domain.com/api/public`
- **认证方式**: 无需认证（公开接口）
- **数据格式**: JSON
- **字符编码**: UTF-8
- **CORS**: 已配置跨域支持

## 🔒 安全说明

1. **只读访问**: 所有公开接口仅提供查询功能，不支持创建、更新、删除操作
2. **仅已发布内容**: 所有文章接口只返回状态为 `published` 的文章
3. **速率限制**: 建议后端配置请求频率限制（如每分钟60次）
4. **数据缓存**: 建议Nuxt.js端实现数据缓存策略

## 📦 通用响应格式

### 成功响应
```json
{
  "success": true,
  "message": "获取成功",
  "data": {}
}
```

### 失败响应
```json
{
  "success": false,
  "message": "错误信息"
}
```

### 分页响应
```json
{
  "success": true,
  "message": "获取成功",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## 🚀 API 接口列表

### 1. 文章模块 (`/api/public/articles`)

#### 1.1 获取文章列表
- **URL**: `GET /api/public/articles`
- **权限**: 公开（无需认证）
- **查询参数**:
  - `page`: 页码 (默认: 1)
  - `limit`: 每页数量 (默认: 10, 最大: 100)
  - `keyword`: 搜索关键词 (可选)
  - `categoryId`: 分类ID (可选)
  - `tagId`: 标签ID (可选)
- **响应**:
```json
{
  "success": true,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "title": "文章标题",
      "slug": "article-slug",
      "content": "文章内容（Markdown格式）",
      "excerpt": "文章摘要",
      "coverImage": "/uploads/cover.jpg",
      "authorId": 1,
      "categoryId": 1,
      "status": "published",
      "isTop": false,
      "viewCount": 100,
      "likeCount": 10,
      "commentCount": 5,
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "author": {
        "id": 1,
        "username": "作者名",
        "avatar": "/uploads/avatar.jpg"
      },
      "category": {
        "id": 1,
        "name": "分类名",
        "slug": "category-slug"
      },
      "tags": [
        {
          "id": 1,
          "name": "标签名",
          "slug": "tag-slug"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### 1.2 获取文章详情（通过ID）
- **URL**: `GET /api/public/articles/:id`
- **权限**: 公开
- **响应**: 单个文章对象（同列表中的结构）

#### 1.3 获取文章详情（通过Slug）
- **URL**: `GET /api/public/articles/slug/:slug`
- **权限**: 公开
- **示例**: `/api/public/articles/slug/my-first-article`
- **响应**: 单个文章对象

#### 1.4 获取最新文章
- **URL**: `GET /api/public/articles/latest`
- **权限**: 公开
- **查询参数**:
  - `limit`: 数量 (默认: 10, 最大: 50)
- **响应**: 文章数组（按发布时间倒序）

#### 1.5 获取热门文章
- **URL**: `GET /api/public/articles/popular`
- **权限**: 公开
- **查询参数**:
  - `limit`: 数量 (默认: 10, 最大: 50)
- **响应**: 文章数组（按浏览量倒序）

#### 1.6 根据分类获取文章
- **URL**: `GET /api/public/articles/category/:categoryId`
- **权限**: 公开
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
- **响应**: 文章数组 + 分页信息

#### 1.7 根据标签获取文章
- **URL**: `GET /api/public/articles/tag/:tagId`
- **权限**: 公开
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
- **响应**: 文章数组 + 分页信息

#### 1.8 搜索文章
- **URL**: `GET /api/public/articles/search`
- **权限**: 公开
- **查询参数**:
  - `keyword`: 搜索关键词（必填）
  - `page`: 页码
  - `limit`: 每页数量
- **响应**: 文章数组 + 分页信息

#### 1.9 获取归档
- **URL**: `GET /api/public/articles/archives`
- **权限**: 公开
- **响应**:
```json
{
  "success": true,
  "message": "获取成功",
  "data": [
    {
      "year": 2024,
      "month": 1,
      "count": 15
    },
    {
      "year": 2024,
      "month": 2,
      "count": 8
    }
  ]
}
```

---

### 2. 分类模块 (`/api/public/categories`)

#### 2.1 获取分类列表
- **URL**: `GET /api/public/categories`
- **权限**: 公开
- **响应**:
```json
{
  "success": true,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "技术",
      "slug": "tech",
      "description": "技术相关文章",
      "sortOrder": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2.2 获取分类详情（通过ID）
- **URL**: `GET /api/public/categories/:id`
- **权限**: 公开

#### 2.3 获取分类详情（通过Slug）
- **URL**: `GET /api/public/categories/slug/:slug`
- **权限**: 公开
- **示例**: `/api/public/categories/slug/tech`

---

### 3. 标签模块 (`/api/public/tags`)

#### 3.1 获取标签列表
- **URL**: `GET /api/public/tags`
- **权限**: 公开
- **响应**:
```json
{
  "success": true,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "Vue.js",
      "slug": "vuejs",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 3.2 获取标签详情（通过ID）
- **URL**: `GET /api/public/tags/:id`
- **权限**: 公开

#### 3.3 获取标签详情（通过Slug）
- **URL**: `GET /api/public/tags/slug/:slug`
- **权限**: 公开
- **示例**: `/api/public/tags/slug/vuejs`

---

### 4. 评论模块 (`/api/public/comments`)

#### 4.1 获取文章评论
- **URL**: `GET /api/public/comments/article/:articleId`
- **权限**: 公开
- **查询参数**:
  - `page`: 页码
  - `limit`: 每页数量
- **响应**:
```json
{
  "success": true,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "content": "评论内容",
      "articleId": 1,
      "authorId": 1,
      "parentId": null,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
      "author": {
        "id": 1,
        "username": "用户名",
        "avatar": "/uploads/avatar.jpg"
      },
      "replies": [
        {
          "id": 2,
          "content": "回复内容",
          "author": {
            "id": 2,
            "username": "回复者",
            "avatar": ""
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### 4.2 获取最新评论
- **URL**: `GET /api/public/comments/latest`
- **权限**: 公开
- **查询参数**:
  - `limit`: 数量 (默认: 10, 最大: 50)
- **响应**: 评论数组

---

## 💻 Nuxt.js 接入示例

### 1. 安装依赖

```bash
npm install axios
```

### 2. 创建 API 工具类

```typescript
// composables/usePublicApi.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api/public',
  timeout: 10000,
})

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

export const usePublicApi = () => {
  return {
    // 文章相关
    getArticles: (params?: any) => api.get('/articles', { params }),
    getArticleById: (id: number) => api.get(`/articles/${id}`),
    getArticleBySlug: (slug: string) => api.get(`/articles/slug/${slug}`),
    getLatestArticles: (limit = 10) => api.get('/articles/latest', { params: { limit } }),
    getPopularArticles: (limit = 10) => api.get('/articles/popular', { params: { limit } }),
    getArticlesByCategory: (categoryId: number, params?: any) => 
      api.get(`/articles/category/${categoryId}`, { params }),
    getArticlesByTag: (tagId: number, params?: any) => 
      api.get(`/articles/tag/${tagId}`, { params }),
    searchArticles: (keyword: string, params?: any) => 
      api.get('/articles/search', { params: { ...params, keyword } }),
    getArchives: () => api.get('/articles/archives'),
    
    // 分类相关
    getCategories: () => api.get('/categories'),
    getCategoryBySlug: (slug: string) => api.get(`/categories/slug/${slug}`),
    
    // 标签相关
    getTags: () => api.get('/tags'),
    getTagBySlug: (slug: string) => api.get(`/tags/slug/${slug}`),
    
    // 评论相关
    getComments: (articleId: number, params?: any) => 
      api.get(`/comments/article/${articleId}`, { params }),
    getLatestComments: (limit = 10) => api.get('/comments/latest', { params: { limit } }),
  }
}
```

### 3. 环境变量配置

```env
# .env
API_BASE_URL=http://localhost:3000/api/public

# .env.production
API_BASE_URL=https://your-domain.com/api/public
```

### 4. 页面示例 - 文章列表

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>博客文章</h1>
    
    <!-- 最新文章 -->
    <section v-if="latestArticles.length">
      <h2>最新文章</h2>
      <article v-for="article in latestArticles" :key="article.id">
        <NuxtLink :to="`/blog/${article.slug}`">
          <h3>{{ article.title }}</h3>
          <p>{{ article.excerpt }}</p>
          <div class="meta">
            <span>{{ formatDate(article.publishedAt) }}</span>
            <span>阅读 {{ article.viewCount }}</span>
          </div>
        </NuxtLink>
      </article>
    </section>
    
    <!-- 分页 -->
    <div v-if="pagination.pages > 1">
      <button @click="loadPage(pagination.page - 1)" :disabled="pagination.page === 1">
        上一页
      </button>
      <span>第 {{ pagination.page }} / {{ pagination.pages }} 页</span>
      <button @click="loadPage(pagination.page + 1)" :disabled="pagination.page === pagination.pages">
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const publicApi = usePublicApi()
const latestArticles = ref([])
const pagination = ref({ page: 1, pages: 1 })

// SSR 数据获取
const { data } = await useAsyncData('articles', async () => {
  const res = await publicApi.getArticles({ page: 1, limit: 10 })
  return res
})

if (data.value?.success) {
  latestArticles.value = data.value.data
  pagination.value = data.value.pagination
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const loadPage = async (page: number) => {
  const res = await publicApi.getArticles({ page, limit: 10 })
  if (res.success) {
    latestArticles.value = res.data
    pagination.value = res.pagination
  }
}
</script>
```

### 5. 页面示例 - 文章详情

```vue
<!-- pages/blog/[slug].vue -->
<template>
  <article v-if="article">
    <header>
      <h1>{{ article.title }}</h1>
      <div class="meta">
        <span>作者: {{ article.author?.username }}</span>
        <span>发布于: {{ formatDate(article.publishedAt) }}</span>
        <span>阅读: {{ article.viewCount }}</span>
      </div>
      
      <div v-if="article.coverImage" class="cover">
        <img :src="getImageUrl(article.coverImage)" :alt="article.title" />
      </div>
      
      <div class="tags">
        <NuxtLink 
          v-for="tag in article.tags" 
          :key="tag.id"
          :to="`/tags/${tag.slug}`"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
    </header>
    
    <!-- Markdown 内容渲染 -->
    <div v-html="renderMarkdown(article.content)" class="content"></div>
    
    <!-- 评论 -->
    <CommentsSection :article-id="article.id" />
  </article>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const route = useRoute()
const publicApi = usePublicApi()

const { data } = await useAsyncData(`article-${route.params.slug}`, async () => {
  const res = await publicApi.getArticleBySlug(route.params.slug as string)
  return res
})

const article = computed(() => data.value?.data)

const renderMarkdown = (content: string) => {
  const html = marked.parse(content)
  return DOMPurify.sanitize(html as string)
}

const getImageUrl = (path: string) => {
  const baseUrl = process.env.API_BASE_URL?.replace('/api/public', '')
  return `${baseUrl}${path}`
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}
</script>
```

### 6. 静态生成配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // 静态生成配置
  nitro: {
    prerender: {
      routes: async () => {
        const publicApi = usePublicApi()
        const routes = ['/']
        
        // 预渲染所有文章页面
        const articlesRes = await publicApi.getArticles({ limit: 1000 })
        if (articlesRes.success) {
          articlesRes.data.forEach(article => {
            routes.push(`/blog/${article.slug}`)
          })
        }
        
        // 预渲染分类页面
        const categoriesRes = await publicApi.getCategories()
        if (categoriesRes.success) {
          categoriesRes.data.forEach(category => {
            routes.push(`/categories/${category.slug}`)
          })
        }
        
        // 预渲染标签页面
        const tagsRes = await publicApi.getTags()
        if (tagsRes.success) {
          tagsRes.data.forEach(tag => {
            routes.push(`/tags/${tag.slug}`)
          })
        }
        
        return routes
      }
    }
  }
})
```

### 7. ISR (增量静态再生) 配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { isr: 3600 }, // 首页每小时重新验证
    '/blog/**': { isr: 86400 }, // 文章页面每天重新验证
    '/categories/**': { isr: 86400 },
    '/tags/**': { isr: 86400 },
  }
})
```

---

## 🛠️ 最佳实践

### 1. 数据缓存策略

```typescript
// 使用 Nuxt 的 useFetch 自动缓存
const { data } = await useFetch('/api/public/articles', {
  key: 'articles-list',
  lazy: true,
  server: true,
  getCachedData(key) {
    return useNuxtApp().payload.data[key]
  }
})
```

### 2. 图片处理

```typescript
// 统一图片URL处理
const getImageUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const baseUrl = process.env.API_BASE_URL?.replace('/api/public', '')
  return `${baseUrl}${path}`
}
```

### 3. Markdown 渲染

```bash
npm install marked dompurify
```

```typescript
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const renderMarkdown = (content: string) => {
  const html = marked.parse(content)
  return DOMPurify.sanitize(html as string)
}
```

### 4. SEO 优化

```vue
<script setup lang="ts">
useHead({
  title: article.value?.title,
  meta: [
    { name: 'description', content: article.value?.excerpt },
    { property: 'og:title', content: article.value?.title },
    { property: 'og:description', content: article.value?.excerpt },
    { property: 'og:image', content: getImageUrl(article.value?.coverImage) },
  ]
})
</script>
```

---

## ⚠️ 注意事项

1. **图片路径**: 返回的图片路径是相对路径，需要拼接完整的域名
2. **时间格式**: 所有时间字段都是 ISO 8601 格式
3. **Markdown 内容**: 文章内容是 Markdown 格式，需要在前端渲染
4. **速率限制**: 建议实现客户端缓存，避免频繁请求
5. **错误处理**: 妥善处理网络错误和数据为空的情况
6. **SEO**: 利用 Nuxt 的服务端渲染能力优化 SEO
7. **静态生成**: 使用 `nuxt generate` 或 ISR 提升性能

---

## 🔧 后端配置要求

为确保公开API正常工作，后端需要：

1. **创建公开路由**: 在 `/api/public` 路径下实现上述接口
2. **移除认证中间件**: 公开接口不需要 JWT 验证
3. **过滤已发布内容**: 所有文章查询自动添加 `status = 'published'` 条件
4. **配置 CORS**: 允许外部域名访问
5. **速率限制**: 建议配置请求频率限制
6. **缓存策略**: 建议后端实现 Redis 缓存提升性能

---

## 📞 技术支持

如有问题，请检查：
- 后端服务是否正常运行
- API 地址配置是否正确
- CORS 配置是否允许您的域名
- 浏览器 Network 面板查看具体错误信息
