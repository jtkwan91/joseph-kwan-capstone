const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))
const crypto = require('crypto')

function hash(s) {
    return crypto.createHash('md5').update(s).digest("hex")
}

router.get("/", (req,res) => {
    knex
    .select("*")
    .from("users")
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(500).send("Error getting users")
    })
})

router.post("/register", (req,res) => {
    knex('users')
    .insert({
        email: req.body.email, 
        hashed_password: hash(req.body.password),
        display_name: req.body.display
    })
    .then(() => {
        res.status(201).send("ok")
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})
module.exports = router
