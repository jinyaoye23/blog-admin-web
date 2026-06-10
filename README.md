# 博客管理后台 (My Blog Web)

基于 Vue3 + TypeScript + Element Plus 构建的博客管理后台系统。

## 🚀 技术栈

- **框架**: Vue 3.5+ (Composition API)
- **语言**: TypeScript 6.0+
- **构建工具**: Vite 8+
- **UI 组件库**: Element Plus 2.5+
- **状态管理**: Pinia 2.1+
- **路由**: Vue Router 4.2+
- **HTTP 客户端**: Axios 1.6+
- **富文本编辑器**: md-editor-v3 (支持 Markdown)
- **图表**: ECharts 5.4+
- **CSS 框架**: UnoCSS 0.58+
- **日期处理**: Day.js 1.11+
- **表单验证**: VeeValidate 4.12+ + Yup 1.3+

## 📦 功能模块

- ✅ 用户认证（登录/注册）
- ✅ 仪表盘（数据统计 + 图表）
- ✅ 文章管理（CRUD、**Markdown 编辑器**、图片上传）
- ✅ 分类管理
- ✅ 标签管理
- ✅ 评论管理
- ✅ 用户管理
- ✅ 权限控制（管理员/普通用户）
- ✅ **公开API**（供外部Nuxt.js静态博客站点调用）

## 🌐 公开 API

本项目提供了一套完整的公开API接口，用于外部Nuxt.js静态化博客站点调用。

### 特性
- 🔓 无需认证，公开访问
- 📖 仅返回已发布的内容
- ⚡ 高性能，支持缓存
- 🔒 速率限制保护
- 🎯 TypeScript类型安全

### 快速开始

1. **阅读文档**
   - 📘 [快速开始指南](./PUBLIC_API_README.md)
   - 📗 [完整API文档](./PUBLIC_API_DOCUMENTATION.md)
   - 📙 [Nuxt.js项目示例](./NUXT_EXAMPLE.md)
   - 📕 [实施指南](./IMPLEMENTATION_GUIDE.md)
   - 📔 [快速参考](./QUICK_REFERENCE.md)
   - 📓 [总结文档](./PUBLIC_API_SUMMARY.md)

2. **前端API使用**
   ```typescript
   import { publicArticleAPI } from '@/api/public'
   
   // 获取文章列表
   const articles = await publicArticleAPI.getList({ page: 1, limit: 10 })
   
   // 获取文章详情
   const article = await publicArticleAPI.getBySlug('my-article')
   ```

3. **后端实现**
   - 参考 [`BACKEND_EXAMPLE.js`](./BACKEND_EXAMPLE.js)
   - 实现 `/api/public/*` 路由
   - 配置CORS和速率限制

4. **查看示例代码**
   - [`src/examples/public-api-usage-example.ts`](./src/examples/public-api-usage-example.ts)

### API端点

```
GET /api/public/articles                    # 文章列表
GET /api/public/articles/latest             # 最新文章
GET /api/public/articles/popular            # 热门文章
GET /api/public/articles/:id                # 文章详情(ID)
GET /api/public/articles/slug/:slug         # 文章详情(Slug)
GET /api/public/categories                  # 分类列表
GET /api/public/tags                        # 标签列表
GET /api/public/comments/article/:id        # 文章评论
... 更多接口详见文档
```

## 📝 Markdown 编辑器特性

文章编辑器使用 **md-editor-v3**，提供强大的 Markdown 编辑体验：

### ✨ 核心功能
- 📝 **实时预览** - 左侧编辑，右侧实时预览
- 🎨 **语法高亮** - 支持多种编程语言代码高亮
- 🖼️ **图片上传** - 拖拽上传、粘贴上传
- 📊 **表格编辑** - 可视化表格创建和编辑
- 🔗 **链接插入** - 快速插入超链接
- 📐 **数学公式** - 支持 KaTeX 数学公式渲染
- 🎭 **流程图** - 支持 Mermaid 流程图
- 📑 **目录导航** - 自动生成文章目录
- 💾 **自动保存** - 防止内容丢失

### 🛠️ 工具栏功能
- 粗体、斜体、下划线、删除线
- 标题层级（H1-H6）
- 上标、下标
- 引用块
- 有序列表、无序列表、任务列表
- 行内代码、代码块
- 链接、图片、表格
- 撤销、重做
- 全屏编辑
- HTML 预览
- 目录浏览

### 📖 Markdown 语法示例

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
~~删除线~~

- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

