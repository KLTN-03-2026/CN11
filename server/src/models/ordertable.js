'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderTable.belongsTo(models.HourService, { foreignKey: "codehour", targetKey: "codehour",as: "order_hour" });
      OrderTable.belongsTo(models.Table, { foreignKey: "codetable", targetKey: "codetable",as: "order_table" });

    }
  }
  OrderTable.init({
    codeordertable: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    codehour: DataTypes.STRING,
    date: DataTypes.STRING,
    guest: DataTypes.STRING,
    codetable: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderTable',
  });
  return OrderTable;
};