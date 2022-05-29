import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3001/user"

class UserService {

    changeUsername(newName : String) : Promise<AxiosResponse | never>{
        return axios.put(API_URL+"/name",
            { name:newName },
            { headers:authHeader() }
        )
    }
}

export default new UserService();