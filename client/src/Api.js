import axios from "axios";
const serverUrl = "http://localhost:8080"

export function registerUser(userData){
    return axios
    .post(`${serverUrl}/users/register`, userData)
}

export function loginUser(userData){
    return axios
    .post(`${serverUrl}/users/login`, userData)
    .then((response) => response.data)
    // todo: if 401 status forward error response
}

export function addCharacter(charData){
    return axios
    .post(`${serverUrl}/characters/add`, charData)
}