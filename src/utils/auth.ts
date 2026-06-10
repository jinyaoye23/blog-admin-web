import type { User } from '@/types'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

// 存储 Token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

// 获取 Token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

// 移除 Token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// 存储用户信息
export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// 获取用户信息
export const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY)
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

// 移除用户信息
export const removeUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

// 检查是否已登录
export const isLoggedIn = (): boolean => {
  return !!getToken()
}

// 登出
export const logout = (): void => {
  removeToken()
  removeUser()
  window.location.href = '/login'
}

// 检查是否是管理员
export const isAdmin = (): boolean => {
  const user = getUser()
  return user?.role === 'admin'
}