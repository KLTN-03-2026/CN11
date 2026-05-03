'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodWrong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FoodWrong.init({
    codefood: DataTypes.STRING,
    codefoodwrong: DataTypes.STRING,
    codetable: DataTypes.STRING,
    reason: DataTypes.TEXT,
    codeuser: DataTypes.STRING,
    status: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FoodWrong',
  });
  return FoodWrong;
};