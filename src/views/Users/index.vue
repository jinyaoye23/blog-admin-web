<template>
  <div class="users-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
        </div>
      </template>

      <!-- 搜索栏 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索用户名或邮箱"
            clearable
            @clear="handleSearch"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="users"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="用户信息" min-width="200">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="40" :src="row.avatar">
                {{ row.username.charAt(0).toUpperCase() }}
              </el-avatar>
              <div class="user-info">
                <div class="username">{{ row.username }}</div>
                <div class="email">{{ row.email }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'primary'">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button 
              v-if="row.id !== userStore.user?.id"
              size="small" 
              type="danger" 
              @click="handleDelete(row.id)"
            >
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
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑用户"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="userForm"
        label-width="80px"
      >
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" />
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" />
        </el-form-item>
        
        <el-form-item label="头像URL">
          <el-input v-model="userForm.avatar" placeholder="请输入头像URL" />
        </el-form-item>
        
        <el-form-item label="个人简介">
          <el-input
            v-model="userForm.bio"
            type="textarea"
            :rows="3"
            placeholder="请输入个人简介"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { userAPI } from '@/api/users'
import type { User } from '@/types'
import dayjs from 'dayjs'

const userStore = useUserStore()

const loading = ref(false)
const users = ref<User[]>([])
const total = ref(0)
const dialogVisible = ref(false)
const editId = ref<number | null>(null)
const formRef = ref<FormInstance>()
const submitLoading = ref(false)

const searchForm = reactive({
  keyword: '',
})

const pagination = reactive({
  page: 1,
  limit: 10,
})

const userForm = reactive({
  username: '',
  email: '',
  avatar: '',
  bio: '',
})

const getStatusType = (status: string) => {
  const types: Record<string, any> = {
    active: 'success',
    inactive: 'info',
    banned: 'danger',
  }
  return types[status] || ''
}

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    active: '正常',
    inactive: '未激活',
    banned: '已封禁',
  }
  return texts[status] || status
}

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const loadUsers = async () => {
  loading.value = true
  try {
    const response = await userAPI.getList({
      page: pagination.page,
      limit: pagination.limit,
      keyword: searchForm.keyword,
    })
    // 假设 API 拦截器已返回 response.data，且结构为 { data: User[], pagination: { total: number } }
    if (response.data) {
      users.value = response.data
    }
    if (response.pagination) {
      total.value = response.pagination.total
    }
  } catch (error) {
    console.error('加载用户失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadUsers()
}

const handleReset = () => {
  searchForm.keyword = ''
  handleSearch()
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadUsers()
}

const handleSizeChange = (size: number) => {
  pagination.limit = size
  pagination.page = 1
  loadUsers()
}

const handleEdit = (row: User) => {
  editId.value = row.id
  Object.assign(userForm, {
    username: row.username,
    email: row.email,
    avatar: row.avatar || '',
    bio: row.bio || '',
  })
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value || editId.value === null) return
  
  submitLoading.value = true
  try {
    await userAPI.update(editId.value, userForm)
    ElMessage.success('更新成功')
    dialogVisible.value = false
    loadUsers()
  } catch (error) {
    console.error('更新失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('确定要删除这个用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  
  try {
    await userAPI.delete(id)
    ElMessage.success('删除成功')
    loadUsers()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped lang="scss">
.users-container {
  .card-header {
    font-weight: bold;
  }
  
  .search-form {
    margin-bottom: 20px;
  }
  
  .user-cell {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .user-info {
      .username {
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .email {
        font-size: 12px;
        color: #909399;
      }
    }
  }
  
  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }
}
</style>