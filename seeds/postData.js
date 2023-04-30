const { Post } = require("../models");

const postData = [
  {
    title: "Why MVC is so important",
    body: `MVC allows developers to maintain a true separation of concerns, devising their
    code between the Model layer for data, the View layer for design, and the Controller layer for
    application logic.`,
    name_poster: "1",
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
