const knex = require(`knex`)(require(`../knexfile`));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: `The following fields are all required: username, email, password`,
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 6);

  const newUser = { username, email, password: hashedPassword };

  try {
    await knex("users").insert(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(`Failed registration`);
  }
};

module.exports = { createUser };
