import $api from "../api";
import { AxiosResponse } from 'axios';

export const getFile = async (fileId: string): Promise<AxiosResponse<ArrayBuffer>> => {
    return await $api.get<ArrayBuffer>(`file/${fileId}`, {
        responseType: 'arraybuffer'
    })
}
