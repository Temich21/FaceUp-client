import { useMainSt } from '@/stores/main';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postSignin, RequestBodySignin, postSignup, RequestBodySignup, getLogout } from '@/api/auth/index';
import ResponseBodyAuth from '@/api/auth/responseType';
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios';

type useAuth = {
  signupMutation: UseMutationResult<ResponseBodyAuth, Error, RequestBodySignup, unknown>,
  signinMutation: UseMutationResult<ResponseBodyAuth, Error, RequestBodySignin, unknown>,
  logoutMutation: UseMutationResult<AxiosResponse, Error, void, unknown>
}

const useAuth = (): useAuth => {
  const { setUser } = useMainSt()

  const signupMutation = useMutation({
    mutationFn: (credentials: RequestBodySignup) => postSignup(credentials).then(res => res.data),
    onSuccess: (data) => {
      setUser(data.user)
      toast.success("Sign In successful")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const signinMutation = useMutation({
    mutationFn: (credentials: RequestBodySignin) => postSignin(credentials).then(res => res.data),
    onSuccess: (data) => {
      setUser(data.user)
      toast.success("Sign In successful")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => getLogout(),
    onSuccess: () => {
      setUser(null)
      toast.success("Log Out successful")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    signupMutation,
    signinMutation,
    logoutMutation
  }
}

export default useAuth;
