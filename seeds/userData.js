const { User } = require("../models");

const userData = [
  {
    username: "Master",
    email: "master@example.com",
    password: "HelloWorld01",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
