<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 统计卡片 -->
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#409EFF"><Document /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stats.articleCount }}</div>
              <div class="stat-label">文章总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#67C23A"><ChatDotRound /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stats.commentCount }}</div>
              <div class="stat-label">评论总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#E6A23C"><View /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stats.viewCount }}</div>
              <div class="stat-label">浏览总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :md="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <el-icon class="stat-icon" color="#F56C6C"><User /></el-icon>
            <div class="stat-info">
              <div class="stat-value">{{ stats.userCount }}</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-section">
      <el-col :xs="24" :md="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近7天浏览量趋势</span>
            </div>
          </template>
          <div ref="viewChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :md="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>分类统计</span>
            </div>
          </template>
          <div ref="categoryChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷操作 -->
    <el-row class="quick-actions">
      <el-col :span="24">
        <el-card>
          <template #header>
            <span>快捷操作</span>
          </template>
          <el-space wrap>
            <el-button type="primary" @click="router.push('/articles/create')">
              <el-icon><Plus /></el-icon>
              <span>创建文章</span>
            </el-button>
            <el-button type="success" @click="router.push('/categories')">
              <el-icon><Folder /></el-icon>
              <span>管理分类</span>
            </el-button>
            <el-button type="warning" @click="router.push('/tags')">
              <el-icon><CollectionTag /></el-icon>
              <span>管理标签</span>
            </el-button>
            <el-button type="info" @click="router.push('/comments')">
              <el-icon><ChatDotRound /></el-icon>
              <span>查看评论</span>
            </el-button>
          </el-space>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { 
  Document, ChatDotRound, View, User, Plus, Folder, CollectionTag 
} from '@element-plus/icons-vue'

const router = useRouter()

const viewChartRef = ref<HTMLElement>()
const categoryChartRef = ref<HTMLElement>()

// 模拟统计数据
const stats = ref({
  articleCount: 0,
  commentCount: 0,
  viewCount: 0,
  userCount: 0,
})

// 初始化图表
const initCharts = () => {
  // 浏览量趋势图
  if (viewChartRef.value) {
    const viewChart = echarts.init(viewChartRef.value)
    viewChart.setOption({
      title: {
        text: '浏览量趋势',
        left: 'center',
        textStyle: { fontSize: 14 },
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: '浏览量',
          type: 'line',
          smooth: true,
          data: [120, 132, 101, 134, 90, 230, 210],
          itemStyle: { color: '#409EFF' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(64, 158, 255, 0.5)' },
              { offset: 1, color: 'rgba(64, 158, 255, 0.1)' },
            ]),
          },
        },
      ],
    })
  }

  // 分类统计饼图
  if (categoryChartRef.value) {
    const categoryChart = echarts.init(categoryChartRef.value)
    categoryChart.setOption({
      title: {
        text: '分类分布',
        left: 'center',
        textStyle: { fontSize: 14 },
      },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '文章数量',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 25, name: '技术' },
            { value: 15, name: '生活' },
            { value: 10, name: '随笔' },
            { value: 8, name: '学习' },
            { value: 5, name: '其他' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }
}

onMounted(() => {
  // TODO: 调用 API 获取真实数据
  stats.value = {
    articleCount: 63,
    commentCount: 128,
    viewCount: 5420,
    userCount: 45,
  }
  
  initCharts()
})
</script>

<style scoped lang="scss">
.dashboard-container {
  .stat-card {
    margin-bottom: 20px;
    
    .stat-content {
      display: flex;
      align-items: center;
      
      .stat-icon {
        font-size: 48px;
        margin-right: 20px;
      }
      
      .stat-info {
        flex: 1;
        
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #303133;
        }
        
        .stat-label {
          font-size: 14px;
          color: #909399;
          margin-top: 5px;
        }
      }
    }
  }
  
  .chart-section {
    margin-bottom: 20px;
  }
  
  .card-header {
    font-weight: bold;
  }
  
  .quick-actions {
    margin-bottom: 20px;
  }
}
</style>