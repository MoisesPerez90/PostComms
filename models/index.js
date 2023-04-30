const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comments");

User.hasMany(Post, {
  foreignKey: "name_poster",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "name_poster",
  onDelete: "CASCADE",
});

User.hasOne(Comment, {
  foreignKey: "name_poster",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "name_poster",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };
