import $api from "../api";
import { AxiosResponse } from 'axios';
import { Category, Record } from "@/stores/recordStore";
import { v4 as uuidv4 } from 'uuid'

export type RequestBodyCreateRecord = {
  title: string
  details: string
  category: Category
  files: File[]
}

export const postCreateRecord = async ({ title, details, category, files }: RequestBodyCreateRecord, userId: string): Promise<AxiosResponse<Record>> => {
  const formData = new FormData()

  formData.append('id', uuidv4())
  formData.append('title', title)
  formData.append('details', details)
  formData.append('category', category)
  formData.append('userId', userId)

  files.forEach(file => {
    formData.append('files', file)
  })

  return await $api.post<Record>('/record', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  )
}
