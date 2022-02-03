const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))
const crypto = require("crypto")

function hash(s) {
  return crypto.createHash("md5").update(s).digest("hex")
}

router.post("/register", (req, res) => {
  knex("users")
    .insert({
      email: req.body.email,
      hashed_password: hash(req.body.password),
      display_name: req.body.display,
    })
    .then(() => {
      res.status(201).send("ok")
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post("/login", async (req, res) => {
  try {
    const user = await knex
      .select("id", "email", "hashed_password", "display_name")
      .from("users")
      .where({ email: req.body.email })
      .first()
    if (!user) return res.status(401).send("no user")
    if (user.hashed_password !== hash(req.body.password))
      return res.status(401).send("invalid password")
    req.session.userId = user.id
    return res
      .status(200)
      .json({ email: user.email, display_name: user.display_name })
  } catch (err) {
    return res.status(500).send(err.message)
  }
})

router.get("/initialise", async (req, res) => {
  try {
    if (!req.session.userId) return res.status(200).json({})
    const user = await knex
      .select("id", "email", "display_name")
      .from("users")
      .where({ id: req.session.userId })
      .first()
    if (!user) {
      req.session.userId = null
      return res.status(200).json({})
    }
    return res
      .status(200)
      .json({ email: user.email, display_name: user.display_name })
  } catch (err) {
    return res.status(200).json({})
  }
})

router.post("/logout", (req, res) => {
  if (!req.session.userId) return res.status(403).send("You must be logged in")
  req.session.userId = null
  res.send("ok bud")
})

module.exports = router
