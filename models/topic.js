'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Topic.belongsTo(models.User, {
        foreignKey: { name: 'userId' },
        onDelete: 'CASCADE',
      })
    }
  }
  Topic.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    icon: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};