const express = require(`express`);
const router = express.Router();
const leagueController = require(`../controllers/leagueController`);

router.route(`/`).post(leagueController.createLeague);

router.route(`/:user_id`).get(leagueController.getLeagues);

router
  .route(`/:user_id/:id`)
  .get(leagueController.getLeague)
  .put(leagueController.editLeague)
  .delete(leagueController.deleteLeague);

module.exports = router;
