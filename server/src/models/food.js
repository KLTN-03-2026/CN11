'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Categories,{foreignKey:"codecategories",targetKey:"codecategories",as:"category"})
      Food.belongsTo(models.Customer,{foreignKey:"codecustomer",targetKey:"codecustomer",as:"customers"})
      Food.belongsTo(models.ListBuy,{foreignKey:"codefood",targetKey:"codefood",sourceKey:"codefood",as:"foods"})
    }
  }
  Food.init({
    codefood: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    codecategories: DataTypes.STRING,
    image: DataTypes.TEXT,
    tag: DataTypes.STRING,
    note: DataTypes.STRING,
    codecustomer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};