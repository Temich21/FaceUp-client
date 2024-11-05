import { DetailedHTMLProps, FormHTMLAttributes, forwardRef, useState } from 'react';
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Link } from "../Link";
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export const FormHeader = ({ isSingup }: { isSingup: boolean }) => {
    const AuthText = isSingup ? "Sign Up" : "Sign In"

    return (
        <div className='flex justify-center items-end mb-8'>
            <h1 className="text-3xl font-bold text-center">{AuthText}</h1>
            <Link
                className='absolute ml-72'
                to={isSingup ? "/signin" : "/signup"}
            >
                {isSingup ? "Sign In" : "Sign Up"}
            </Link>
        </div>
    )
}

export const FormAuth = forwardRef<
    HTMLFormElement,
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement>
>(({ className, children, ...rest }, ref) => {
    return <form
        className={`flex flex-col gap-2 items-center justify-items-end border-black ${className}`}
        {...rest}
        ref={ref}
    >
        {children}
    </form>
})

type TextFieldProps<T extends FieldValues> = {
    label: string
    id: Path<T>
    type?: string
    register: UseFormRegister<T>
    error?: string
}

export const TextField = <T extends FieldValues,>({ label, id, type = "text", register, error }: TextFieldProps<T>) => (
    <div className="w-full">
        <div className="flex items-center w-full">
            <label className="font-bold w-20" htmlFor={id}>{label}</label>
            <Input
                id={id}
                type={type}
                className="w-72"
                {...register(id)}
            />
        </div>
        {error && <p className="text-red-500">{error}</p>}
    </div>
)

type PasswordFieldProps<T extends FieldValues & { password: string }> ={
    register: UseFormRegister<T>
    error?: string
}

export const PasswordField = <T extends FieldValues & { password: string }>({ register, error }: PasswordFieldProps<T>) => {
    const [eye, setEye] = useState(false)

    return (
        <div className="w-full">
            <div className="flex w-full gap-1">
                <div className="flex items-center w-full">
                    <label className="font-bold w-20" htmlFor="password">Password</label>
                    <Input
                        id="password"
                        type={eye ? "text" : "password"}
                        className="w-72"
                        {...register("password" as Path<T>)}
                    />
                    <button
                        type="button"
                        onClick={() => setEye(prev => !prev)}
                        className="w-8 flex justify-center items-center"
                    >
                        <FontAwesomeIcon className="h-5" icon={eye ? faEye : faEyeSlash} />
                    </button>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}