import $api from "../api";
import { AxiosResponse } from 'axios';
import ResponseBodyAuth from "./responseType";

export type RequestBodySignup = {
  name: string
  email: string
  age: number
  password: string
}

export const postSignup = async (credentials: RequestBodySignup): Promise<AxiosResponse<ResponseBodyAuth>> => {
    return await $api.post<ResponseBodyAuth>('/auth/signup', credentials)
}
