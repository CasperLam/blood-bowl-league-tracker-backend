const express = require(`express`);
const router = express.Router();
const teamController = require(`../controllers/teamController`);

router.route(`/`).post(teamController.createTeam);

router
  .route(`/:user_id/:league_id/:team_id`)
  .get(teamController.getTeam)
  .put(teamController.editTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
