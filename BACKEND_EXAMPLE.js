/**
 * 公开API路由示例 - Express.js实现
 * 
 * 将此文件集成到您的后端项目中
 * 路径: routes/public.js (或 routes/public.ts)
 */

const express = require('express');
const router = express.Router();

// 假设您已有这些模型/服务
// const Article = require('../models/Article');
// const Category = require('../models/Category');
// const Tag = require('../models/Tag');
// const Comment = require('../models/Comment');

// ==================== 中间件 ====================

/**
 * 公开API中间件
 * - 移除认证要求
 * - 强制只查询已发布的内容
 * - 添加缓存头
 */
const publicMiddleware = (req, res, next) => {
  // 强制只查询已发布状态
  if (req.query && !req.query.status) {
    req.query.status = 'published';
  }
  
  // 设置缓存控制头
  res.set('Cache-Control', 'public, max-age=300'); // 5分钟缓存
  
  next();
};

/**
 * 异步错误处理包装器
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ==================== 文章相关接口 ====================

/**
 * GET /api/public/articles
 * 获取已发布文章列表（支持分页、搜索、筛选）
 */
router.get('/articles', publicMiddleware, asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    keyword,
    categoryId,
    tagId,
    status = 'published'
  } = req.query;

  const pageNum = parseInt(page);
  const limitNum = Math.min(parseInt(limit), 100); // 最大100条
  const skip = (pageNum - 1) * limitNum;

  // 构建查询条件
  const query = { status };
  
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { excerpt: { $regex: keyword, $options: 'i' } }
    ];
  }
  
  if (categoryId) {
    query.categoryId = parseInt(categoryId);
  }
  
  if (tagId) {
    query.tagIds = parseInt(tagId);
  }

  // 执行查询
  const [articles, total] = await Promise.all([
    Article.find(query)
      .sort({ publishedAt: -1, isTop: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('author', 'username avatar')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .lean(),
    Article.countDocuments(query)
  ]);

  res.json({
    success: true,
    message: '获取成功',
    data: articles,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
}));

/**
 * GET /api/public/articles/latest
 * 获取最新文章
 */
router.get('/articles/latest', publicMiddleware, asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);

  const articles = await Article.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'username avatar')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .lean();

  res.json({
    success: true,
    message: '获取成功',
    data: articles
  });
}));

/**
 * GET /api/public/articles/popular
 * 获取热门文章（按浏览量排序）
 */
router.get('/articles/popular', publicMiddleware, asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);

  const articles = await Article.find({ status: 'published' })
    .sort({ viewCount: -1 })
    .limit(limit)
    .populate('author', 'username avatar')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .lean();

  res.json({
    success: true,
    message: '获取成功',
    data: articles
  });
}));

/**
 * GET /api/public/articles/:id
 * 通过ID获取文章详情
 */
router.get('/articles/:id', publicMiddleware, asyncHandler(async (req, res) => {
  const article = await Article.findOne({
    _id: req.params.id,
    status: 'published'
  })
    .populate('author', 'username avatar')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .lean();

  if (!article) {
    return res.status(404).json({
      success: false,
      message: '文章不存在或未发布'
    });
  }

  // 增加浏览量
  await Article.findByIdAndUpdate(req.params.id, {
    $inc: { viewCount: 1 }
  });

  res.json({
    success: true,
    message: '获取成功',
    data: article
  });
}));

/**
 * GET /api/public/articles/slug/:slug
 * 通过slug获取文章详情
 */
router.get('/articles/slug/:slug', publicMiddleware, asyncHandler(async (req, res) => {
  const article = await Article.findOne({
    slug: req.params.slug,
    status: 'published'
  })
    .populate('author', 'username avatar')
    .populate('category', 'name slug')
    .populate('tags', 'name slug')
    .lean();

  if (!article) {
    return res.status(404).json({
      success: false,
      message: '文章不存在或未发布'
    });
  }

  // 增加浏览量
  await Article.findByIdAndUpdate(article._id, {
    $inc: { viewCount: 1 }
  });

  res.json({
    success: true,
    message: '获取成功',
    data: article
  });
}));

/**
 * GET /api/public/articles/category/:categoryId
 * 根据分类获取文章
 */
router.get('/articles/category/:categoryId', publicMiddleware, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page);
  const limitNum = Math.min(parseInt(limit), 100);
  const skip = (pageNum - 1) * limitNum;

  const query = {
    categoryId: parseInt(req.params.categoryId),
    status: 'published'
  };

  const [articles, total] = await Promise.all([
    Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('author', 'username avatar')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .lean(),
    Article.countDocuments(query)
  ]);

  res.json({
    success: true,
    message: '获取成功',
    data: articles,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
}));

