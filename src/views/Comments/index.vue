<template>
  <div class="comments-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>评论管理</span>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="comments"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="content" label="评论内容" min-width="250" show-overflow-tooltip />
        <el-table-column label="评论者" width="120">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="32" :src="row.author?.avatar">
                {{ row.author?.username?.charAt(0)?.toUpperCase() }}
              </el-avatar>
              <span>{{ row.author?.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="articleId" label="文章ID" width="100" />
        <el-table-column prop="created_at" label="评论时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleViewArticle(row.articleId)">
              查看文章
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.limit"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { commentAPI } from '@/api/comments'
import type { Comment, ApiResponse } from '@/types'
import dayjs from 'dayjs'

const loading = ref(false)
const comments = ref<Comment[]>([])
const total = ref(0)

const pagination = reactive({
  page: 1,
  limit: 10,
})

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const loadComments = async () => {
  loading.value = true
  try {
    const response: ApiResponse<Comment[]> = await commentAPI.getMyComments({
      page: pagination.page,
      limit: pagination.limit,
    })
    if (response.data) {
      comments.value = response.data
    }
    if (response.pagination) {
      total.value = response.pagination.total
    }
  } catch (error) {
    console.error('加载评论失败:', error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadComments()
}

const handleSizeChange = (size: number) => {
  pagination.limit = size
  pagination.page = 1
  loadComments()
}

const handleViewArticle = (_articleId: number) => {
  // TODO: 跳转到文章详情页
  ElMessage.info('查看文章功能待实现')
}

const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  
  try {
    await commentAPI.delete(id)
    ElMessage.success('删除成功')
    loadComments()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped lang="scss">
.comments-container {
  .card-header {
    font-weight: bold;
  }
  
  .user-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }
}
</style>