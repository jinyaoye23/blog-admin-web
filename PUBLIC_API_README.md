# 公开 API 使用指南

## 📖 概述

本项目提供了一套完整的公开API接口，专门用于外部Nuxt.js静态化博客站点调用。这些接口无需认证，仅提供已发布内容的查询功能。

## 🎯 适用场景

- ✅ 外部Nuxt.js静态博客展示站点
- ✅ 第三方博客阅读器应用
- ✅ 移动端博客App
- ✅ RSS订阅服务
- ❌ 后台管理功能（请使用原有的认证API）

## 📂 文件说明

### 前端API模块（本项目）

```
src/api/
├── public-articles.ts      # 公开文章API
├── public-categories.ts    # 公开分类API
├── public-tags.ts          # 公开标签API
├── public-comments.ts      # 公开评论API
└── public.ts               # 统一导出
```

### 文档

```
PUBLIC_API_DOCUMENTATION.md  # 完整的API文档和Nuxt.js集成示例
NUXT_EXAMPLE.md             # Nuxt.js项目完整代码示例
```

## 🚀 快速开始

### 1. 后端要求

您的后端需要实现以下公开路由（`/api/public/*`）：

#### 必需实现的接口

**文章相关：**
- `GET /api/public/articles` - 获取已发布文章列表
- `GET /api/public/articles/:id` - 通过ID获取文章详情
- `GET /api/public/articles/slug/:slug` - 通过slug获取文章详情
- `GET /api/public/articles/latest` - 获取最新文章
- `GET /api/public/articles/popular` - 获取热门文章
- `GET /api/public/articles/category/:categoryId` - 按分类获取文章
- `GET /api/public/articles/tag/:tagId` - 按标签获取文章
- `GET /api/public/articles/search` - 搜索文章
- `GET /api/public/articles/archives` - 获取归档信息

**分类相关：**
- `GET /api/public/categories` - 获取所有分类
- `GET /api/public/categories/:id` - 通过ID获取分类详情
- `GET /api/public/categories/slug/:slug` - 通过slug获取分类详情

**标签相关：**
- `GET /api/public/tags` - 获取所有标签
- `GET /api/public/tags/:id` - 通过ID获取标签详情
- `GET /api/public/tags/slug/:slug` - 通过slug获取标签详情

**评论相关：**
- `GET /api/public/comments/article/:articleId` - 获取文章评论
- `GET /api/public/comments/latest` - 获取最新评论

#### 后端实现要点

```javascript
// 示例：Express.js 路由配置
const express = require('express');
const router = express.Router();

// 中间件：仅允许GET请求，自动过滤已发布内容
const publicMiddleware = (req, res, next) => {
  // 1. 移除认证要求
  // 2. 强制添加 status: 'published' 过滤条件
  req.query.status = 'published';
  next();
};

// 文章路由
router.get('/articles', publicMiddleware, articleController.getList);
router.get('/articles/:id', publicMiddleware, articleController.getById);
router.get('/articles/slug/:slug', publicMiddleware, articleController.getBySlug);
router.get('/articles/latest', publicMiddleware, articleController.getLatest);
router.get('/articles/popular', publicMiddleware, articleController.getPopular);
router.get('/articles/category/:categoryId', publicMiddleware, articleController.getByCategory);
router.get('/articles/tag/:tagId', publicMiddleware, articleController.getByTag);
router.get('/articles/search', publicMiddleware, articleController.search);
router.get('/articles/archives', publicMiddleware, articleController.getArchives);

// 分类路由
router.get('/categories', categoryController.getList);
router.get('/categories/:id', categoryController.getById);
router.get('/categories/slug/:slug', categoryController.getBySlug);

// 标签路由
router.get('/tags', tagController.getList);
router.get('/tags/:id', tagController.getById);
router.get('/tags/slug/:slug', tagController.getBySlug);

// 评论路由
router.get('/comments/article/:articleId', commentController.getByArticle);
router.get('/comments/latest', commentController.getLatest);

module.exports = router;
```

### 2. CORS配置

确保后端配置了CORS，允许外部域名访问：

```javascript
// Express.js CORS配置
const cors = require('cors');

app.use('/api/public', cors({
  origin: ['https://your-nuxt-site.com', 'http://localhost:3001'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));
```

### 3. 速率限制（推荐）

```javascript
const rateLimit = require('express-rate-limit');

const publicApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  max: 60, // 最多60次请求
  message: '请求过于频繁，请稍后再试'
});

app.use('/api/public', publicApiLimiter);
```

### 4. 缓存策略（推荐）

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5分钟缓存

