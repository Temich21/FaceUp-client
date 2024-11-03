import { Navigate, Outlet } from "react-router-dom";
import { AuthFullScreenCard } from "@/components/Auth/AuthFullScreenCard";
import { useMainSt } from "@/stores/main";

export function AuthLayout() {
    const { user } = useMainSt()
    if (user != null) return <Navigate to="/" />

    return (
        <AuthFullScreenCard>
            <AuthFullScreenCard.Body>
                < Outlet />
            </AuthFullScreenCard.Body>
        </AuthFullScreenCard>
    )
}