/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(`leagues`, (table) => {
    table.uuid(`id`).primary();
    table
      .uuid(`user_id`)
      .references(`users.id`)
      .onUpdate(`CASCADE`)
      .onDelete(`CASCADE`);
    table.string(`name`).notNullable();
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
  return knex.schema.dropTable(`leagues`);
};