/**
 * GET /api/public/articles/tag/:tagId
 * 根据标签获取文章
 */
router.get('/articles/tag/:tagId', publicMiddleware, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page);
  const limitNum = Math.min(parseInt(limit), 100);
  const skip = (pageNum - 1) * limitNum;

  const query = {
    tagIds: parseInt(req.params.tagId),
    status: 'published'
  };

  const [articles, total] = await Promise.all([
    Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('author', 'username avatar')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .lean(),
    Article.countDocuments(query)
  ]);

  res.json({
    success: true,
    message: '获取成功',
    data: articles,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
}));

/**
 * GET /api/public/articles/search
 * 搜索文章
 */
router.get('/articles/search', publicMiddleware, asyncHandler(async (req, res) => {
  const { keyword, page = 1, limit = 10 } = req.query;
  
  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: '请提供搜索关键词'
    });
  }

  const pageNum = parseInt(page);
  const limitNum = Math.min(parseInt(limit), 100);
  const skip = (pageNum - 1) * limitNum;

  const query = {
    status: 'published',
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { excerpt: { $regex: keyword, $options: 'i' } },
      { content: { $regex: keyword, $options: 'i' } }
    ]
  };

  const [articles, total] = await Promise.all([
    Article.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('author', 'username avatar')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .lean(),
    Article.countDocuments(query)
  ]);

  res.json({
    success: true,
    message: '获取成功',
    data: articles,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
}));

/**
 * GET /api/public/articles/archives
 * 获取归档（按年月分组）
 */
router.get('/articles/archives', publicMiddleware, asyncHandler(async (req, res) => {
  const archives = await Article.aggregate([
    { $match: { status: 'published' } },
    {
      $group: {
        _id: {
          year: { $year: '$publishedAt' },
          month: { $month: '$publishedAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } }
  ]);

  const result = archives.map(item => ({
    year: item._id.year,
    month: item._id.month,
    count: item.count
  }));

  res.json({
    success: true,
    message: '获取成功',
    data: result
  });
}));

// ==================== 分类相关接口 ====================

/**
 * GET /api/public/categories
 * 获取所有分类列表
 */
router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Category.find()
    .sort({ sortOrder: 1 })
    .lean();

  res.json({
    success: true,
    message: '获取成功',
    data: categories
  });
}));

/**
 * GET /api/public/categories/:id
 * 通过ID获取分类详情
 */
router.get('/categories/:id', asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).lean();

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
}));

/**
 * GET /api/public/categories/slug/:slug
 * 通过slug获取分类详情
 */
router.get('/categories/slug/:slug', asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).lean();

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
}));

// ==================== 标签相关接口 ====================

/**
 * GET /api/public/tags
 * 获取所有标签列表
 */
router.get('/tags', asyncHandler(async (req, res) => {
  const tags = await Tag.find()
    .sort({ name: 1 })
    .lean();

  res.json({
    success: true,
    message: '获取成功',
    data: tags
  });
}));

/**
 * GET /api/public/tags/:id
 * 通过ID获取标签详情
 */
router.get('/tags/:id', asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id).lean();

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
}));

/**
 * GET /api/public/tags/slug/:slug
 * 通过slug获取标签详情
 */
router.get('/tags/slug/:slug', asyncHandler(async (req, res) => {
  const tag = await Tag.findOne({ slug: req.params.slug }).lean();

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
}));

// ==================== 评论相关接口 ====================

/**
 * GET /api/public/comments/article/:articleId
 * 获取文章评论
 */
router.get('/comments/article/:articleId', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page);
  const limitNum = Math.min(parseInt(limit), 100);
  const skip = (pageNum - 1) * limitNum;

  const query = {
    articleId: parseInt(req.params.articleId)
  };

  const [comments, total] = await Promise.all([
    Comment.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('author', 'username avatar')
      .lean(),
    Comment.countDocuments(query)
  ]);

  // 构建回复关系
  const commentMap = new Map();
  const rootComments = [];

  comments.forEach(comment => {
    comment.replies = [];
    commentMap.set(comment._id.toString(), comment);
    
    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId.toString());
      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      rootComments.push(comment);
    }
  });

  res.json({
    success: true,
    message: '获取成功',
    data: rootComments,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
}));

/**
 * GET /api/public/comments/latest
 * 获取最新评论
 */
router.get('/comments/latest', asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);

  const comments = await Comment.find()
    .sort({ created_at: -1 })
    .limit(limit)
    .populate('author', 'username avatar')
    .populate('article', 'title slug')
    .lean();

  res.json({
    success: true,
    message: '获取成功',
    data: comments
  });
}));

module.exports = router;
