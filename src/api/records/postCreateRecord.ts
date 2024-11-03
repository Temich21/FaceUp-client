import $api from "../api";
import { AxiosResponse } from 'axios';
import { Category, Record } from "@/stores/recordStore";

export type RequestBodyCreateRecord = {
  title: string
  details: string
  category: Category
}

export const postCreateRecord = async (credentials: RequestBodyCreateRecord, userId: string): Promise<AxiosResponse<Record>> => {
  return await $api.post<Record>('/record', { ...credentials, userId })
}
