import $api from "../api";
import { AxiosResponse } from 'axios';
import ResponseBodyAuth from "./responseType";

export type RequestBodySignin = {
  email: string
  password: string
}

export const postSignin = async (credentials: RequestBodySignin): Promise<AxiosResponse<ResponseBodyAuth>> => {
    return await $api.post<ResponseBodyAuth>('/auth/signin', credentials)
}
