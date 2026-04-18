'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log.belongsTo(models.Role, { foreignKey: "role", targetKey: "code", as: "role_log" })
      Log.belongsTo(models.User, { foreignKey: "codeuser", targetKey: "codeuser", as: "user" })
    }
  }
  Log.init({
    codeuser: DataTypes.STRING,
    active: DataTypes.TEXT,
    role: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};