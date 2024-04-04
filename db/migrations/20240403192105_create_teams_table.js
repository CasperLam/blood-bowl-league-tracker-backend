/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(`teams`, (table) => {
    table.increments(`id`);
    table
      .integer(`user_id`)
      .unsigned()
      .notNullable()
      .references(`id`)
      .inTable(`users`)
      .onUpdate(`CASCADE`)
      .onDelete(`CASCADE`);
    table
      .integer(`league_id`)
      .unsigned()
      .notNullable()
      .references(`id`)
      .inTable(`leagues`)
      .onUpdate(`CASCADE`)
      .onDelete(`CASCADE`);
    table.string(`name`).notNullable();
    table.string(`faction`).notNullable();
    table.string(`head_coach`);
    table.integer(`points`).notNullable().defaultTo(0);
    table.integer(`team_value`).notNullable();
    table.timestamp(`create_at`).defaultTo(knex.fn.now());
    table
      .dateTime(`updated_at`)
      .defaultTo(knex.raw(`NULL ON UPDATE CURRENT_TIMESTAMP`));
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(`teams`);
};
