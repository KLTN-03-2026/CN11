'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bell.belongsTo(models.BellType, { foreignKey: "codetype", targetKey: "codetype", as: "bell_type" })
      Bell.hasMany(models.UserReceive, {
        foreignKey: "codebell",
        sourceKey: "codebell",
        as: "userReceives"
      });
    }
  }
  Bell.init({
    codebell: DataTypes.STRING,
    title: DataTypes.STRING,
    des: DataTypes.TEXT,
    rolecode: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    codetype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bell',
  });
  return Bell;
};