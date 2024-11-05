import $api from "../api";
import { AxiosResponse } from 'axios';

export type RequestBodyPostFile = {
  file: File
  recordId: string
}

export type ResponseBodyPostFile = {
  id: string
  filename: string
}

export const postFile = async ({ file, recordId }: RequestBodyPostFile): Promise<AxiosResponse<ResponseBodyPostFile>> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('recordId', recordId)

  return await $api.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
