/**
 * @param { import(`knex`).Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(`leagues`).del();
  await knex(`leagues`).insert([
    {
      id: `1`,
      user_id: `1`,
      name: `Lustrian Superleague`,
    },
    {
      id: `2`,
      user_id: `1`,
      name: `Thimble Cup`,
    },
    {
      id: `3`,
      user_id: `1`,
      name: `Badlands Brawl`,
    },
    {
      id: `4`,
      user_id: `1`,
      name: `Old World Classic`,
    },
  ]);
};
