import { Outlet, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { RootLayout } from "@/layouts/RootLayout";
import { Home, Singin, Singup } from "@/pages"

export const router = createBrowserRouter([
    {
        element: <ContextWrapper />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    { index: true, element: <Home /> },
                ]
            },
            {
                element: <AuthLayout />,
                children: [
                    { path: 'signin', element: <Singin /> },
                    { path: 'signup', element: <Singup /> }
                ]
            }
        ]

    }
])

function ContextWrapper() {
    return (
        <Outlet />
    )
}