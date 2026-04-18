'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTableStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderTableStatus.belongsTo(models.Table,{foreignKey:"codetable",targetKey:"codetable",as:"order_table_name"})
      OrderTableStatus.belongsTo(models.TableStatus,{foreignKey:"codetable",targetKey:"codetable",as:"order_customer"})
      OrderTableStatus.belongsTo(models.Floor,{foreignKey:"codefloor",targetKey:"codefloor",as:"order_floor"})
      OrderTableStatus.belongsTo(models.HourService,{foreignKey:"codehour",targetKey:"codehour",as:"order_hour_name"})
    }
  }
  OrderTableStatus.init({
    codetable: DataTypes.STRING,
    codehour: DataTypes.STRING,
    codefloor: DataTypes.STRING,
    isorder: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OrderTableStatus',
  });
  return OrderTableStatus;
};