const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_name: {
      // user that created this post
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "name"
      }
    }
  },
  {
    sequelize,
    timestamps: true, // explcitly set to true because we want a createdAt attribute to the model
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;