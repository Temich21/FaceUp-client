import { useForm } from "react-hook-form";
import useAuth from '@/hooks/useAuth';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import { FormAuth, FormHeader, PasswordField, TextField } from './AuthForm';
import { SigninSchema } from './SigninForm';

const SignupSchema = SigninSchema.extend({
    name: z.string().nonempty("Please enter your name"),
    age: z
        .number()
        .min(6, "Age must be at least 6")
        .max(120, "Please enter a realistic age"),
})

const SignupForm = () => {
    const { signupMutation } = useAuth()

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    const onSubmit = (userCredentionals: z.infer<typeof SignupSchema>) => {
        signupMutation.mutate(userCredentionals)
    }

    return (
        <>
            <FormHeader isSingup={true} />
            <FormAuth onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 items-center justify-items-end border-black">
                <TextField
                    label="Name"
                    id="name"
                    register={register}
                    error={errors.name?.message}
                />
                <TextField
                    label="Email"
                    id="email"
                    register={register}
                    error={errors.email?.message}
                />
                <TextField
                    label="Age"
                    id="age"
                    type="number"
                    register={register}
                    error={errors.age?.message}
                    {...register("age", { valueAsNumber: true })}
                />
                <PasswordField register={register} error={errors.password?.message} />
                <Button
                    disabled={signupMutation.isPending}
                    type="submit"
                    className="col-span-full mt-3"
                >
                    {signupMutation.isPending ? "Loaing..." : "Sign Up"}
                </Button>
            </FormAuth>
        </>
    )
}

export default SignupForm