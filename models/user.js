'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    static associate({ Post, Comment }) {
      this.hasMany(Post, { foreignKey: 'author', as: 'posts' })
      this.hasMany(Comment, { foreignKey: 'author', as: 'comments' })
    }
    
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};