[链接文本](https://example.com)

![图片描述](image-url.jpg)

`行内代码`

```javascript
// 代码块
function hello() {
  console.log('Hello, World!')
}
```

> 引用文本

| 表头1 | 表头2 |
|-------|-------|
| 单元格1 | 单元格2 |

$$
E = mc^2
$$
```

## 🛠️ 项目结构

```
my-blog-web/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口
│   │   ├── auth.ts
│   │   ├── articles.ts
│   │   ├── categories.ts
│   │   ├── tags.ts
│   │   ├── comments.ts
│   │   ├── upload.ts
│   │   ├── users.ts
│   │   └── public/     # 公开API模块 ⭐新增
│   │       ├── public-articles.ts
│   │       ├── public-categories.ts
│   │       ├── public-tags.ts
│   │       ├── public-comments.ts
│   │       └── public.ts
│   ├── examples/       # 使用示例 ⭐新增
│   │   └── public-api-usage-example.ts
│   ├── assets/         # 资源文件
│   ├── components/     # 公共组件
│   ├── composables/    # 组合式函数
│   ├── layouts/        # 布局组件
│   │   └── MainLayout.vue
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia 状态管理
│   │   ├── user.ts
│   │   ├── article.ts
│   │   ├── category.ts
│   │   └── tag.ts
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   │   ├── request.ts  # Axios 封装
│   │   └── auth.ts     # 认证工具
│   ├── views/          # 页面视图
│   │   ├── Login.vue
│   │   ├── Dashboard/
│   │   ├── Articles/
│   │   ├── Categories/
│   │   ├── Tags/
│   │   ├── Comments/
│   │   └── Users/
│   ├── App.vue
│   └── main.ts
├── .env.development    # 开发环境变量
├── .env.production     # 生产环境变量
├── vite.config.ts      # Vite 配置
├── uno.config.ts       # UnoCSS 配置
├── API_DOCUMENTATION.md           # 原有API文档
├── PUBLIC_API_README.md          # ⭐公开API快速开始
├── PUBLIC_API_DOCUMENTATION.md   # ⭐公开API详细文档
├── NUXT_EXAMPLE.md               # ⭐Nuxt.js项目示例
├── BACKEND_EXAMPLE.js            # ⭐后端实现示例
├── IMPLEMENTATION_GUIDE.md       # ⭐完整实施指南
├── QUICK_REFERENCE.md            # ⭐快速参考卡片
└── PUBLIC_API_SUMMARY.md         # ⭐方案总结
└── package.json
```

## 📝 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3001

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🔧 配置说明

### 后端 API 地址

修改 `.env.development` 或 `.env.production` 文件：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 代理配置

已在 `vite.config.ts` 中配置了代理，前端请求会自动转发到后端服务。

## 🎨 代码规范

项目使用 ESLint 进行代码检查：

```bash
npm run lint
```

## 📖 API 文档

### 管理后台 API
详细的后端 API 文档请查看 [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) 文件。

### 公开 API
公开API相关文档：
- 📘 [快速开始](./PUBLIC_API_README.md)
- 📗 [详细文档](./PUBLIC_API_DOCUMENTATION.md)
- 📙 [Nuxt示例](./NUXT_EXAMPLE.md)
- 📕 [实施指南](./IMPLEMENTATION_GUIDE.md)
- 📔 [快速参考](./QUICK_REFERENCE.md)
- 📓 [方案总结](./PUBLIC_API_SUMMARY.md)

## 🔐 默认账号

根据后端配置，通常会有一个默认管理员账号用于测试。

## 🎯 下一步

### 如果您是后端开发者
1. 阅读 [`BACKEND_EXAMPLE.js`](./BACKEND_EXAMPLE.js)
2. 实现 `/api/public/*` 路由
3. 配置CORS和速率限制
4. 测试API接口

### 如果您是前端开发者
1. 阅读 [`NUXT_EXAMPLE.md`](./NUXT_EXAMPLE.md)
2. 创建Nuxt.js项目
3. 复制示例代码
4. 本地测试并部署

### 如果您是项目负责人
1. 阅读 [`IMPLEMENTATION_GUIDE.md`](./IMPLEMENTATION_GUIDE.md)
2. 制定实施计划
3. 分配开发任务
4. 监控进度

## 📄 License

MIT

---

**💡 提示**: 如需了解公开API的更多信息，请从 [`PUBLIC_API_SUMMARY.md`](./PUBLIC_API_SUMMARY.md) 开始阅读。
