const axios = require("axios")
const API_URL = "https://www.dnd5eapi.co/api"
const backgrounds = require("./data/backgrounds.json")

const cache = new Map()

function getCached(url) {
  if (cache.has(url)) {
    return cache.get(url)
  }
  const result = axios.get(url).then((response) => response.data)
  cache.set(url, result)
  return result
}

function getRace(index) {
  return getCached(`${API_URL}/races/${index}`)
}

function getSubRace(index) {
  return index ? getCached(`${API_URL}/subraces/${index}`) : null
}

function getClass(index) {
  return getCached(`${API_URL}/classes/${index}`)
}

function getArchetype(index) {
  return index ? getCached(`${API_URL}/subclasses/${index}`) : null
}

function getBackground(index) {
  return backgrounds.find((background) => background.index === index)
}

module.exports = { getRace, getClass, getSubRace, getArchetype, getBackground }
