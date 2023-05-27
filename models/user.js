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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};