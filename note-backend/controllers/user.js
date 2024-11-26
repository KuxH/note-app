const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((error) => logger.error(error));
});

userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  if (username === undefined || name === undefined || password === undefined) {
    return res.status(400).json({ error: "missing username or password" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hashSync(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  user
    .save()
    .then((savedUser) => res.json(savedUser))
    .catch((error) => next(error));
});
module.exports = userRouter;
