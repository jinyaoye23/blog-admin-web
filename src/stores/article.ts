import { defineStore } from 'pinia'
import { ref } from 'vue'
import { articleAPI } from '@/api/articles'
import type { Article, ArticleRequest, ArticleQueryParams } from '@/types'

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const loading = ref(false)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  // 获取文章列表
  const fetchArticles = async (params?: ArticleQueryParams) => {
    loading.value = true
    try {
      const response = await articleAPI.getList(params)
      if (response.data.data) {
        articles.value = response.data.data
      }
      if (response.data.pagination) {
        pagination.value = response.data.pagination
      }
      return response
    } finally {
      loading.value = false
    }
  }

  // 获取文章详情
  const fetchArticleById = async (id: number) => {
    loading.value = true
    try {
      const response = await articleAPI.getById(id)
      if (response.data.data) {
        currentArticle.value = response.data.data
      }
      return response
    } finally {
      loading.value = false
    }
  }

  // 创建文章
  const createArticle = async (data: ArticleRequest) => {
    const response = await articleAPI.create(data)
    if (response.data.data) {
      articles.value.unshift(response.data.data)
    }
    return response
  }

  // 更新文章
  const updateArticle = async (id: number, data: ArticleRequest) => {
    const response = await articleAPI.update(id, data)
    if (response.data.data) {
      const index = articles.value.findIndex(a => a.id === id)
      if (index !== -1) {
        articles.value[index] = response.data.data
      }
      if (currentArticle.value?.id === id) {
        currentArticle.value = response.data.data
      }
    }
    return response
  }

  // 删除文章
  const deleteArticle = async (id: number) => {
    const response = await articleAPI.delete(id)
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) {
      articles.value.splice(index, 1)
    }
    return response
  }

  // 获取我的文章
  const fetchMyArticles = async (params?: ArticleQueryParams) => {
    loading.value = true
    try {
      const response = await articleAPI.getMyArticles(params)
      if (response.data.data) {
        articles.value = response.data.data
      }
      if (response.data.pagination) {
        pagination.value = response.data.pagination
      }
      return response
    } finally {
      loading.value = false
    }
  }

  // 重置当前文章
  const resetCurrentArticle = () => {
    currentArticle.value = null
  }

  return {
    articles,
    currentArticle,
    loading,
    pagination,
    fetchArticles,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    fetchMyArticles,
    resetCurrentArticle,
  }
})