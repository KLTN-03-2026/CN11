'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodCook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FoodCook.init({
    codefoodcook: DataTypes.STRING,
    codefood: DataTypes.STRING,
    timescook: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FoodCook',
  });
  return FoodCook;
};