# Nuxt.js 静态博客项目示例结构

这是一个基于 Nuxt.js 的静态博客前端项目示例，使用上述公开API构建。

## 📁 项目结构

```
nuxt-blog/
├── assets/
│   └── css/
│       └── main.css          # 全局样式
├── components/
│   ├── ArticleCard.vue       # 文章卡片组件
│   ├── CommentsSection.vue   # 评论区组件
│   ├── Header.vue            # 头部导航
│   ├── Footer.vue            # 底部信息
│   └── Sidebar.vue           # 侧边栏
├── composables/
│   └── usePublicApi.ts       # API工具类
├── layouts/
│   └── default.vue           # 默认布局
├── pages/
│   ├── index.vue             # 首页
│   ├── blog/
│   │   └── [slug].vue        # 文章详情页
│   ├── categories/
│   │   └── [slug].vue        # 分类页
│   ├── tags/
│   │   └── [slug].vue        # 标签页
│   └── archives.vue          # 归档页
├── public/
│   └── robots.txt
├── utils/
│   ├── date.ts               # 日期工具
│   └── image.ts              # 图片工具
├── .env                      # 环境变量
├── .env.production           # 生产环境变量
├── nuxt.config.ts            # Nuxt配置
├── package.json
└── tsconfig.json
```

## 🚀 快速开始

### 1. 创建项目

```bash
npx nuxi@latest init nuxt-blog
cd nuxt-blog
```

### 2. 安装依赖

```bash
npm install axios marked dompurify
npm install -D @types/dompurify
```

### 3. 配置环境变量

```env
# .env
API_BASE_URL=http://localhost:3000/api/public

# .env.production
API_BASE_URL=https://your-domain.com/api/public
```

### 4. 创建 API 工具类

```typescript
// composables/usePublicApi.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api/public',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.message)
    return Promise.reject(error)
  }
)

export const usePublicApi = () => {
  return {
    // 文章
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
    
    // 分类
    getCategories: () => api.get('/categories'),
    getCategoryBySlug: (slug: string) => api.get(`/categories/slug/${slug}`),
    
    // 标签
    getTags: () => api.get('/tags'),
    getTagBySlug: (slug: string) => api.get(`/tags/slug/${slug}`),
    
    // 评论
    getComments: (articleId: number, params?: any) => 
      api.get(`/comments/article/${articleId}`, { params }),
    getLatestComments: (limit = 10) => api.get('/comments/latest', { params: { limit } }),
  }
}
```

### 5. 创建工具函数

```typescript
// utils/date.ts
export const formatDate = (dateStr: string, format: 'full' | 'short' = 'full') => {
  const date = new Date(dateStr)
  if (format === 'short') {
    return date.toLocaleDateString('zh-CN')
  }
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 30) return formatDate(dateStr, 'short')
  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小时前`
  if (minutes > 0) return `${minutes}分钟前`
  return '刚刚'
}
```

```typescript
// utils/image.ts
export const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg'
  if (path.startsWith('http')) return path
  const baseUrl = process.env.API_BASE_URL?.replace('/api/public', '')
  return `${baseUrl}${path}`
}
```

### 6. 创建布局

```vue
<!-- layouts/default.vue -->
<template>
  <div class="app">
    <Header />
    <main class="container">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
}
</style>
```

### 7. 创建首页

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <h1>我的博客</h1>
      <p>分享技术与生活</p>
    </section>
    
    <!-- Latest Articles -->
    <section class="articles">
      <h2>最新文章</h2>
      <div class="article-grid">
        <ArticleCard 
          v-for="article in articles" 
          :key="article.id"
          :article="article"
        />
      </div>
      
      <!-- Load More -->
      <div v-if="pagination.pages > 1" class="load-more">
        <button @click="loadMore" :disabled="loading">
          {{ loading ? '加载中...' : '加载更多' }}
        </button>
      </div>
    </section>
    
    <!-- Popular Articles Sidebar -->
    <aside class="sidebar">
      <h3>热门文章</h3>
      <ul>
        <li v-for="article in popularArticles" :key="article.id">
          <NuxtLink :to="`/blog/${article.slug}`">
            {{ article.title }}
          </NuxtLink>
          <span class="views">{{ article.viewCount }} 阅读</span>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
const publicApi = usePublicApi()
const articles = ref([])
const popularArticles = ref([])
const pagination = ref({ page: 1, pages: 1 })
const loading = ref(false)

// SSR 数据获取
const { data } = await useAsyncData('home-data', async () => {
  const [articlesRes, popularRes] = await Promise.all([
    publicApi.getArticles({ page: 1, limit: 12 }),
    publicApi.getPopularArticles(10)
  ])
  return { articles: articlesRes, popular: popularRes }
})

if (data.value) {
  if (data.value.articles.success) {
    articles.value = data.value.articles.data
    pagination.value = data.value.articles.pagination
  }
  if (data.value.popular.success) {
    popularArticles.value = data.value.popular.data
  }
}

// SEO
useHead({
  title: '我的博客 - 首页',
  meta: [
    { name: 'description', content: '分享技术与生活的博客' }
  ]
})

const loadMore = async () => {
  if (loading.value || pagination.value.page >= pagination.value.pages) return
  
  loading.value = true
  const nextPage = pagination.value.page + 1
  const res = await publicApi.getArticles({ page: nextPage, limit: 12 })
  
  if (res.success) {
    articles.value = [...articles.value, ...res.data]
    pagination.value = res.pagination
  }
  loading.value = false
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.load-more {
  text-align: center;
  margin-top: 2rem;
}

.sidebar {
  margin-top: 3rem;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

.views {
  color: #999;
  font-size: 0.9rem;
}
</style>
```

