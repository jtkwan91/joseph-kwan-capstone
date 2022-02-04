const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const SessionStore = require("session-file-store")(session)

const PORT = process.env.PORT ?? 8080
const SESSION_SECRET = `3c77f790a1f249ffd56cd282f45bed15926060fb3656a9c1e24360e71a84a7a0`

app.use(
  cors({
    origin: `http://localhost:3000`, //to do: find out how to allow wildcard with credentials
    credentials: true,
  })
)
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: new SessionStore(),
  })
)

app.use("/backgrounds", require("./routes/backgrounds"))
app.use("/users", require("./routes/users"))
app.use("/characters", require("./routes/characters"))

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})
