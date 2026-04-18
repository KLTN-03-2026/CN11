'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BellType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BellType.belongsTo(models.Bell,{foreignKey:"codetype",targetKey:"codetype",as:"bell_type"})
    }
  }
  BellType.init({
    title: DataTypes.STRING,
    codetype: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BellType',
  });
  return BellType;
};