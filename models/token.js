'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Token.belongsTo(models.User, {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
      })
    }
  }
  Token.init({
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};