import { ReactNode } from "react"

type FullScreenCardProps = {
    children: ReactNode
}

export function AuthFullScreenCard({ children }: FullScreenCardProps) {
    return <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
        <div className="max-w-md w-full">{children}</div>
    </div>
}

AuthFullScreenCard.Body = function ({ children }: FullScreenCardProps) {
    return <div className="shadow-xl bg-white p-6 rounded-lg">{children}</div>
}