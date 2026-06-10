<template>
  <div class="articles-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>文章管理</span>
          <el-button type="primary" @click="router.push('/articles/create')">
            <el-icon><Plus /></el-icon>
            <span>创建文章</span>
          </el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索文章标题"
            clearable
            @clear="handleSearch"
          />
        </el-form-item>
        
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="选择状态" clearable @change="handleSearch">
            <el-option label="草稿" value="draft" />
            <el-option label="已发布" value="published" />
            <el-option label="已归档" value="archived" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="articleStore.loading"
        :data="articleStore.articles"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" min-width="200">
          <template #default="{ row }">
            <el-link type="primary" @click="handleView(row.id)">
              {{ row.title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="viewCount" label="浏览" width="80" />
        <el-table-column prop="likeCount" label="点赞" width="80" />
        <el-table-column prop="commentCount" label="评论" width="80" />
        <el-table-column prop="created_at" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row.id)">编辑</el-button>
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
        :total="articleStore.pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { useArticleStore } from '@/stores/article'
import type { ArticleQueryParams } from '@/types'
import dayjs from 'dayjs'

const router = useRouter()
const articleStore = useArticleStore()

const searchForm = reactive<ArticleQueryParams>({
  keyword: '',
  status: undefined,
})

const pagination = reactive({
  page: 1,
  limit: 10,
})

const getStatusType = (status: string) => {
  const types: Record<string, any> = {
    draft: 'info',
    published: 'success',
    archived: 'warning',
  }
  return types[status] || ''
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    draft: '草稿',
    published: '已发布',
    archived: '已归档',
  }
  return texts[status] || status
}

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const handleSearch = () => {
  pagination.page = 1
  loadArticles()
}

const handleReset = () => {
  searchForm.keyword = ''
  searchForm.status = undefined
  handleSearch()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadArticles()
}

const handleSizeChange = (size: number) => {
  pagination.limit = size
  pagination.page = 1
  loadArticles()
}

const loadArticles = async () => {
  await articleStore.fetchArticles({
    ...searchForm,
    page: pagination.page,
    limit: pagination.limit,
  })
}

const handleView = (_id: number) => {
  // TODO: 跳转到文章详情页
  ElMessage.info('查看文章功能待实现')
}

const handleEdit = (id: number) => {
  router.push(`/articles/edit/${id}`)
}

const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  
  try {
    await articleStore.deleteArticle(id)
    ElMessage.success('删除成功')
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped lang="scss">
.articles-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
  
  .search-form {
    margin-bottom: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }
}
</style>