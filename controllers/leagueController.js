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

module.exports = { getLeagues };
