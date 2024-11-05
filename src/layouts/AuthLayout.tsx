import { Navigate, Outlet } from "react-router-dom";
import { useMainSt } from "@/stores/main";

export function AuthLayout() {
    const { user } = useMainSt()
    if (user != null) return <Navigate to="/" />

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
            <div className="max-w-md w-full">
                <div className="shadow-xl bg-white p-6 rounded-lg">
                    < Outlet />
                </div>
            </div>
        </div>
    )
}