'use strict';
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize.js');

class UserToken extends Model {
  static associate(models) {
    // Relasi dengan model User
    UserToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  }
}

UserToken.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserToken',
    tableName: 'usertokens',
    timestamps: true,
  }
);

module.exports = UserToken;
