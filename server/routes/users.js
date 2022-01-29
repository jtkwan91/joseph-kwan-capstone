const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))
const crypto = require('crypto')

function hash(s) {
    return crypto.createHash('md5').update(s).digest("hex")
}

// router.get('/setsession', (req,res) => {
//     req.session.boobs = Math.random()
//     res.send("session set")
// })

// router.get('/getsession', (req,res) => {
//     res.json({
//         boobs: req.session.boobs
//     })
// })

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

router.post("/login", async (req, res) => {
    try{
        const user = await knex('users')
        .select('id', 'email', 'hashed_password', 'display_name')
        .where({email: req.body.email})
        .first()
        if (!user)
            return res.status(401).send("no user")
        if (user.hashed_password !== hash(req.body.password))
            return res.status(401).send("invalid password")
        req.session.userId = user.id
        return res.status(200).json({email: user.email, display_name: user.display_name})
    }
    catch(err) {
        return res.status(500).send(err.message)
    }
})

router.post('/logout', (req, res) => {
    if(!req.session.userId)
    return res.status(403).send("You must be logged in")
    req.session.userId = null
    res.send('ok bud')
 })

module.exports = router
