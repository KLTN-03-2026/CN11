'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListBuy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListBuy.belongsTo(models.Items, { foreignKey: "codebuy", sourceKey: "codebuy", as: "items" });
      ListBuy.hasOne(models.Food, { foreignKey: "codefood", sourceKey: "codefood", as: "foods" });
    }
  }
  ListBuy.init({
    codeuser: DataTypes.STRING,
    codebuy: DataTypes.STRING,
    codefood: DataTypes.STRING,
    quatify: DataTypes.STRING,
    codeitem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListBuy',
  });
  return ListBuy;
};