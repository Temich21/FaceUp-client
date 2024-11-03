import $api from "../api";
import { AxiosResponse } from 'axios';

export const deleteRecord = async (recordId: string): Promise<AxiosResponse<string>> => {
    return await $api.delete(`/record/${recordId}`)
}
