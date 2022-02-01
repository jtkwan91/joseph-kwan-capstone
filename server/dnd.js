const axios = require('axios')
const API_URL = "https://www.dnd5eapi.co/api"
const SERVER_URL = "http://localhost:8080"
const clientServ = axios.create({
    baseURL: SERVER_URL
})
const client = axios.create({
    baseURL: API_URL
})

function getRace(index) {
    return client
    .get(`/races/${index}`)
    .then((response) => response.data)
}

function getSubRace(index) {
    return index
    ? client.get(`/subraces/${index}`).then((response) => response.data)
    : null
}

function getClass(index) {
    return client
    .get(`/classes/${index}`)
    .then((response) => response.data)
}

function getArchetype(index) {
    return index
    ? client.get(`/subclasses/${index}`).then((response) => response.data)
    : null
}

function getBackground(index) {
    return clientServ
    .get(`/backgrounds/${index}`)
    .then((response) => response.data)
}

module.exports = {getRace, getClass, getSubRace, getArchetype, getBackground}