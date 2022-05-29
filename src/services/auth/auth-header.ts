import { AxiosRequestHeaders } from "axios"
import { LocalStorageUser } from "./auth.service"

export default function authHeader(): AxiosRequestHeaders {
    const user : LocalStorageUser | null = JSON.parse(localStorage.getItem('pong_user') || "")
    if (user && user.token)
    {
        console.log(user)
        return {Authorization:'Bearer ' + user.token}
    }
    else return {}
}