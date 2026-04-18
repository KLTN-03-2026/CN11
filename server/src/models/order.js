'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Table, { foreignKey: "codetable", targetKey: "codetable", as: "order_table" });
      Order.belongsTo(models.Items,{ foreignKey: "codeorder", targetKey: "codeorder", as: "order_items" });
      Order.belongsTo(models.User, { foreignKey: "codeuser", targetKey: "codeuser", as: "order_user" });
    }
  }
  Order.init({
    codeorder: DataTypes.STRING,
    codetable: DataTypes.STRING,
    status: DataTypes.STRING,
    codeitem: DataTypes.STRING,
    codeuser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};