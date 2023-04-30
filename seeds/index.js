const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedPosts = require("./postData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log("Users has been seeded");

  await seedPosts();
  console.log("Posts has been seeded");

  process.exit(0);
};

seedAll();
