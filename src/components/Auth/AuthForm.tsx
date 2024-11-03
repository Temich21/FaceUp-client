import { Link } from '@/components/Link';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { UseMutationResult } from '@tanstack/react-query';
import ResponseBodyAuth from '@/api/auth/responseType';

type UserCredentials = {
    name?: string
    email: string
    age?: number
    password: string
}

interface AuthFormProps {
    authAction: UseMutationResult<ResponseBodyAuth, unknown, UserCredentials>
    isSingup: boolean
}

const AuthForm = ({ authAction, isSingup }: AuthFormProps) => {
    const [eye, setEye] = useState<boolean>(false)
    const AuthText = isSingup ? "Sign Up" : "Sign In"

    const {
        register,
        handleSubmit,
    } = useForm<UserCredentials>()

    const onSubmit = (authCredentials: UserCredentials) => {
        if (isSingup) {
            authAction.mutate(authCredentials)
        } else {
            authAction.mutate({ email: authCredentials.email, password: authCredentials.password })
        }
    }

    return (
        <>
            <div className='flex justify-center items-end mb-8'>
                <h1 className="text-3xl font-bold text-center">{AuthText}</h1>
                <Link
                    className='absolute ml-72'
                    to={isSingup ? "/signin" : "/signup"}
                >
                    {isSingup ? "Sign In" : "Sign Up"}
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-items-end border-black">
                {isSingup &&
                    <div className="flex items-center w-full">
                        <label className="font-bold w-20" htmlFor="name">Name</label>
                        <Input
                            id="name"
                            type="text"
                            className='w-72'
                            required
                            {...register("name", {
                                required: "Please Enter Your Name!",
                            })}
                        />
                    </div>
                }
                <div className="flex items-center w-full">
                    <label className="font-bold w-20" htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="text"
                        className='w-72'
                        required
                        {...register("email", {
                            required: "Please Enter Your Email!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter A Valid Email!"
                            }
                        })}
                    />
                </div>
                {isSingup &&
                    <div className="flex items-center w-full">
                        <label className="font-bold w-20" htmlFor="age">Age</label>
                        <Input
                            id="age"
                            type="number"
                            className='w-72'
                            required
                            {...register("age", {
                                required: "Please Enter Your Age!",
                            })}
                        />
                    </div>
                }
                <div className="flex w-full gap-1">
                    <div className="flex items-center w-full">
                        <label className="font-bold w-20" htmlFor="password">Password</label>
                        <Input
                            id="password"
                            type={eye ? "text" : "password"}
                            className='w-72'
                            required
                            {...register("password", {
                                required: "Please Enter Your Password",
                                minLength: {
                                    value: 4,
                                    message: "Password must be at least 4 characters long!"
                                }
                            })}
                        />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setEye(prev => !prev)
                        }}
                        className="w-8 flex justify-center items-center"
                    >
                        {
                            eye ?
                                <FontAwesomeIcon className="h-5" icon={faEye} /> :
                                <FontAwesomeIcon className="h-5" icon={faEyeSlash} />
                        }
                    </button>
                </div>
                <Button
                    disabled={authAction.isPending}
                    type="submit"
                    className="col-span-full"
                >
                    {authAction.isPending ? "Loaing..." : AuthText}
                </Button>
            </form>
        </>
    )
}

export default AuthForm