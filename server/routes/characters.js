const express = require("express")
const router = express.Router()
const knex = require("knex")(require("../knexfile"))
const {
  getRace,
  getClass,
  getSubRace,
  getArchetype,
  getBackground,
} = require("../dnd")

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

async function withDependencies(char) {
  return {
    ...char,
    avatar: char.avatar ? char.avatar.toString() : char.avatar,
    race: await getRace(char.race),
    subrace: await getSubRace(char.subrace),
    class: await getClass(char.class),
    archetype: await getArchetype(char.archetype),
    background: await getBackground(char.background),
  }
}

router.get("/", (req, res) => {
  if (!req.session.userId) return res.status(403).send("You must be logged in.")
  knex
    .select("*")
    .from("characters")
    .where({ user_id: req.session.userId })
    .then(async (data) =>
      res.json(await Promise.all(data.map(withDependencies)))
    )
    .catch((err) => {
      res.status(500).send("Error getting characters")
    })
})

router.get("/:id", async (req, res) => {
  if (!req.session.userId) return res.status(403).send("You must be logged in.")
  try {
    const char = await knex
      .select("*")
      .from("characters")
      .where({ id: req.params.id })
      .first()
    if (!char) return res.status(404).send("Error character not found")
    if (char.user_id !== req.session.userId)
      return res.status(403).send("Unauthorized access")
    return res.json(await withDependencies(char))
  } catch (err) {
    res.status(500).send("Error getting character")
  }
})

router.post("/add", (req, res) => {
  if (!req.session.userId) return res.status(403).send("You must be logged in.")
  knex("characters")
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
      current_hp: req.body.hp,
      temp_hp: 0,
      max_hp: req.body.hp,
      speed: req.body.speed,
      level: req.body.level,
      exp: req.body.exp,
    })
    .then(() => {
      res.status(201).send("ok")
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.delete("/delete", (req, res) => {
  if (!req.session.userId) return res.status(403).send("You must be logged in.")
  knex("characters").where("id", req.body.id).del()
})

module.exports = router
