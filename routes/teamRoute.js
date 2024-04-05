const express = require(`express`);
const router = express.Router();
const teamController = require(`../controllers/teamController`);

router.route(`/`).post(teamController.createTeam);

module.exports = router;
