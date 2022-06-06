/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('characters', function (table) {
    table.string("hitdie").notNullable().defaultTo("1d6")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('characters', function (table) {
    table.dropColumn('hitdie');
  })
};
