const express = require(`express`);
const router = express.Router();
const leagueController = require(`../controllers/leagueController`);

router.route(`/:user_id`).get(leagueController.getLeagues);

module.exports = router;
