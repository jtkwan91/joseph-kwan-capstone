const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.json())

app.use("/backgrounds", require('./routes/backgrounds'))
app.use("/users", require('./routes/users'))
// app.use("/characters", charactersRoutes)


app.listen(PORT, () => {
   console.log(`app running on port ${PORT}`)
})