const knex = require(`knex`)(require(`../knexfile`));

const getLeagues = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userLeagues = await knex(`leagues`).where({ user_id: user_id });
    if (!userLeagues.length) {
      return res
        .status(404)
        .json({ message: `No leagues found for this user` });
    }

    res.status(200).json(userLeagues);
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

const getLeague = async (req, res) => {
  const { user_id, league_id } = req.params;

  try {
    const userLeagues = await knex(`leagues`).where({ user_id: user_id });
    if (!userLeagues.length) {
      return res
        .status(404)
        .json({ message: `No leagues found for this user` });
    }

    const league = await knex
      .select("leagues.name AS league_name", `teams.*`)
      .from("leagues")
      .join(`teams`, `leagues.id`, `teams.league_id`)
      .where(`leagues.id`, league_id);
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
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
    res.status(500).json(`Server error: ${error}`);
  }
};

const editLeague = async (req, res) => {
  const { user_id, league_id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: "You must provide a league name and user ID" });
  }

  try {
    const userLeagues = await knex(`leagues`).where({ user_id: user_id });
    if (!userLeagues.length) {
      return res
        .status(404)
        .json({ message: `No leagues found for this user` });
    }

    const league = await knex(`leagues`).where({ id: league_id });
    if (!league.length) {
      return res
        .status(404)
        .json({ message: `No leagues found with ID: ${league_id}` });
    }

    await knex("leagues").where({ id: league_id }).update(req.body);

    const updatedLeague = await knex("leagues")
      .where({ id: league_id })
      .first();
    res.json(updatedLeague);
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

const deleteLeague = async (req, res) => {
  const { user_id, league_id } = req.params;

  try {
    const userLeagues = await knex(`leagues`).where({ user_id: user_id });
    if (!userLeagues.length) {
      return res
        .status(404)
        .json({ message: `No leagues found for this user` });
    }

    const league = await knex(`leagues`).where({ id: league_id });
    if (!league.length) {
      return res
        .status(404)
        .json({ message: `No leagues found with ID: ${league_id}` });
    }

    await knex(`teams`).where({ league_id: league_id }).del();
    await knex("leagues").where({ id: league_id }).del();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

module.exports = {
  getLeagues,
  getLeague,
  createLeague,
  editLeague,
  deleteLeague,
};
