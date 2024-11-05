import $api from "../api";
import { AxiosResponse } from 'axios';

export const deleteFile = async (fielId: string): Promise<AxiosResponse> => {
    return await $api.delete(`/file/${fielId}`)
}
