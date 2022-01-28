const express = require('express')
const app = express()
const cors = require('cors')
const backgroundRoutes = require('./routes/backgrounds')
// const charactersRoutes = require('./routes/characters')

const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())

app.use("/backgrounds", backgroundRoutes)
// app.use("/characters", charactersRoutes)

app.listen(PORT, () => {
   console.log(`app running on port ${PORT}`)
})