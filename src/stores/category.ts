import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryAPI } from '@/api/categories'
import type { Category, CategoryRequest } from '@/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)

  // 获取分类列表
  const fetchCategories = async () => {
    loading.value = true
    try {
      const response = await categoryAPI.getList()
      if (response.data.data) {
        categories.value = response.data.data
      }
      return response
    } finally {
      loading.value = false
    }
  }

  // 创建分类
  const createCategory = async (data: CategoryRequest) => {
    const response = await categoryAPI.create(data)
    if (response.data.data) {
      categories.value.push(response.data.data)
    }
    return response
  }

  // 更新分类
  const updateCategory = async (id: number, data: CategoryRequest) => {
    const response = await categoryAPI.update(id, data)
    if (response.data.data) {
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = response.data.data
      }
    }
    return response
  }

  // 删除分类
  const deleteCategory = async (id: number) => {
    const response = await categoryAPI.delete(id)
    const index = categories.value.findIndex(c => c.id === id)
    if (index !== -1) {
      categories.value.splice(index, 1)
    }
    return response
  }

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
})