### 8. 创建文章卡片组件

```vue
<!-- components/ArticleCard.vue -->
<template>
  <article class="card">
    <NuxtLink :to="`/blog/${article.slug}`">
      <div v-if="article.coverImage" class="cover">
        <img :src="getImageUrl(article.coverImage)" :alt="article.title" />
      </div>
      
      <div class="content">
        <h3>{{ article.title }}</h3>
        <p class="excerpt">{{ article.excerpt }}</p>
        
        <div class="meta">
          <span class="date">{{ formatDate(article.publishedAt) }}</span>
          <span class="views">👁 {{ article.viewCount }}</span>
          <span class="comments">💬 {{ article.commentCount }}</span>
        </div>
        
        <div v-if="article.tags" class="tags">
          <span v-for="tag in article.tags.slice(0, 3)" :key="tag.id" class="tag">
            {{ tag.name }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  article: any
}>()

const { formatDate } = await import('~/utils/date')
const { getImageUrl } = await import('~/utils/image')
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.cover img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 1.5rem;
}

.content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.excerpt {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  gap: 1rem;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}
</style>
```

### 9. 创建文章详情页

```vue
<!-- pages/blog/[slug].vue -->
<template>
  <article v-if="article" class="article-detail">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      
      <div class="meta">
        <span class="author">作者: {{ article.author?.username }}</span>
        <span class="date">{{ formatDate(article.publishedAt) }}</span>
        <span class="views">👁 {{ article.viewCount }}</span>
      </div>
      
      <div v-if="article.coverImage" class="cover-image">
        <img :src="getImageUrl(article.coverImage)" :alt="article.title" />
      </div>
      
      <div v-if="article.tags" class="tags">
        <NuxtLink 
          v-for="tag in article.tags" 
          :key="tag.id"
          :to="`/tags/${tag.slug}`"
          class="tag"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
    </header>
    
    <!-- Markdown Content -->
    <div v-html="renderMarkdown(article.content)" class="article-content"></div>
    
    <!-- Comments -->
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

// SEO
watchEffect(() => {
  if (article.value) {
    useHead({
      title: article.value.title,
      meta: [
        { name: 'description', content: article.value.excerpt },
        { property: 'og:title', content: article.value.title },
        { property: 'og:description', content: article.value.excerpt },
        { property: 'og:image', content: getImageUrl(article.value.coverImage) },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: article.value.publishedAt },
      ]
    })
  }
})

const renderMarkdown = (content: string) => {
  const html = marked.parse(content)
  return DOMPurify.sanitize(html as string)
}

const { formatDate } = await import('~/utils/date')
const { getImageUrl } = await import('~/utils/image')
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 3rem;
}

.article-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 2rem;
  color: #666;
  margin-bottom: 2rem;
}

.cover-image img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  color: #333;
  transition: background 0.2s;
}

.tag:hover {
  background: #e0e0e0;
}

.article-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.article-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(img) {
  max-width: 100%;
  border-radius: 4px;
}

.article-content :deep(code) {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

.article-content :deep(pre) {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
```

### 10. Nuxt 配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - 我的博客',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },
  
  // 路由规则（ISR）
  routeRules: {
    '/': { isr: 3600 }, // 首页每小时重新验证
    '/blog/**': { isr: 86400 }, // 文章页面每天重新验证
    '/categories/**': { isr: 86400 },
    '/tags/**': { isr: 86400 },
  },
  
  // 静态生成配置
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  devtools: { enabled: true }
})
```

### 11. 构建和部署

```bash
# 开发环境
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 生成静态站点
npm run generate
```

## 🎯 关键特性

1. **服务端渲染 (SSR)**: 首屏加载快，SEO友好
2. **增量静态再生 (ISR)**: 平衡性能和内容更新
3. **自动缓存**: Nuxt自动缓存API响应
4. **TypeScript支持**: 类型安全
5. **响应式设计**: 适配各种设备
6. **Markdown渲染**: 完美展示文章内容
7. **SEO优化**: 完整的meta标签和Open Graph

## 📝 注意事项

1. 确保后端API已正确配置CORS
2. 生产环境使用HTTPS
3. 实现适当的错误处理和加载状态
4. 考虑添加PWA支持
5. 监控API调用频率，避免超出限制
