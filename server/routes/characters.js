const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))

// router.get("/", (req,res) => {
//     knex
//     .select("*")
//     .from("characters")
//     .then((data) => {
//         res.json(data)
//     })
//     .catch((err) => {
//         res.status(500).send("Error getting chracters")
//     })
// })

function withDecodeAvatar(char) {
    return {...char, avatar: char.avatar? char.avatar.toString() : char.avatar}
}

function characterQuery() {
    return knex
    .select("characters.*","races.name as race_name")
    .from("characters")
    .join('races', 'races.id', '=', 'characters.race')
}

router.get("/", (req,res) => {
    if (!req.session.userId)
    return res.status(403).send('You must be logged in bud')
    characterQuery()
    .where({user_id: req.session.userId})
    .then((data) => res.json(data.map(withDecodeAvatar)))
    .catch((err) => {
        res.status(500).send("Error getting characters")
    })
})

router.get("/:id", async (req, res) => {
    if (!req.session.userId)
        return res.status(403).send('You must be logged in bud')
    try{
        const char = await 
        characterQuery()
        .where({'characters.id': req.params.id})
        .first()
        if(!char)
            return res.status(404).send('Error character not found')
        if (char.user_id !== req.session.userId)
            return res.status(403).send('Unauthorized access')
        else
            return res.json(withDecodeAvatar(char))
    }
    catch(err){
        res.status(500).send('Error getting character')
    }
})

router.post("/add", (req,res) => {
    if(!req.session.userId) 
    return res.status(403).send("You must be logged in bud")
    knex('characters')
    .insert({
        user_id: req.session.userId,
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
        level: req.body.level,
        exp: req.body.exp
    })
    .then(() => {
        res.status(201).send("ok")
    })
    .catch((err) => {
        res.status(500).send(err.message)
    })
})

module.exports = router