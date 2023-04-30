const router = require("express").Router();
const { User } = require("../../models");

// Getting all user
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    const user = users.map((user) => user.get({ plain: true }));

    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creating a new user
router.post("/", async (req, res) => {
  try {
    const addUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userID = addUser.id;
      req.session.userName = addUser.username;
      req.session.loggedIn = true;

      res.status(200).json({ addUser, message: "You are logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUser) => res.json(deletedUser))
    .catch((err) => res.json(err));
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(400).json({
        message: "Incorrect email or password. Please check your credentials",
      });
      return;
    }

    const passwordValidation = await user.checkPassword(req.body.password);

    console.log(passwordValidation);

    if (!passwordValidation) {
      res.status(400).json({
        message: "Incorrect email or password. Please check your credentials",
      });
      return;
    }

    const userID = user.get({ plain: true });
    req.session.save(() => {
      req.session.userID = userID.id;
      req.session.userName = userID.username;
      req.session.loggedIn = true;

      res.status(200).json({ user: user, message: "You are logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout

router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
