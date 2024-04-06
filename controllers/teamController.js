const knex = require(`knex`)(require(`../knexfile`));

const createTeam = async (req, res) => {
  const { user_id, league_id, name, faction, head_coach, team_value } =
    req.body;
  if (
    !user_id ||
    !league_id ||
    !name ||
    !faction ||
    !head_coach ||
    !team_value
  ) {
    return res.status(400).json({
      message: `The following fields are all required: user_id, league_id, name, faction, head_coach, team_value`,
    });
  }

  try {
    const whichUser = await knex(`users`).where({ id: user_id });
    if (!whichUser.length) {
      return res
        .status(400)
        .json({ message: `Could not find a user with ID: ${user_id}` });
    }

    const league = await knex(`leagues`).where(`leagues.id`, league_id);
    if (!league.length) {
      return res
        .status(404)
        .json({ message: `No leagues found with ID: ${league_id}` });
    }

    const newTeamIds = await knex("teams").insert(req.body);
    const newTeam = await knex("teams").where({ id: newTeamIds[0] }).first();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

const getTeam = async (req, res) => {
  const { user_id, league_id, team_id } = req.params;
  if (!user_id || !league_id || !team_id) {
    res.status(400).json({
      message: `The following parameters are all required: user_id, league_id, team_id`,
    });
  }

  try {
    const teamUser = await knex(`teams`).where({
      user_id: user_id,
      id: team_id,
    });
    if (!teamUser.length) {
      return res.status(400).json({ message: `No teams found for this user` });
    }

    const teamLeague = await knex(`leagues`).where(`leagues.id`, league_id);
    if (!teamLeague.length) {
      return res
        .status(404)
        .json({ message: `No teams found for this league` });
    }

    const team = await knex(`teams`).where(`teams.id`, team_id);
    if (!team.length) {
      return res
        .status(404)
        .json({ message: `No team found with ID: ${team_id}` });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

module.exports = { createTeam, getTeam };
