const router = require("express").Router();
require("dotenv").config();
const userController = require(`../controllers/userController`);

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/profile", userController.getUser);

module.exports = router;
