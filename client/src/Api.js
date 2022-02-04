import axios from "axios"
const serverUrl = "http://localhost:3001"
const client = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
})

export function registerUser(userData) {
  return client.post(`/users/register`, userData)
}

export function initialiseUser() {
  return client
    .get(`/users/initialise`)
    .then((response) => response.data)
}

export function loginUser(userData) {
  return client
    .post(`/users/login`, userData)
    .then((response) => response.data)
  // todo: if 401 status forward error response
}

export function logoutUser() {
  return client.post(`/users/logout`)
}

export function addCharacter(charData) {
  return client.post(`/characters`, charData)
}

export function delCharacter(id) {
  return client.delete(`/characters/${id}`)
}

export async function getCharacters() {
  const response = await client.get(`/characters`)
  return response.data
}


export async function getBackgrounds() {
  return client.get(`/backgrounds`).then(response => response.data)
}

export async function getBackground(index) {
  return client.get(`/backgrounds/${index}`).then(response => response.data)
}

export function updateCharacter(id, data) {
  return client.put(`/characters/${id}`, data)
}

export function getCharacter(id) {
  return client
    .get(`/characters/${id}`)
    .then((response) => response.data)
}

export function avatarUrl(id) {
  return `${serverUrl}/characters/${id}/avatar`
}
