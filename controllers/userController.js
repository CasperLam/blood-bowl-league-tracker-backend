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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send(`The following fields are all required: email, password`);
  }

  try {
    const user = await knex("users").where({ email: email }).first();

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const passworrdCorrect = bcrypt.compareSync(password, user.password);

    if (!passworrdCorrect) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: "Failed login" });
  }
};

const getUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "Please login" });
  }

  const authToken = req.headers.authorization.split(" ")[1];

  if (!authToken || !process.env.JWT_SECRET) {
    return res.status(401).json({ error: "Auth token or secret is missing" });
  }

  try {
    const verified = jwt.verify(authToken, process.env.JWT_SECRET);
    if (verified) {
      const { id } = verified;

      const user = await knex("users").where({ id }).first();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid auth token" });
  }
};

module.exports = { createUser, login, getUser };
