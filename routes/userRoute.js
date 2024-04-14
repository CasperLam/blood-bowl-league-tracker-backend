const router = require("express").Router();
require("dotenv").config();
const userController = require(`../controllers/userController`);

router.post("/register", userController.createUser);

module.exports = router;
