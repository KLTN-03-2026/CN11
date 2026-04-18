'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodAnalysist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FoodAnalysist.init({
    codefood: DataTypes.STRING,
    quatify: DataTypes.STRING,
    codeana: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FoodAnalysist',
  });
  return FoodAnalysist;
};