'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Floor.belongsTo(models.Table, { foreignKey: "codefloor",targetKey:"codefloor", sourceKey: "codefloor", as: "floor_table" });
      Floor.belongsTo(models.OrderTableStatus, { foreignKey: "codefloor",targetKey:"codefloor", sourceKey: "codefloor", as: "order_floor" });
    }
  }
  Floor.init({
    codefloor: DataTypes.STRING,
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Floor',
  });
  return Floor;
};