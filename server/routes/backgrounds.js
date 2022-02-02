const express = require("express")
const router = express.Router()
const backgrounds = require("../data/backgrounds.json")

router.get("/", (_req, res) => {
  res.json(backgrounds)
})

router.get("/:id", (req, res) => {
  const selectedBackground = backgrounds.find(
    (background) => background.index === req.params.id
  )
  if (!selectedBackground) {
    return res.status(404).send("Background not found")
  } else {
    res.json(selectedBackground)
  }
})

module.exports = router
