import { User } from "@/stores/userStore";

export default interface ResponseBodyAuth {
    accessToken: string
    refreshToken: string
    user: User
}
