const router = require("express").Router();
const { User, Post, Comment } = require("../models");
7;
const authChecker = require("../utils/auth");

// Setting the home route
router.get("/", (req, res) => {
  res.redirect("/wall");
});

// Obtaining all user's posts
router.get("/wall", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => {
      return post.get({ plain: true });
    });
    // res.json(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      id: req.session.userID,
      username: req.session.userName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Getting a post's comment
router.get("/wall/post/:id", authChecker, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "body", "name_poster", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const post = postData.get({ plain: true });
    // res.json(post);
    console.log(post);
    res.render("post", {
      post,
      id: req.session.userID,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creating a post's comment
router.post("/wall/post/:id", authChecker, async (req, res) => {
  Comment.create({
    body: req.body.body,
    name_poster: req.body.name_poster,
    post_id: req.params.id,
  })
    .then((newComment) => {
      console.log(newComment);
      res.json(newComment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Deleting a post's comment
router.delete("/wall/post/:id", authChecker, async (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedPost) => res.json(deletedPost))
    .catch((err) => res.json(err));
});

// Obtaining a user's posts
router.get("/user/:id", authChecker, async (req, res) => {
  try {
    const dbUserPosts = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ["id", "title", "body", "updated_at"],
        },
      ],
    });

    const userPost = dbUserPosts.get({ plain: true });
    console.log(userPost);
    res.render("dashboard", {
      userPost,
      id: req.session.userID,
      loggedIn: req.session.loggedIn,
    });
    // res.json(userPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creating a user's post
router.post("/user/:id", authChecker, async (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    name_poster: req.params.id,
  })
    .then((newPost) => {
      console.log(newPost);
      res.json(newPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Updating a user's post
router.put("/user/post/:id", authChecker, async (req, res) => {
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
      name_poster: req.body.id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => res.json(updatedPost))
    .catch((err) => res.json(err));
});

// Deleting a user's post
router.delete("/user/post/:id", authChecker, async (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedPost) => res.json(deletedPost))
    .catch((err) => res.json(err));
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
