# 公开 API 快速参考

## 📚 文档导航

| 文档 | 用途 | 适合人群 |
|------|------|---------|
| `PUBLIC_API_README.md` | 快速开始指南 | 所有人 |
| `PUBLIC_API_DOCUMENTATION.md` | 详细API文档 + Nuxt示例 | 前端开发者 |
| `NUXT_EXAMPLE.md` | 完整Nuxt项目代码 | 前端开发者 |
| `BACKEND_EXAMPLE.js` | Express后端实现示例 | 后端开发者 |
| `IMPLEMENTATION_GUIDE.md` | 完整实施指南 | 项目负责人 |

---

## 🔗 API端点速查

### 文章接口
```
GET /api/public/articles                    # 文章列表（分页）
GET /api/public/articles/latest?limit=10    # 最新文章
GET /api/public/articles/popular?limit=10   # 热门文章
GET /api/public/articles/:id                # 文章详情（ID）
GET /api/public/articles/slug/:slug         # 文章详情（Slug）
GET /api/public/articles/category/:id       # 分类下的文章
GET /api/public/articles/tag/:id            # 标签下的文章
GET /api/public/articles/search?keyword=xx  # 搜索文章
GET /api/public/articles/archives           # 归档信息
```

### 分类接口
```
GET /api/public/categories                  # 分类列表
GET /api/public/categories/:id              # 分类详情（ID）
GET /api/public/categories/slug/:slug       # 分类详情（Slug）
```

### 标签接口
```
GET /api/public/tags                        # 标签列表
GET /api/public/tags/:id                    # 标签详情（ID）
GET /api/public/tags/slug/:slug             # 标签详情（Slug）
```

### 评论接口
```
GET /api/public/comments/article/:id        # 文章评论
GET /api/public/comments/latest?limit=10    # 最新评论
```

---

## 💻 代码片段

### 前端调用（Vue3/TypeScript）

```typescript
import { publicArticleAPI } from '@/api/public'

// 获取文章列表
const { data } = await publicArticleAPI.getList({ 
  page: 1, 
  limit: 10 
})

// 获取文章详情
const article = await publicArticleAPI.getBySlug('my-article')

// 获取最新文章
const latest = await publicArticleAPI.getLatest(10)
```

### Nuxt.js调用

```typescript
// composables/usePublicApi.ts
const publicApi = usePublicApi()

// SSR数据获取
const { data } = await useAsyncData('articles', async () => {
  return await publicApi.getArticles({ page: 1, limit: 10 })
})
```

### 后端路由（Express）

```javascript
const publicRoutes = require('./routes/public');
app.use('/api/public', publicRoutes);
```

---

## ⚙️ 配置速查

### 环境变量

```env
# 开发环境
API_BASE_URL=http://localhost:3000/api/public

# 生产环境
API_BASE_URL=https://api.yourdomain.com/api/public
```

