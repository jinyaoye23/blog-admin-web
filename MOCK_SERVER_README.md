# 🚀 快速启动 Mock 服务器

## 问题说明

当您访问 `http://localhost:3000/api/public/articles` 时返回"接口不存在"，这是因为后端还没有实现这些公开API路由。

## 解决方案

我为您创建了一个**简易Mock服务器**，可以立即测试前端代码。

---

## 📋 使用步骤

### 1️⃣ 安装依赖

在项目根目录执行：

```bash
npm install express cors
```

### 2️⃣ 启动 Mock 服务器

```bash
node MOCK_SERVER.js
```

您会看到输出：
```
✅ Mock 服务器运行在 http://localhost:3000
📝 测试接口:
   - http://localhost:3000/api/public/articles
   - http://localhost:3000/api/public/articles/latest
   - http://localhost:3000/api/public/categories
   - http://localhost:3000/api/public/tags
```

### 3️⃣ 测试接口

在浏览器或Postman中访问：

```
# 文章列表
http://localhost:3000/api/public/articles?page=1&limit=10

# 最新文章
http://localhost:3000/api/public/articles/latest?limit=5

# 热门文章
http://localhost:3000/api/public/articles/popular?limit=5

# 分类列表
http://localhost:3000/api/public/categories

# 标签列表
http://localhost:3000/api/public/tags

# 通过Slug获取文章
http://localhost:3000/api/public/articles/slug/vue3-getting-started
```

### 4️⃣ 配置前端代理

如果您的前端项目运行在 `http://localhost:3001`，需要修改 `vite.config.ts`：

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api/public': {
        target: 'http://localhost:3000', // Mock服务器地址
        changeOrigin: true,
      },
      // 原有的其他代理配置...
    }
  }
})
```

然后重启前端开发服务器：

```bash
npm run dev
```

### 5️⃣ 在前端项目中测试

现在您可以在Vue组件中使用公开API：

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { publicArticleAPI } from '@/api/public'

const articles = ref([])

onMounted(async () => {
  const res = await publicArticleAPI.getList({ page: 1, limit: 10 })
  if (res.success) {
    articles.value = res.data
    console.log('获取到的文章:', articles.value)
  }
})
</script>

<template>
  <div>
    <h2>文章列表</h2>
    <div v-for="article in articles" :key="article.id">
      <h3>{{ article.title }}</h3>
      <p>{{ article.excerpt }}</p>
    </div>
  </div>
</template>
```

---

## 🎯 Mock 服务器特点

### ✅ 优点
- ⚡ 即开即用，无需配置数据库
- 📦 包含完整的Mock数据
- 🔧 支持所有公开API接口
- 🎨 返回真实的数据结构
- 💻 可用于前端开发和测试

### ⚠️ 限制
- ❌ 数据是静态的，无法修改
- ❌ 不支持真实的数据库查询
- ❌ 仅用于开发和测试
- ❌ 生产环境需要替换为真实后端

---

## 🔄 下一步：实现真实后端

Mock服务器仅用于测试，您需要根据实际技术栈实现真实后端：

### 选项1：Node.js + Express
参考 [`BACKEND_EXAMPLE.js`](./BACKEND_EXAMPLE.js) 文件，集成到您的后端项目。

### 选项2：其他框架
告诉我您使用的后端技术栈，我可以提供对应的实现代码。

### 选项3：保持Mock（仅演示）
如果只是演示用途，可以继续使用Mock服务器。

---

## 🐛 常见问题

### Q1: 端口冲突？
**A:** 如果3000端口被占用，修改 `MOCK_SERVER.js` 中的端口号：
```javascript
const PORT = 3000; // 改为其他可用端口，如 3002
```

### Q2: CORS错误？
**A:** Mock服务器已启用CORS，确保前端代理配置正确。

### Q3: 如何停止服务器？
**A:** 在终端按 `Ctrl + C`

### Q4: 数据从哪里来？
**A:** Mock数据定义在 `MOCK_SERVER.js` 顶部，您可以修改这些数据。

---

## 📞 需要帮助？

如果遇到问题：

1. **检查终端输出** - 查看是否有错误信息
2. **确认端口** - 确保Mock服务器和前端代理端口一致
3. **查看Network** - 浏览器F12查看具体请求错误
4. **测试直接访问** - 直接在浏览器访问Mock服务器地址

---

## ✨ 开始测试！

现在您可以：

1. ✅ 启动Mock服务器：`node MOCK_SERVER.js`
2. ✅ 启动前端项目：`npm run dev`
3. ✅ 访问前端页面测试功能
4. ✅ 验证API调用是否正常

祝您测试顺利！🎉
