'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'author', as: 'user' })
    }

  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    author: DataTypes.INTEGER,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};