const express = require("express")
const router = express.Router()
const fs = require("fs")

function readBackground() {
    try {
      const backgroundList = fs.readFileSync("./data/backgrounds.json")
      const backgroundDetails = JSON.parse(backgroundList)
      return backgroundDetails
    } catch (error) {
      console.log("Error reading background data", error.message)
      return []
    }
  }

router.get('/', (_req, res) => {
  const backgroundData = readBackground()
  res.json(backgroundData)
})

router.get("/:index", (req, res) => {
    const backgroundData = readBackground()
    const currentBackground = backgroundData.find((background) => background.index === req.params.index)

    if(!currentBackground) {
      return res.status(404).send("Background not found")
    }
    else{
      res.json(currentBackground)
    }
})

module.exports = router