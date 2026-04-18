'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.hasOne(models.Food,{foreignKey:"codecategories",sourceKey:"codecategories",as:"category"})
      Categories.hasOne(models.Voucher,{foreignKey:"codecategories",sourceKey:"codecategories",as:"category_voucher"})

    }
  }
  Categories.init({
    codecategories: DataTypes.STRING,
    name: DataTypes.STRING,
    des: DataTypes.TEXT,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};