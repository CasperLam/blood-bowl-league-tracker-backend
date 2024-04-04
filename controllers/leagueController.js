const knex = require(`knex`)(require(`../knexfile`));

const getLeagues = async (req, res) => {
  const { user_id } = req.params;

  try {
    const leagues = await knex(`leagues`).where(`leagues.user_id`, user_id);

    if (!leagues.length) {
      return res
        .status(404)
        .json({ message: `No leagues found for this user` });
    }

    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json(`Server error: `, error);
  }
};

const createLeague = async (req, res) => {
  const { name, user_id } = req.body;

  if (!name || !user_id) {
    return res
      .status(400)
      .json({ message: `"name" and "user_id" are required` });
  }

  try {
    const whichUser = await knex(`users`).where({ id: user_id });
    if (!whichUser.length) {
      return res
        .status(400)
        .json({ message: `Could not find a user with ID: ${user_id}` });
    }
    const newLeagueIds = await knex("leagues").insert(req.body);
    const newLeague = await knex("leagues")
      .where({ id: newLeagueIds[0] })
      .first();
    res.status(201).json(newLeague);
  } catch (error) {
    res.status(500).json(`Server error: `, error);
  }
};

module.exports = { getLeagues, createLeague };
