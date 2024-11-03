import { Navigate, Outlet } from "react-router-dom";
import { useMainSt } from "@/stores/main";
import useRecord from "@/hooks/useRecord";
import { useEffect } from "react";

export function RootLayout() {
    const { user } = useMainSt()
    if (user == null) return <Navigate to="/signin" />

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getAllRecordsMutation } = useRecord()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getAllRecordsMutation.mutate()
    }, [])

    if (getAllRecordsMutation.isPending) {
        return (
            <div className="h-screen w-screen flex justify-center items-center text-5xl">
                Loading...
            </div>
        )
    }

    return <div className="w-screen h-screen flex flex-col items-center bg-gray-100 gap-10">
        <Outlet />
    </div>
}