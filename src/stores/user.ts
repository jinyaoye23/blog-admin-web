import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api/auth'
import type { User, LoginRequest, RegisterRequest } from '@/types'
import { setToken, setUser, removeToken, removeUser, getUser, getToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(getUser())
  const token = ref<string | null>(getToken())

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // 登录
  const login = async (data: LoginRequest) => {
    const response = await authAPI.login(data)
    if (response.data.data) {
      const { user: userData, token: tokenData } = response.data.data
      user.value = userData
      token.value = tokenData
      setToken(tokenData)
      setUser(userData)
    }
    return response
  }

  // 注册
  const register = async (data: RegisterRequest) => {
    const response = await authAPI.register(data)
    if (response.data.data) {
      const { user: userData, token: tokenData } = response.data.data
      user.value = userData
      token.value = tokenData
      setToken(tokenData)
      setUser(userData)
    }
    return response
  }

  // 获取当前用户信息
  const fetchUserInfo = async () => {
    const response = await authAPI.getCurrentUser()
    if (response.data.data) {
      user.value = response.data.data
      setUser(response.data.data)
    }
    return response
  }

  // 登出
  const logout = () => {
    user.value = null
    token.value = null
    removeToken()
    removeUser()
  }

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,
    login,
    register,
    fetchUserInfo,
    logout,
  }
})