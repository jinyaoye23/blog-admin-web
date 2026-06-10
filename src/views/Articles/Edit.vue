<template>
  <div class="article-edit-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? '编辑文章' : '创建文章' }}</span>
          <el-button @click="router.back()">返回</el-button>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="articleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="文章摘要" prop="excerpt">
          <el-input
            v-model="articleForm.excerpt"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要"
          />
        </el-form-item>

        <el-form-item label="封面图片">
          <el-upload
            class="cover-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="handleCoverUpload"
          >
            <img v-if="articleForm.coverImage" :src="getImageUrl(articleForm.coverImage)" class="cover-image" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="articleForm.categoryId" placeholder="选择分类" clearable>
            <el-option
              v-for="category in categoryStore.categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="标签">
          <el-select v-model="articleForm.tagIds" multiple placeholder="选择标签" clearable>
            <el-option
              v-for="tag in tagStore.tags"
              :key="tag.id"
              :label="tag.name"
              :value="tag.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="articleForm.status">
            <el-radio value="draft">草稿</el-radio>
            <el-radio value="published">发布</el-radio>
            <el-radio value="archived">归档</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="文章内容" prop="content">
          <MdEditor
            v-model="articleForm.content"
            :preview="false"
            height="600px"
            @on-upload-img="handleImageUpload"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            {{ loading ? '保存中...' : '保存' }}
          </el-button>
          <el-button @click="router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useArticleStore } from '@/stores/article'
import { useCategoryStore } from '@/stores/category'
import { useTagStore } from '@/stores/tag'
import { uploadAPI } from '@/api/upload'
import type { ArticleRequest } from '@/types'

const router = useRouter()
const route = useRoute()
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const tagStore = useTagStore()

const isEdit = computed(() => !!route.params.id)
const formRef = ref()
const loading = ref(false)

const articleForm = reactive<ArticleRequest>({
  title: '',
  content: '',
  excerpt: '',
  coverImage: '',
  categoryId: undefined,
  tagIds: [],
  status: 'draft',
})

const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
}

const handleCoverUpload = async (file: File) => {
  try {
    const res: any = await uploadAPI.uploadSingle(file)
    if (res.data?.data) {
      articleForm.coverImage = res.data.data.url
      return false // 阻止默认上传行为
    }
  } catch (error) {
    ElMessage.error('封面上传失败')
  }
  return false
}

// Markdown 编辑器图片上传处理
const handleImageUpload = async (files: File[], callback: any) => {
  const urls: string[] = []
  
  for (const file of files) {
    try {
      const res: any = await uploadAPI.uploadSingle(file)
      if (res.data?.data) {
        const imageUrl = getImageUrl(res.data.data.url)
        urls.push(imageUrl)
      }
    } catch (error) {
      ElMessage.error('图片上传失败')
    }
  }
  
  callback(urls)
}

const getImageUrl = (url: string) => {
  if (url.startsWith('http')) {
    return url
  }
  return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}${url}`
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        if (isEdit.value) {
          await articleStore.updateArticle(Number(route.params.id), articleForm)
          ElMessage.success('更新成功')
        } else {
          await articleStore.createArticle(articleForm)
          ElMessage.success('创建成功')
        }
        router.push('/articles')
      } catch (error) {
        console.error('保存失败:', error)
      } finally {
        loading.value = false
      }
    }
  })
}

const loadArticleDetail = async () => {
  if (!isEdit.value) return
  
  await articleStore.fetchArticleById(Number(route.params.id))
  const article = articleStore.currentArticle
  if (article) {
    Object.assign(articleForm, {
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      coverImage: article.coverImage || '',
      categoryId: article.categoryId,
      tagIds: article.tags?.map(t => t.id) || [],
      status: article.status,
    })
  }
}

onMounted(() => {
  categoryStore.fetchCategories()
  tagStore.fetchTags()
  loadArticleDetail()
})
</script>

<style scoped lang="scss">
.article-edit-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
  
  .cover-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 300px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      border-color: #409eff;
    }
    
    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .cover-uploader-icon {
      font-size: 28px;
      color: #8c939d;
    }
  }
}
</style>