<template>
  <div class="public-api-container">
    <el-card class="header-card">
      <h1>📚 博客公开 API</h1>
      <p class="subtitle">无需认证的博客数据接口，供外部站点调用</p>
    </el-card>

    <!-- API 测试区域 -->
    <el-card class="test-card">
      <template #header>
        <div class="card-header">
          <span>🧪 API 接口测试</span>
          <el-tag type="success">在线测试</el-tag>
        </div>
      </template>

      <el-form :model="testForm" label-width="120px">
        <el-form-item label="选择接口">
          <el-select v-model="testForm.endpoint" placeholder="请选择要测试的接口" style="width: 100%">
            <el-option-group label="文章接口">
              <el-option label="获取文章列表" value="/api/public/articles" />
              <el-option label="获取最新文章" value="/api/public/articles/latest" />
              <el-option label="获取热门文章" value="/api/public/articles/popular" />
              <el-option label="搜索文章" value="/api/public/articles/search" />
              <el-option label="获取归档" value="/api/public/articles/archives" />
            </el-option-group>
            <el-option-group label="分类接口">
              <el-option label="获取分类列表" value="/api/public/categories" />
            </el-option-group>
            <el-option-group label="标签接口">
              <el-option label="获取标签列表" value="/api/public/tags" />
            </el-option-group>
            <el-option-group label="评论接口">
              <el-option label="获取最新评论" value="/api/public/comments/latest" />
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="请求参数" v-if="showParams">
          <el-input
            v-model="testForm.params"
            placeholder='例如: {"page": 1, "limit": 10}'
            type="textarea"
            :rows="3"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="testApi" :loading="loading">
            发送请求
          </el-button>
          <el-button @click="clearResult">清空结果</el-button>
        </el-form-item>
      </el-form>

      <!-- 结果显示区域 -->
      <div v-if="result" class="result-area">
        <div class="result-header">
          <span>响应结果</span>
          <el-tag :type="result.success ? 'success' : 'danger'">
            {{ result.success ? '成功' : '失败' }}
          </el-tag>
        </div>
        <pre class="result-content">{{ JSON.stringify(result.data, null, 2) }}</pre>
      </div>
    </el-card>

    <!-- API 文档区域 -->
    <el-card class="docs-card">
      <template #header>
        <div class="card-header">
          <span>📖 API 接口文档</span>
        </div>
      </template>

      <el-collapse v-model="activeNames">
        <!-- 文章接口 -->
        <el-collapse-item title="📝 文章接口" name="articles">
          <el-table :data="articleApis" border stripe>
            <el-table-column prop="method" label="方法" width="80">
              <template #default="{ row }">
                <el-tag type="success">{{ row.method }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="path" label="路径" />
            <el-table-column prop="description" label="说明" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="quickTest(row.path)">
                  测试
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <!-- 分类接口 -->
        <el-collapse-item title="📁 分类接口" name="categories">
          <el-table :data="categoryApis" border stripe>
            <el-table-column prop="method" label="方法" width="80">
              <template #default="{ row }">
                <el-tag type="success">{{ row.method }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="path" label="路径" />
            <el-table-column prop="description" label="说明" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="quickTest(row.path)">
                  测试
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <!-- 标签接口 -->
        <el-collapse-item title="🏷️ 标签接口" name="tags">
          <el-table :data="tagApis" border stripe>
            <el-table-column prop="method" label="方法" width="80">
              <template #default="{ row }">
                <el-tag type="success">{{ row.method }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="path" label="路径" />
            <el-table-column prop="description" label="说明" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="quickTest(row.path)">
                  测试
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>

        <!-- 评论接口 -->
        <el-collapse-item title="💬 评论接口" name="comments">
          <el-table :data="commentApis" border stripe>
            <el-table-column prop="method" label="方法" width="80">
              <template #default="{ row }">
                <el-tag type="success">{{ row.method }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="path" label="路径" />
            <el-table-column prop="description" label="说明" />
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button size="small" @click="quickTest(row.path)">
                  测试
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- 使用说明 -->
    <el-card class="usage-card">
      <template #header>
        <div class="card-header">
          <span>💡 使用说明</span>
        </div>
      </template>
      <div class="usage-content">
        <h3>特点</h3>
        <ul>
          <li>✅ 无需认证，公开访问</li>
          <li>✅ 仅返回已发布的内容</li>
          <li>✅ 支持 CORS 跨域</li>
          <li>✅ 速率限制保护（60次/分钟）</li>
        </ul>

        <h3>使用场景</h3>
        <ul>
          <li>🌐 外部 Nuxt.js 静态博客站点</li>
          <li>📱 移动端博客 App</li>
          <li>📰 第三方阅读器应用</li>
          <li>📡 RSS 订阅服务</li>
        </ul>

        <h3>代码示例</h3>
        <el-tabs>
          <el-tab-pane label="TypeScript">
            <pre class="code-block">import { publicArticleAPI } from '@/api/public'

// 获取文章列表
const articles = await publicArticleAPI.getList({ 
  page: 1, 
  limit: 10 
})</pre>
          </el-tab-pane>
          <el-tab-pane label="JavaScript">
            <pre class="code-block">fetch('/api/public/articles?page=1&limit=10')
  .then(res => res.json())
  .then(data => console.log(data))</pre>
          </el-tab-pane>
          <el-tab-pane label="cURL">
            <pre class="code-block">curl http://localhost:3001/api/public/articles?page=1&limit=10</pre>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 测试表单
const testForm = ref({
  endpoint: '/api/public/articles',
  params: '{\n  "page": 1,\n  "limit": 10\n}'
})

const loading = ref(false)
const result = ref<any>(null)
const activeNames = ref(['articles'])

// 显示参数输入框
const showParams = computed(() => {
  return testForm.value.endpoint.includes('search') || 
         testForm.value.endpoint === '/api/public/articles'
})

// 文章接口列表
const articleApis = [
  { method: 'GET', path: '/api/public/articles', description: '获取文章列表（支持分页、搜索、筛选）' },
  { method: 'GET', path: '/api/public/articles/latest', description: '获取最新文章' },
  { method: 'GET', path: '/api/public/articles/popular', description: '获取热门文章' },
  { method: 'GET', path: '/api/public/articles/:id', description: '通过ID获取文章详情' },
  { method: 'GET', path: '/api/public/articles/slug/:slug', description: '通过Slug获取文章详情' },
  { method: 'GET', path: '/api/public/articles/category/:id', description: '根据分类获取文章' },
  { method: 'GET', path: '/api/public/articles/tag/:id', description: '根据标签获取文章' },
  { method: 'GET', path: '/api/public/articles/search', description: '搜索文章' },
  { method: 'GET', path: '/api/public/articles/archives', description: '获取归档信息' },
]

// 分类接口列表
const categoryApis = [
  { method: 'GET', path: '/api/public/categories', description: '获取所有分类列表' },
  { method: 'GET', path: '/api/public/categories/:id', description: '通过ID获取分类详情' },
  { method: 'GET', path: '/api/public/categories/slug/:slug', description: '通过Slug获取分类详情' },
]

// 标签接口列表
const tagApis = [
  { method: 'GET', path: '/api/public/tags', description: '获取所有标签列表' },
  { method: 'GET', path: '/api/public/tags/:id', description: '通过ID获取标签详情' },
  { method: 'GET', path: '/api/public/tags/slug/:slug', description: '通过Slug获取标签详情' },
]

// 评论接口列表
const commentApis = [
  { method: 'GET', path: '/api/public/comments/article/:id', description: '获取文章评论' },
  { method: 'GET', path: '/api/public/comments/latest', description: '获取最新评论' },
]

// 测试API
const testApi = async () => {
  if (!testForm.value.endpoint) {
    ElMessage.warning('请选择要测试的接口')
    return
  }

  loading.value = true
  result.value = null

  try {
    let url = testForm.value.endpoint
    let params = {}

    // 如果有参数，解析JSON
    if (testForm.value.params) {
      try {
        params = JSON.parse(testForm.value.params)
      } catch (e) {
        ElMessage.error('参数格式错误，请输入有效的JSON')
        loading.value = false
        return
      }
    }

    const response = await axios.get(url, { params })
    
    result.value = {
      success: true,
      data: response.data
    }
    
    ElMessage.success('请求成功')
  } catch (error: any) {
    result.value = {
      success: false,
      data: error.response?.data || { message: error.message }
    }
    ElMessage.error('请求失败')
  } finally {
    loading.value = false
  }
}

// 快速测试
const quickTest = (path: string) => {
  testForm.value.endpoint = path
  
  // 设置默认参数
  if (path === '/api/public/articles') {
    testForm.value.params = '{\n  "page": 1,\n  "limit": 10\n}'
  } else if (path.includes('latest') || path.includes('popular')) {
    testForm.value.params = '{\n  "limit": 10\n}'
  } else {
    testForm.value.params = ''
  }
  
  // 自动滚动到测试区域
  document.querySelector('.test-card')?.scrollIntoView({ behavior: 'smooth' })
}

// 清空结果
const clearResult = () => {
  result.value = null
}
</script>

<style scoped>
.public-api-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.header-card {
  margin-bottom: 20px;
  text-align: center;
}

.header-card h1 {
  margin: 0 0 10px 0;
  color: #303133;
}

.subtitle {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.test-card,
.docs-card,
.usage-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-area {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.result-header {
  padding: 10px 15px;
  background: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-content {
  padding: 15px;
  margin: 0;
  background: #282c34;
  color: #abb2bf;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  max-height: 500px;
}

.usage-content {
  line-height: 1.8;
}

.usage-content h3 {
  margin: 20px 0 10px 0;
  color: #303133;
}

.usage-content ul {
  padding-left: 20px;
  margin: 10px 0;
}

.usage-content li {
  margin: 5px 0;
}

.code-block {
  padding: 15px;
  margin: 10px 0;
  background: #282c34;
  color: #abb2bf;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}
</style>
