// const { validateUser } = require("../helpers/validations");
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
    // validateUser(res, user_id);

    const whichLeague = await knex(`leagues`).where(`leagues.id`, league_id);
    if (!whichLeague.length) {
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

    const teamLeague = await knex(`teams`).where({
      league_id: league_id,
      id: team_id,
    });
    if (!teamLeague.length) {
      return res
        .status(404)
        .json({ message: `No teams found for this league` });
    }

    const team = await knex(`teams`).where({ id: team_id });
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

const editTeam = async (req, res) => {
  const { user_id, league_id, team_id } = req.params;
  if (!user_id || !league_id || !team_id) {
    res.status(400).json({
      message: `The following parameters are all required: user_id, league_id, team_id`,
    });
  }

  const { name, faction, head_coach, team_value } = req.body;
  if (!name || !faction || !head_coach || !team_value) {
    return res.status(400).json({
      message: `The following fields are all required: name, faction, head_coach, team_value`,
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

    const teamLeague = await knex(`teams`).where({
      league_id: league_id,
      id: team_id,
    });
    if (!teamLeague.length) {
      return res
        .status(404)
        .json({ message: `No teams found for this league` });
    }

    const team = await knex(`teams`).where({ id: team_id });
    if (!team.length) {
      return res
        .status(404)
        .json({ message: `No team found with ID: ${team_id}` });
    }

    await knex(`teams`).where({ id: team_id }).update(req.body);

    const updatedTeam = await knex(`teams`).where({ id: team_id }).first();
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

const deleteTeam = async (req, res) => {
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

    const teamLeague = await knex(`teams`).where({
      league_id: league_id,
      id: team_id,
    });
    if (!teamLeague.length) {
      return res
        .status(404)
        .json({ message: `No teams found for this league` });
    }

    const team = await knex(`teams`).where({ id: team_id });
    if (!team.length) {
      return res
        .status(404)
        .json({ message: `No team found with ID: ${team_id}` });
    }

    await knex(`teams`).where({ id: team_id }).del();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(`Server error: ${error}`);
  }
};

module.exports = { createTeam, getTeam, editTeam, deleteTeam };
