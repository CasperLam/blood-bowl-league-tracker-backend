/**
 * @param { import(`knex`).Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(`users`).del();
  await knex(`users`).insert([
    {
      id: `1`,
      email: `t1@test.com`,
      password: `$2b$10$YsPV7rYiQH4Djztu5aDbVuiCpavSaDqToZAx8CeBkmFm/RF5LzGN2`,
      username: `Casper`,
    },
    {
      id: `2`,
      email: `t2@test.com`,
      password: `$2b$10$YsPV7rYiQH4Djztu5aDbVuiCpavSaDqToZAx8CeBkmFm/RF5LzGN2`,
      username: `Jim`,
    },
    {
      id: `3`,
      email: `t3@test.com`,
      password: `$2b$10$YsPV7rYiQH4Djztu5aDbVuiCpavSaDqToZAx8CeBkmFm/RF5LzGN2`,
      username: `Bob`,
    },
  ]);
};
