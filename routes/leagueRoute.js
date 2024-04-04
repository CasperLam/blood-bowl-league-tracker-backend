const express = require(`express`);
const router = express.Router();
const leagueController = require(`../controllers/leagueController`);

router.route(`/`).post(leagueController.createLeague);
router.route(`/:user_id`).get(leagueController.getLeagues);

module.exports = router;