### Nuxt配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/': { isr: 3600 },
    '/blog/**': { isr: 86400 }
  }
})
```

### CORS配置

```javascript
app.use('/api/public', cors({
  origin: ['https://your-site.com'],
  methods: ['GET']
}));
```

### 速率限制

```javascript
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  max: 60              // 60次请求
});
app.use('/api/public', limiter);
```

---

## 🎯 常用查询参数

### 文章列表
```typescript
{
  page: 1,           // 页码
  limit: 10,         // 每页数量（最大100）
  keyword: 'vue',    // 搜索关键词
  categoryId: 1,     // 分类ID
  tagId: 2           // 标签ID
}
```

### 最新/热门文章
```typescript
{
  limit: 10          // 数量（最大50）
}
```

### 评论列表
```typescript
{
  page: 1,           // 页码
  limit: 10          // 每页数量
}
```

---

## 📊 响应格式

### 成功响应
```json
{
  "success": true,
  "message": "获取成功",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### 错误响应
```json
{
  "success": false,
  "message": "错误信息"
}
```

---

## 🚀 快速命令

### 后端
```bash
# 安装依赖
npm install express cors express-rate-limit node-cache

# 启动服务
npm run dev

# 生产部署
pm2 start app.js --name blog-api
```

### 前端（Nuxt）
```bash
# 创建项目
npx nuxi@latest init my-blog

# 安装依赖
npm install axios marked dompurify

# 开发模式
npm run dev

# 构建
npm run build

# 生成静态站点
npm run generate
```

---

## 🔍 调试技巧

### 测试API
```bash
# curl测试
curl http://localhost:3000/api/public/articles

# 带参数
curl "http://localhost:3000/api/public/articles?page=1&limit=5"
```

### 浏览器调试
1. 打开开发者工具（F12）
2. 切换到Network标签
3. 查看API请求和响应
4. 检查Console错误信息

### 后端日志
```javascript
console.log('Request:', req.method, req.url);
console.log('Query:', req.query);
```

---

## ⚠️ 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| CORS错误 | 跨域未配置 | 检查后端CORS设置 |
| 404错误 | 路由不存在 | 检查URL路径 |
| 数据为空 | 没有已发布内容 | 确认status='published' |
| 图片不显示 | 路径不完整 | 拼接完整域名 |
| 请求被限流 | 超过速率限制 | 降低请求频率 |

---

## 📱 典型使用场景

### 场景1：首页展示最新文章
```typescript
const latest = await publicApi.getLatestArticles(10)
```

### 场景2：文章详情页
```typescript
const article = await publicApi.getArticleBySlug(route.params.slug)
const comments = await publicApi.getComments(article.id)
```

### 场景3：分类页面
```typescript
const category = await publicApi.getCategoryBySlug(slug)
const articles = await publicApi.getArticlesByCategory(category.id, { page: 1 })
```

### 场景4：搜索功能
```typescript
const results = await publicApi.searchArticles(keyword, { page: 1 })
```

### 场景5：归档页面
```typescript
const archives = await publicApi.getArchives()
```

---

## 🎨 UI组件建议

### 必需组件
- ✅ ArticleCard - 文章卡片
- ✅ Header - 头部导航
- ✅ Footer - 底部信息
- ✅ CommentsSection - 评论区
- ✅ Sidebar - 侧边栏

### 可选组件
- 🔹 SearchBar - 搜索框
- 🔹 TagCloud - 标签云
- 🔹 CategoryList - 分类列表
- 🔹 ArchiveList - 归档列表
- 🔹 Pagination - 分页器

---

## 🔐 安全要点

1. **仅GET请求** - 公开API不支持POST/PUT/DELETE
2. **只读访问** - 无法修改任何数据
3. **已发布内容** - 自动过滤draft/archived状态
4. **速率限制** - 防止滥用（60次/分钟）
5. **输入验证** - 验证所有查询参数
6. **XSS防护** - 使用DOMPurify清理HTML

---

## 📈 性能指标

### 目标值
- API响应时间：< 200ms
- 首屏加载：< 2s
- Lighthouse评分：> 90
- 页面大小：< 2MB
- TTFB：< 600ms

### 优化手段
- 后端缓存（Redis）
- CDN加速
- 图片压缩
- 代码分割
- ISR模式

---

## 🛠️ 技术栈推荐

### 后端
- Node.js + Express
- MongoDB / MySQL
- Redis（缓存）
- PM2（进程管理）

### 前端
- Nuxt.js 3
- Vue 3 + TypeScript
- Axios（HTTP客户端）
- Marked（Markdown渲染）
- DOMPurify（XSS防护）

### 部署
- Vercel / Netlify（前端）
- Railway / Render（后端）
- Cloudflare（CDN）
- Nginx（自托管）

---

## 📞 快速支持

### 检查清单
1. ✅ 后端服务是否运行？
2. ✅ API地址是否正确？
3. ✅ CORS是否配置？
4. ✅ 数据库有已发布内容吗？
5. ✅ 浏览器控制台有错误吗？

### 测试步骤
```bash
# 1. 测试后端
curl http://localhost:3000/api/public/articles

# 2. 检查CORS
# 在浏览器Console执行
fetch('http://localhost:3000/api/public/articles')

# 3. 查看日志
# 后端日志
tail -f logs/app.log

# 浏览器日志
# F12 -> Console
```

---

## 🎓 学习资源

- [Nuxt.js官方文档](https://nuxt.com/docs)
- [Vue3官方文档](https://vuejs.org/)
- [Express.js指南](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**提示：** 将此文件加入书签，方便快速查阅！🔖
