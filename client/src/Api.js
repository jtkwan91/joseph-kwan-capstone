import axios from "axios";
const serverUrl = "http://localhost:8080"
export function registerUser({email, password, display}){
    return axios
    .post(`${serverUrl}/users/register`, {email, password, display})
}