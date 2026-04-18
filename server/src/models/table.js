'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Table.belongsTo(models.BankHistory, { foreignKey: "codetable", targetKey: "codetable", as: "table" });
      Table.belongsTo(models.Order, { foreignKey: "codetable", targetKey: "codetable", as: "order_table" });
      Table.belongsTo(models.TableStatus,{foreignKey: "codetable",targetKey:"codetable", sourceKey: "codetable",as: "table_status"});
      Table.belongsTo(models.Floor, { foreignKey: "codefloor", targetKey:"codefloor",sourceKey: "codefloor", as: "floor_table" });
      Table.belongsTo(models.OrderTableStatus, { foreignKey:"codetable",targetKey:"codetable",as:"order_table_name"});
    }
  }
  Table.init({
    codetable: DataTypes.STRING,
    codefloor: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Table',
  });
  return Table;
};