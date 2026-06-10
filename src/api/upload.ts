import request from '@/utils/request'
import type { UploadResponse, ApiResponse } from '@/types'

export const uploadAPI = {
  // 单图上传
  uploadSingle: (file: File): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData()
    formData.append('image', file)
    return request.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // 多图上传 (最多5张)
  uploadMultiple: (files: File[]): Promise<ApiResponse<UploadResponse[]>> => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return request.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
