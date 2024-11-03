import AuthForm from "@/components/Auth/AuthForm"
import useAuth from "@/hooks/useAuth"

function Singup() {
    const { signinMutation } = useAuth()

    return (
        <AuthForm authAction={signinMutation} isSingup={true} />
    )
}

export default Singup