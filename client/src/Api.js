import axios from "axios";
const serverUrl = "http://localhost:8080"

export function registerUser({email, password, display}){
    return axios
    .post(`${serverUrl}/users/register`, {email, password, display})
}

export function loginUser({email, password}){
    return axios
    .post(`${serverUrl}/users/login`, {email, password})
    // todo: if 401 status forward error response
}
