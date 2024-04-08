const knex = require(`knex`)(require(`../knexfile`));

const validateUser = async (res, user_id) => {
  const whichUser = await knex(`users`).where({ id: user_id });
  if (!whichUser.length) {
    return res
      .status(400)
      .json({ message: `Could not find a user with ID: ${user_id}` });
  }
};

module.exports = { validateUser };
