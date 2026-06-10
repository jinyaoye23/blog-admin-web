/**
 * 简易 Mock 服务器 - 用于测试公开API
 * 
 * 使用方法：
 * 1. npm install express cors
 * 2. node mock-server.js
 * 3. 访问 http://localhost:3000/api/public/articles
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 启用CORS
app.use(cors());

// Mock数据
const mockArticles = [
  {
    id: 1,
    title: 'Vue 3 入门指南',
    slug: 'vue3-getting-started',
    content: '# Vue 3 入门\n\n这是文章内容...',
    excerpt: '学习 Vue 3 的基础知识',
    coverImage: '/uploads/vue3.jpg',
    authorId: 1,
    categoryId: 1,
    status: 'published',
    isTop: true,
    viewCount: 1234,
    likeCount: 56,
    commentCount: 12,
    publishedAt: '2024-01-15T10:00:00.000Z',
    created_at: '2024-01-15T10:00:00.000Z',
    updated_at: '2024-01-15T10:00:00.000Z',
    author: {
      id: 1,
      username: '管理员',
      avatar: '/uploads/avatar.jpg'
    },
    category: {
      id: 1,
      name: '前端开发',
      slug: 'frontend'
    },
    tags: [
      { id: 1, name: 'Vue', slug: 'vue' },
      { id: 2, name: 'JavaScript', slug: 'javascript' }
    ]
  },
  {
    id: 2,
    title: 'TypeScript 最佳实践',
    slug: 'typescript-best-practices',
    content: '# TypeScript 最佳实践\n\n文章内容...',
    excerpt: '掌握 TypeScript 的高级用法',
    coverImage: '/uploads/ts.jpg',
    authorId: 1,
    categoryId: 1,
    status: 'published',
    isTop: false,
    viewCount: 890,
    likeCount: 45,
    commentCount: 8,
    publishedAt: '2024-01-14T10:00:00.000Z',
    created_at: '2024-01-14T10:00:00.000Z',
    updated_at: '2024-01-14T10:00:00.000Z',
    author: {
      id: 1,
      username: '管理员',
      avatar: '/uploads/avatar.jpg'
    },
    category: {
      id: 1,
      name: '前端开发',
      slug: 'frontend'
    },
    tags: [
      { id: 3, name: 'TypeScript', slug: 'typescript' }
    ]
  }
];

const mockCategories = [
  {
    id: 1,
    name: '前端开发',
    slug: 'frontend',
    description: '前端相关技术文章',
    sortOrder: 1,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: '后端开发',
    slug: 'backend',
    description: '后端相关技术文章',
    sortOrder: 2,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z'
  }
];

const mockTags = [
  { id: 1, name: 'Vue', slug: 'vue', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
  { id: 2, name: 'JavaScript', slug: 'javascript', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
  { id: 3, name: 'TypeScript', slug: 'typescript', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
  { id: 4, name: 'Node.js', slug: 'nodejs', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' }
];

const mockComments = [
  {
    id: 1,
    content: '写得很好！',
    articleId: 1,
    authorId: 2,
    parentId: null,
    created_at: '2024-01-15T12:00:00.000Z',
    updated_at: '2024-01-15T12:00:00.000Z',
    author: {
      id: 2,
      username: '用户A',
      avatar: ''
    },
    replies: []
  }
];

// ==================== 文章接口 ====================

// GET /api/public/articles
app.get('/api/public/articles', (req, res) => {
  const { page = 1, limit = 10, keyword, categoryId, tagId } = req.query;
  
  let filtered = [...mockArticles];
  
  // 关键词搜索
  if (keyword) {
    filtered = filtered.filter(article => 
      article.title.includes(keyword) || 
      article.excerpt.includes(keyword)
    );
  }
  
  // 分类筛选
  if (categoryId) {
    filtered = filtered.filter(article => 
      article.categoryId === parseInt(categoryId)
    );
  }
  
  // 标签筛选
  if (tagId) {
    filtered = filtered.filter(article => 
      article.tags.some(tag => tag.id === parseInt(tagId))
    );
  }
  
  // 分页
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  const paginated = filtered.slice(start, end);
  
  res.json({
    success: true,
    message: '获取成功',
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  });
});

// GET /api/public/articles/latest
app.get('/api/public/articles/latest', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const latest = mockArticles
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
  
  res.json({
    success: true,
    message: '获取成功',
    data: latest
  });
});

// GET /api/public/articles/popular
app.get('/api/public/articles/popular', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const popular = mockArticles
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
  
  res.json({
    success: true,
    message: '获取成功',
    data: popular
  });
});

// GET /api/public/articles/:id
app.get('/api/public/articles/:id', (req, res) => {
  const article = mockArticles.find(a => a.id === parseInt(req.params.id));
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: '文章不存在'
    });
  }
  
  res.json({
    success: true,
    message: '获取成功',
    data: article
  });
});

// GET /api/public/articles/slug/:slug
app.get('/api/public/articles/slug/:slug', (req, res) => {
  const article = mockArticles.find(a => a.slug === req.params.slug);
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: '文章不存在'
    });
  }
  
  res.json({
    success: true,
    message: '获取成功',
    data: article
  });
});

// GET /api/public/articles/category/:categoryId
app.get('/api/public/articles/category/:categoryId', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const filtered = mockArticles.filter(a => 
    a.categoryId === parseInt(req.params.categoryId)
  );
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  
  res.json({
    success: true,
    message: '获取成功',
    data: filtered.slice(start, end),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  });
});

// GET /api/public/articles/tag/:tagId
app.get('/api/public/articles/tag/:tagId', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const filtered = mockArticles.filter(a => 
    a.tags.some(tag => tag.id === parseInt(req.params.tagId))
  );
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  
  res.json({
    success: true,
    message: '获取成功',
    data: filtered.slice(start, end),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  });
});

// GET /api/public/articles/search
app.get('/api/public/articles/search', (req, res) => {
  const { keyword, page = 1, limit = 10 } = req.query;
  
  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: '请提供搜索关键词'
    });
  }
  
  const filtered = mockArticles.filter(article => 
    article.title.includes(keyword) || 
    article.excerpt.includes(keyword) ||
    article.content.includes(keyword)
  );
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  
  res.json({
    success: true,
    message: '获取成功',
    data: filtered.slice(start, end),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  });
});

// GET /api/public/articles/archives
app.get('/api/public/articles/archives', (req, res) => {
  const archives = [
    { year: 2024, month: 1, count: 15 },
    { year: 2024, month: 2, count: 8 },
    { year: 2023, month: 12, count: 12 }
  ];
  
  res.json({
    success: true,
    message: '获取成功',
    data: archives
  });
});

// ==================== 分类接口 ====================

// GET /api/public/categories
app.get('/api/public/categories', (req, res) => {
  res.json({
    success: true,
    message: '获取成功',
    data: mockCategories
  });
});

// GET /api/public/categories/:id
app.get('/api/public/categories/:id', (req, res) => {
  const category = mockCategories.find(c => c.id === parseInt(req.params.id));
  
  if (!category) {
    return res.status(404).json({
      success: false,
      message: '分类不存在'
    });
  }
  
  res.json({
    success: true,
    message: '获取成功',
    data: category
  });
});

// GET /api/public/categories/slug/:slug
app.get('/api/public/categories/slug/:slug', (req, res) => {
  const category = mockCategories.find(c => c.slug === req.params.slug);
  
  if (!category) {
    return res.status(404).json({
      success: false,
      message: '分类不存在'
    });
  }
  
  res.json({
    success: true,
    message: '获取成功',
    data: category
  });
});

// ==================== 标签接口 ====================

// GET /api/public/tags
app.get('/api/public/tags', (req, res) => {
  res.json({
    success: true,
    message: '获取成功',
    data: mockTags
  });
});

// GET /api/public/tags/:id
app.get('/api/public/tags/:id', (req, res) => {
  const tag = mockTags.find(t => t.id === parseInt(req.params.id));
  
  if (!tag) {
    return res.status(404).json({
      success: false,
      message: '标签不存在'
    });
  }
  
  res.json({
    success: true,
    message: '获取成功',
    data: tag
  });
});

// GET /api/public/tags/slug/:slug
app.get('/api/public/tags/slug/:slug', (req, res) => {
  const tag = mockTags.find(t => t.slug === req.params.slug);
  
  if (!tag) {
    return res.status(404).json({
      success: false,
      message: '标签不存在'
    });
  }
  
  res.json({
    success: true,
    message: '获取成功',
    data: tag
  });
});

// ==================== 评论接口 ====================

// GET /api/public/comments/article/:articleId
app.get('/api/public/comments/article/:articleId', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const filtered = mockComments.filter(c => 
    c.articleId === parseInt(req.params.articleId)
  );
  
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;
  
  res.json({
    success: true,
    message: '获取成功',
    data: filtered.slice(start, end),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: filtered.length,
      pages: Math.ceil(filtered.length / limitNum)
    }
  });
});

// GET /api/public/comments/latest
app.get('/api/public/comments/latest', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const latest = mockComments
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
  
  res.json({
    success: true,
    message: '获取成功',
    data: latest
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Mock 服务器运行在 http://localhost:${PORT}`);
  console.log(`📝 测试接口:`);
  console.log(`   - http://localhost:${PORT}/api/public/articles`);
  console.log(`   - http://localhost:${PORT}/api/public/articles/latest`);
  console.log(`   - http://localhost:${PORT}/api/public/categories`);
  console.log(`   - http://localhost:${PORT}/api/public/tags`);
});
