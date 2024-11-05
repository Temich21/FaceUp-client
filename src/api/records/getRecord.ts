import $api from "../api";
import { AxiosResponse } from 'axios';
import { SelectedRecord } from "@/stores/selectedRecordStore";

export const getRecord = async (recordId: string): Promise<AxiosResponse<SelectedRecord>> => {
    return await $api.get<SelectedRecord>(`record/${recordId}`)
}
