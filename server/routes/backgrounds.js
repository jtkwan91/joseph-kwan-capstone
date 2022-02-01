const express = require("express")
const router = express.Router()
const backgrounds = require("../data/backgrounds.json")

router.get("/", (_req, res) => {
  res.json(backgrounds)
})

module.exports = router
