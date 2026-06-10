import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tagAPI } from '@/api/tags'
import type { Tag, TagRequest } from '@/types'

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([])
  const loading = ref(false)

  // 获取标签列表
  const fetchTags = async () => {
    loading.value = true
    try {
      const response = await tagAPI.getList()
      if (response.data.data) {
        tags.value = response.data.data
      }
      return response
    } finally {
      loading.value = false
    }
  }

  // 创建标签
  const createTag = async (data: TagRequest) => {
    const response = await tagAPI.create(data)
    if (response.data.data) {
      tags.value.push(response.data.data)
    }
    return response
  }

  // 更新标签
  const updateTag = async (id: number, data: TagRequest) => {
    const response = await tagAPI.update(id, data)
    if (response.data.data) {
      const index = tags.value.findIndex(t => t.id === id)
      if (index !== -1) {
        tags.value[index] = response.data.data
      }
    }
    return response
  }

  // 删除标签
  const deleteTag = async (id: number) => {
    const response = await tagAPI.delete(id)
    const index = tags.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tags.value.splice(index, 1)
    }
    return response
  }

  return {
    tags,
    loading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  }
})