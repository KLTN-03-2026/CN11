'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.Order, { foreignKey: "codeorder", targetKey: "codeorder", as: "order_items" });
      Items.hasMany(models.ListBuy, { foreignKey: "codebuy",sourceKey:"codebuy", as: "item_listbuy" });
    }
  }
  Items.init({
    codeitem: DataTypes.STRING,
    quantify: DataTypes.STRING,
    total: DataTypes.STRING,
    note: DataTypes.STRING,
    codeorder: DataTypes.STRING,
    codebuy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};