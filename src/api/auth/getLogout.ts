import $api from "../api";
import { AxiosResponse } from 'axios';

export const getLogout = async (): Promise<AxiosResponse> => {
    return await $api.get('/auth/logout')
}
