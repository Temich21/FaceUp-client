import useAuth from "@/hooks/useAuth";
import AuthForm from "@/components/Auth/AuthForm";

function Signin() {
    const { signinMutation } = useAuth()

    return (
        <AuthForm authAction={signinMutation} isSingup={false} />
    )
}

export default Signin