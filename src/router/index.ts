import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { isLoggedIn } from '@/utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'DataAnalysis' },
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('@/views/Articles/index.vue'),
        meta: { title: '文章管理', icon: 'Document' },
      },
      {
        path: 'articles/create',
        name: 'ArticleCreate',
        component: () => import('@/views/Articles/Edit.vue'),
        meta: { title: '创建文章', icon: 'Plus' },
      },
      {
        path: 'articles/edit/:id',
        name: 'ArticleEdit',
        component: () => import('@/views/Articles/Edit.vue'),
        meta: { title: '编辑文章', icon: 'Edit' },
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/Categories/index.vue'),
        meta: { title: '分类管理', icon: 'Folder' },
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@/views/Tags/index.vue'),
        meta: { title: '标签管理', icon: 'CollectionTag' },
      },
      {
        path: 'comments',
        name: 'Comments',
        component: () => import('@/views/Comments/index.vue'),
        meta: { title: '评论管理', icon: 'ChatDotRound' },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users/index.vue'),
        meta: { title: '用户管理', icon: 'User', requiresAdmin: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 博客管理后台` : '博客管理后台'

  const requiresAuth = to.meta.requiresAuth !== false
  
  if (requiresAuth && !isLoggedIn()) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn()) {
    next('/')
  } else {
    next()
  }
})

export default router
