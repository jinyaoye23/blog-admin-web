import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3001,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL?.replace('/api', '') || 'http://192.168.31.185:3000',
          changeOrigin: true,
        },
        '/uploads': {
          target: env.VITE_API_BASE_URL?.replace('/api', '') || 'http://192.168.31.185:3000',
          changeOrigin: true,
        },
      },
    },
  }
})
