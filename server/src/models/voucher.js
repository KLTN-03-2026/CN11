'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsTo(models.Categories,{foreignKey:"codecategories",targetKey:"codecategories",as:"category_voucher"})
      Voucher.belongsTo(models.Condition,{foreignKey:"codecondition",targetKey:"codecondition",as:"condition"})
    }
  }
  Voucher.init({
    codevoucher: DataTypes.STRING,
    name: DataTypes.STRING,
    sale: DataTypes.STRING,
    style: DataTypes.STRING,
    codecategories: DataTypes.STRING,
    codecondition: DataTypes.STRING,
    exprice: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};