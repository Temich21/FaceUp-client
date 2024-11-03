import $api from "../api";
import { AxiosResponse } from 'axios';
import { Record } from '@/stores/recordStore'

export const getAllRecords = async (userId: string): Promise<AxiosResponse<Record[]>> => {
    return await $api.get(`/record/all/${userId}`)
}
