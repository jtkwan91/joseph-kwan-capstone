import axios from "axios"
const serverUrl = "http://localhost:8080"
const client = axios.create({
  withCredentials: true,
})

export function registerUser(userData) {
  return client.post(`${serverUrl}/users/register`, userData)
}

export function initialiseUser() {
  return client
    .get(`${serverUrl}/users/initialise`)
    .then((response) => response.data)
}

export function loginUser(userData) {
  return client
    .post(`${serverUrl}/users/login`, userData)
    .then((response) => response.data)
  // todo: if 401 status forward error response
}

export function logoutUser() {
  return client.post(`${serverUrl}/users/logout`)
}

export function addCharacter(charData) {
  return client.post(`${serverUrl}/characters`, charData)
}

export function delCharacter(id) {
  return client.delete(`${serverUrl}/characters/${id}`)
}

export async function getCharacters() {
  const response = await client.get(`${serverUrl}/characters`)
  return response.data
}

export function getCharacter(id) {
  return client
    .get(`${serverUrl}/characters/${id}`)
    .then((response) => response.data)
}
