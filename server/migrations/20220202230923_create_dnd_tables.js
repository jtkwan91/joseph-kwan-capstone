exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary().notNullable()
      table.string("email").notNullable()
      table.unique("email")
      table.string("hashed_password").notNullable()
      table.string("display_name").notNullable()
      table.timestamp("time_created").notNullable().defaultTo(knex.fn.now())
      table
        .timestamp("time_updated")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    })
    .createTable("characters", function (table) {
      table.increments("id").primary().notNullable()
      table.integer("user_id").notNullable()
      table.string("name")
      table.specificType("avatar", "mediumblob")
      table.string("race").notNullable()
      table.string("subrace")
      table.string("class").notNullable()
      table.string("archetype")
      table.string("background").notNullable()
      table.integer("abi_str")
      table.integer("abi_dex")
      table.integer("abi_con")
      table.integer("abi_int")
      table.integer("abi_wis")
      table.integer("abi_cha")
      table.integer("current_hp")
      table.integer("max_hp")
      table.integer("temp_hp")
      table.integer("speed")
      table.integer("exp")
      table.integer("level")
      table.text("equipment")
      table.text("attacks")
      table.text("traits")
      table.text("proficiencies")
      table.text("languages")
      table.text("saving_throws")
      table.text("notes")
    })
}

exports.down = function (_knex) {}
