'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TableStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TableStatus.belongsTo(models.Table,{foreignKey: "codetable", sourceKey: "codetable",targetKey:"codetable",as: "table_status"});
      TableStatus.belongsTo(models.OrderTableStatus,{foreignKey: "codetable", sourceKey: "codetable",targetKey:"codetable",as: "order_customer"});
    }
  }
  TableStatus.init({
    codets: DataTypes.STRING,
    codetable: DataTypes.STRING,
    customer: DataTypes.STRING,
    isorder: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TableStatus',
  });
  return TableStatus;
};