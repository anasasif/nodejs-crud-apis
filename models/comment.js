'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'author', as: 'user' })
    }
  };
  
  Comment.init({
    content: DataTypes.STRING,
    post_id: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};