import $api from "../api";
import { AxiosResponse } from 'axios';
import { Record } from "@/stores/recordStore";

export const patchRecord = async (credentials: Record): Promise<AxiosResponse<Record>> => {
  return await $api.patch<Record>('/record', credentials)
}
