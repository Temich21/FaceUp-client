import { useForm } from "react-hook-form";
import useAuth from '@/hooks/useAuth';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { FormAuth, FormHeader, PasswordField, TextField } from './AuthForm';

export const SigninSchema = z.object({
    email: z.string()
        .nonempty("Please enter your email")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .nonempty("Please enter your password")
        .min(4, "Password must be at least 4 characters long"),
})

const SigninForm = () => {
    const { signinMutation } = useAuth()

    const form = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    const onSubmit = (userCredentionals: z.infer<typeof SigninSchema>) => {
        signinMutation.mutate(userCredentionals)
    }

    return (
        <>
            <FormHeader isSingup={false} />
            <FormAuth onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-items-end border-black">
                <TextField
                    label="Email"
                    id="email"
                    type="text"
                    register={register}
                    error={errors.email?.message}
                />
                <PasswordField register={register} error={errors.password?.message} />
                <Button
                    disabled={signinMutation.isPending}
                    type="submit"
                    className="col-span-full mt-3"
                >
                    {signinMutation.isPending ? "Loaing..." : "Sign In"}
                </Button>
            </FormAuth>
        </>
    )
}

export default SigninForm