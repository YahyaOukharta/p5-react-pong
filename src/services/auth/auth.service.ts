import axios from "axios"

interface LoginDto {
    email: string
    password: String;
}
interface RegisterDto {
    email: string;
    password: String;
    username: String;
}
interface LocalStorageUser {
    email: string;
    token: string;
}
class AuthService {

    async login(loginData: LoginDto): Promise<unknown> {
        return axios.post("http://localhost:3001/auth/login", loginData)
            .then((res) => {
            if (res.data)
                    localStorage.setItem("pong_user", JSON.stringify({ email: loginData.email, token: res.data }));
                //console.log("logged in succesfully")
                return res.data;
            })
    }
    async register(registerData: RegisterDto): Promise<unknown> {
        return axios.post("http://localhost:3001/auth/register", registerData);
    }

    getCurrentUser(): Object | null {
        const user: string | null = localStorage.getItem("pong_user")
        if (user)
            return JSON.parse(user)
        else return null
    }
    logout(): void {
        localStorage.removeItem("pong_user")
    }

}

export type { LoginDto, RegisterDto, LocalStorageUser }

export default new AuthService();