// 在控制器中使用
const getCachedArticles = async (req, res) => {
  const cacheKey = `articles_${JSON.stringify(req.query)}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return res.json(cached);
  }
  
  const result = await fetchArticles(req.query);
  cache.set(cacheKey, result, 300);
  res.json(result);
};
```

## 💻 前端集成

### 方式一：直接使用API模块

```typescript
import { publicArticleAPI, publicCategoryAPI } from '@/api/public'

// 获取文章列表
const articles = await publicArticleAPI.getList({ page: 1, limit: 10 })

// 获取分类列表
const categories = await publicCategoryAPI.getList()
```

### 方式二：Nuxt.js项目（推荐）

参考 `PUBLIC_API_DOCUMENTATION.md` 和 `NUXT_EXAMPLE.md` 中的完整示例。

## 🔧 开发流程

### 步骤1：后端实现公开API

1. 创建 `/api/public` 路由组
2. 实现上述所有接口
3. 确保只返回 `status = 'published'` 的文章
4. 配置CORS和速率限制
5. （可选）实现缓存策略

### 步骤2：测试API

使用Postman或curl测试接口：

```bash
# 测试文章列表
curl http://localhost:3000/api/public/articles?page=1&limit=10

# 测试文章详情
curl http://localhost:3000/api/public/articles/slug/my-first-article

# 测试分类列表
curl http://localhost:3000/api/public/categories
```

### 步骤3：创建Nuxt.js项目

```bash
npx nuxi@latest init my-blog-site
cd my-blog-site
npm install axios marked dompurify
```

### 步骤4：配置环境变量

```env
# .env.production
API_BASE_URL=https://your-api-domain.com/api/public
```

### 步骤5：复制示例代码

从 `NUXT_EXAMPLE.md` 复制代码到您的Nuxt.js项目。

### 步骤6：构建和部署

```bash
# 生成分发版本
npm run generate

# 或使用ISR模式
npm run build
```

## 📊 性能优化建议

### 1. 后端优化

- ✅ 数据库索引：为 `status`, `publishedAt`, `viewCount` 添加索引
- ✅ Redis缓存：缓存热门数据
- ✅ CDN加速：静态资源使用CDN
- ✅ 压缩响应：启用gzip/brotli压缩

### 2. 前端优化

- ✅ ISR模式：使用增量静态再生
- ✅ 图片优化：使用next/image或nuxt/image
- ✅ 懒加载：文章列表分页加载
- ✅ Service Worker：离线缓存

### 3. 监控指标

- API响应时间 < 200ms
- 首屏加载时间 < 2s
- Lighthouse评分 > 90

## 🔒 安全注意事项

1. **只读访问**：公开API仅支持GET请求
2. **数据过滤**：自动过滤未发布的内容
3. **敏感信息**：不返回用户邮箱、密码等敏感字段
4. **速率限制**：防止API滥用
5. **输入验证**：验证所有查询参数
6. **SQL注入防护**：使用参数化查询

## 🐛 常见问题

### Q1: 跨域请求失败？

**A:** 检查后端CORS配置，确保允许您的域名。

### Q2: 图片无法显示？

**A:** 图片路径是相对路径，需要拼接完整域名：
```typescript
const imageUrl = `${API_BASE_URL.replace('/api/public', '')}${imagePath}`
```

### Q3: Markdown渲染有问题？

**A:** 使用marked + DOMPurify进行安全渲染：
```typescript
import { marked } from 'marked'
import DOMPurify from 'dompurify'
const html = DOMPurify.sanitize(marked.parse(content))
```

### Q4: SEO效果不好？

**A:** 确保使用SSR或ISR模式，正确设置meta标签。

### Q5: 如何更新静态页面？

**A:** 
- 方案1：重新运行 `npm run generate`
- 方案2：使用ISR，页面会自动重新验证
- 方案3：配置webhook触发重新生成

## 📞 技术支持

如遇到问题：

1. 查看浏览器控制台错误信息
2. 检查Network面板的API请求
3. 确认后端服务正常运行
4. 验证API地址配置正确
5. 查看后端日志

## 📝 更新日志

### v1.0.0 (2024-01-01)
- ✨ 初始版本发布
- ✨ 提供完整的公开API接口
- ✨ 包含详细的Nuxt.js集成文档
- ✨ 提供完整的项目示例代码

## 📄 许可证

MIT License

---

**下一步：**
1. 阅读 `PUBLIC_API_DOCUMENTATION.md` 了解详细API文档
2. 查看 `NUXT_EXAMPLE.md` 获取完整代码示例
3. 开始构建您的静态博客站点！🚀
