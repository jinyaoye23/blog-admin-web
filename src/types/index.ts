// 通用响应格式
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  pagination?: PaginationInfo
}

// 分页信息
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

// 分页参数
export interface PaginationParams {
  page?: number
  limit?: number
}

// 用户信息
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  bio?: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive' | 'banned'
  created_at: string
  updated_at: string
}

// 登录请求
export interface LoginRequest {
  email: string
  password: string
}

// 注册请求
export interface RegisterRequest {
  username: string
  email: string
  password: string
}

// 认证响应
export interface AuthResponse {
  user: User
  token: string
}

// 文章
export interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  authorId: number
  categoryId?: number
  status: 'draft' | 'published' | 'archived'
  isTop: boolean
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt?: string
  created_at: string
  updated_at: string
  author?: Pick<User, 'id' | 'username' | 'avatar'>
  category?: Category
  tags?: Tag[]
}

// 文章列表查询参数
export interface ArticleQueryParams extends PaginationParams {
  keyword?: string
  categoryId?: number
  tagId?: number
  status?: 'draft' | 'published' | 'archived'
}

// 创建/更新文章请求
export interface ArticleRequest {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  categoryId?: number
  tagIds?: number[]
  status: 'draft' | 'published' | 'archived'
}

// 分类
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  sortOrder: number
  created_at: string
  updated_at: string
}

// 创建/更新分类请求
export interface CategoryRequest {
  name: string
  slug: string
  description?: string
  sortOrder?: number
}

// 标签
export interface Tag {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

// 创建/更新标签请求
export interface TagRequest {
  name: string
  slug: string
}

// 评论
export interface Comment {
  id: number
  content: string
  articleId: number
  authorId: number
  parentId?: number
  created_at: string
  updated_at: string
  author?: Pick<User, 'id' | 'username' | 'avatar'>
  replies?: Comment[]
}

// 评论列表查询参数
export interface CommentQueryParams extends PaginationParams {}

// 创建评论请求
export interface CommentRequest {
  content: string
  parentId?: number | null
}

// 上传响应
export interface UploadResponse {
  url: string
}