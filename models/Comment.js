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
    creator_id: {
      // user that created this post
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id"
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id"
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