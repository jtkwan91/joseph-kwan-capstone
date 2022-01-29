const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))

router.get("/", (req,res) => {
    knex
    .select("*")
    .from("characters")
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(500).send("Error getting chracters")
    })
})

router.post("/add", (req,res) => {
    console.log(req.body)
    knex('characters')
    .insert({
        name: req.body.charName,
        avatar: req.body.avatar,
        race: req.body.race,
        subrace: req.body.subrace,
        class: req.body.char_class,
        archetype: req.body.archetype,
        background: req.body.background,
        abi_str: req.body.abilities.str,
        abi_dex: req.body.abilities.dex,
        abi_con: req.body.abilities.con,
        abi_wis: req.body.abilities.wis,
        abi_int: req.body.abilities.int,
        abi_cha: req.body.abilities.cha,
        max_hp: req.body.hp,
        speed: req.body.speed,
    })
    .then(() => {
        res.status(201).send("ok")
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

module.exports = router